import type { TextNode } from 'lexical'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback, useMemo, useState } from 'react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import type { SlashMenuGroup } from './LexicalTypeaheadMenuPlugin/LexicalMenu'
import type { SlashMenuOption } from './LexicalTypeaheadMenuPlugin/LexicalMenu'

import { useEditorConfigContext } from '../../config/EditorConfigProvider'
import {
  LexicalTypeaheadMenuPlugin,
  useBasicTypeaheadTriggerMatch,
} from './LexicalTypeaheadMenuPlugin'
import './index.scss'

function SlashMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: {
  index: number
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  option: SlashMenuOption
}) {
  let className = 'item'
  if (isSelected) {
    className += ' selected'
  }
  return (
    <button
      aria-selected={isSelected}
      className={className}
      id={'typeahead-item-' + index}
      key={option.key}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      ref={option.setRefElement}
      role="option"
      tabIndex={-1}
      type="button"
    >
      <option.Icon />
      <span className="text">{option.title}</span>
    </button>
  )
}

export default function SlashMenuPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext()
  const [queryString, setQueryString] = useState<null | string>(null)
  const { editorConfig } = useEditorConfigContext()

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('/', {
    minLength: 0,
  })

  const getDynamicOptions = useCallback(() => {
    const options: Array<SlashMenuOption> = []

    for (const feature of editorConfig?.features ?? []) {
      if (feature?.slashMenu?.dynamicOptions?.length) {
        options.push(
          ...feature.slashMenu.dynamicOptions({
            editor,
            queryString,
          }),
        )
      }
    }

    if (queryString == null) {
      return options
    }

    return options
  }, [editor, queryString, editorConfig?.features])

  const groups: SlashMenuGroup[] = useMemo(() => {
    const baseOptions: SlashMenuOption[] = []
    for (const feature of editorConfig?.features ?? []) {
      if (feature?.slashMenu?.options?.length) {
        baseOptions.push(...feature.slashMenu.options)
      }
    }
    /*const baseOptions2 = [
      new SlashMenuOption('Paragraph', {
        Icon: BlockIcon,
        keywords: ['normal', 'paragraph', 'p', 'text'],
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createParagraphNode())
            }
          }),
      }),

      new SlashMenuOption('Table', {
        Icon: BlockIcon,
        keywords: ['table', 'grid', 'spreadsheet', 'rows', 'columns'],
        onSelect: () => {},
      }),
      new SlashMenuOption('Table (Experimental)', {
        Icon: BlockIcon,
        keywords: ['table', 'grid', 'spreadsheet', 'rows', 'columns'],
        onSelect: () => {},
      }),
      new SlashMenuOption('Numbered List', {
        Icon: BlockIcon,
        keywords: ['numbered list', 'ordered list', 'ol'],
        onSelect: () => {},
      }),
      new SlashMenuOption('Bulleted List', {
        Icon: BlockIcon,
        keywords: ['bulleted list', 'unordered list', 'ul'],
        onSelect: () => {},
      }),
      new SlashMenuOption('Check List', {
        Icon: BlockIcon,
        keywords: ['check list', 'todo list'],
        onSelect: () => {},
      }),
    ]*/

    const dynamicOptions = getDynamicOptions()

    const options = queryString
      ? [
          ...dynamicOptions,
          ...baseOptions.filter((option) => {
            return new RegExp(queryString, 'gi').exec(option.title) || option.keywords != null
              ? option.keywords.some((keyword) => new RegExp(queryString, 'gi').exec(keyword))
              : false
          }),
        ]
      : baseOptions

    const groups: SlashMenuGroup[] = [
      {
        options,
        title: 'Basic Blocks',
      },
    ]
    return groups
  }, [editor, getDynamicOptions, queryString])

  const onSelectOption = useCallback(
    (
      selectedOption: SlashMenuOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void,
      matchingString: string,
    ) => {
      editor.update(() => {
        if (nodeToRemove) {
          nodeToRemove.remove()
        }
        selectedOption.onSelect(editor, matchingString)
        closeMenu()
      })
    },
    [editor],
  )

  return (
    <React.Fragment>
      <LexicalTypeaheadMenuPlugin
        groupsWithOptions={groups}
        menuRenderFn={(
          anchorElementRef,
          { selectOptionAndCleanUp, selectedOptionKey, setSelectedOptionKey },
        ) =>
          anchorElementRef.current && groups.length
            ? ReactDOM.createPortal(
                <div className="typeahead-popover slash-menu">
                  {groups.map((group) => (
                    <div className="group" key={group.title}>
                      <div className="group-title">{group.title}</div>
                      {group.options.map((option, oi: number) => (
                        <SlashMenuItem
                          index={oi}
                          isSelected={selectedOptionKey === option.key}
                          key={option.key}
                          onClick={() => {
                            setSelectedOptionKey(option.key)
                            selectOptionAndCleanUp(option)
                          }}
                          onMouseEnter={() => {
                            setSelectedOptionKey(option.key)
                          }}
                          option={option}
                        />
                      ))}
                    </div>
                  ))}
                </div>,
                anchorElementRef.current,
              )
            : null
        }
        onQueryChange={setQueryString}
        onSelectOption={onSelectOption}
        triggerFn={checkForTriggerMatch}
      />
    </React.Fragment>
  )
}
