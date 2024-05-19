import { getCollapsedMargins } from '../utils/getCollapsedMargins.js'
import { getBoundingClientRectWithoutTransform } from './getBoundingRectWithoutTransform.js'
import { highlightElemOriginalPosition } from './highlightElemOriginalPosition.js'
const TARGET_LINE_HALF_HEIGHT = 25
const TEXT_BOX_HORIZONTAL_PADDING = -24
const DEBUG = false

export function setTargetLine(
  SPACE: number,
  targetLineElem: HTMLElement,
  targetBlockElem: HTMLElement,
  lastTargetBlockElem: HTMLElement | null,
  mouseY: number,
  anchorElem: HTMLElement,
  event: DragEvent,
  debugHighlightRef: React.RefObject<HTMLDivElement | null>,
  isFoundNodeEmptyParagraph: boolean = false,
) {
  const { height: targetBlockElemHeight, top: targetBlockElemTop } =
    getBoundingClientRectWithoutTransform(targetBlockElem)
  const { top: anchorTop, width: anchorWidth } = anchorElem.getBoundingClientRect()

  const { marginBottom, marginTop } = getCollapsedMargins(targetBlockElem)
  let lineTop = targetBlockElemTop

  const isBelow = mouseY >= targetBlockElemTop + targetBlockElemHeight / 2 + window.scrollY
  if (!isFoundNodeEmptyParagraph) {
    if (isBelow) {
      // below targetBlockElem
      lineTop += targetBlockElemHeight + marginBottom / 2
    } else {
      // above targetBlockElem
      lineTop -= marginTop / 2
    }
  } else {
    lineTop += targetBlockElemHeight / 2
  }

  const targetElemTranslate = 0
  let targetElemTranslate2 = 0

  if (!isFoundNodeEmptyParagraph) {
    if (isBelow) {
      targetElemTranslate2 = -TARGET_LINE_HALF_HEIGHT
    } else {
      targetElemTranslate2 = TARGET_LINE_HALF_HEIGHT
    }
  }

  let top = lineTop - anchorTop + targetElemTranslate2
  if (!isBelow) {
    top -= TARGET_LINE_HALF_HEIGHT * 2
  }
  const left = TEXT_BOX_HORIZONTAL_PADDING - SPACE

  targetLineElem.style.transform = `translate(${left}px, ${top}px)`
  targetLineElem.style.width = `${anchorWidth - (TEXT_BOX_HORIZONTAL_PADDING - SPACE) * 2}px`
  targetLineElem.style.opacity = '.4'

  /**
   * Move around element below or above the line (= the target / targetBlockElem)
   */
  //targetBlockElem.style.opacity = '0.4'
  if (!isFoundNodeEmptyParagraph) {
    // move lastTargetBlockElem down 50px to make space for targetLineElem (which is 50px height)
    targetBlockElem.style.transform = `translate(0, ${targetElemTranslate}px)`
    if (isBelow) {
      // add to existing marginBottom plus the height of targetLineElem
      targetBlockElem.style.marginBottom = TARGET_LINE_HALF_HEIGHT * 2 + 'px'
    } else {
      targetBlockElem.style.marginTop = TARGET_LINE_HALF_HEIGHT * 2 + 'px'
    }
  }

  if (DEBUG) {
    //targetBlockElem.style.border = '3px solid red'
    highlightElemOriginalPosition(debugHighlightRef, targetBlockElem, anchorElem)
  }

  if (lastTargetBlockElem && lastTargetBlockElem !== targetBlockElem) {
    lastTargetBlockElem.style.opacity = ''
    lastTargetBlockElem.style.transform = ''

    // Delete marginBottom and marginTop values we set
    lastTargetBlockElem.style.marginBottom = ''
    lastTargetBlockElem.style.marginTop = ''
    //lastTargetBlockElem.style.border = 'none'
  }
}
