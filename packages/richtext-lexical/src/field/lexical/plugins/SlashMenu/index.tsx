'use client'
import type { TextNode } from 'lexical'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js'
import { useTranslation } from '@payloadcms/ui/providers/Translation'
import { useCallback, useMemo, useState } from 'react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import type {
  SlashMenuGroup,
  SlashMenuGroupInternal,
  SlashMenuItemInternal,
  SlashMenuItem as SlashMenuItemType,
} from './LexicalTypeaheadMenuPlugin/types.js'

import { useEditorConfigContext } from '../../config/client/EditorConfigProvider.js'
import { LexicalTypeaheadMenuPlugin } from './LexicalTypeaheadMenuPlugin/index.js'
import './index.scss'
import { useMenuTriggerMatch } from './useMenuTriggerMatch.js'

const baseClass = 'slash-menu-popup'

function SlashMenuItem({
  isSelected,
  item,
  onClick,
  onMouseEnter,
}: {
  index: number
  isSelected: boolean
  item: SlashMenuItemInternal
  onClick: () => void
  onMouseEnter: () => void
}) {
  const { i18n } = useTranslation()

  let className = `${baseClass}__item ${baseClass}__item-${item.key}`
  if (isSelected) {
    className += ` ${baseClass}__item--selected`
  }

  let title = item.key
  if (item.label) {
    title = typeof item.label === 'function' ? item.label({ i18n }) : item.label
  }
  // Crop title to max. 25 characters
  if (title.length > 25) {
    title = title.substring(0, 25) + '...'
  }

  return (
    <button
      aria-selected={isSelected}
      className={className}
      id={baseClass + '__item-' + item.key}
      key={item.key}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      ref={item.ref}
      role="item"
      tabIndex={-1}
      type="button"
    >
      {item?.Icon && <item.Icon />}

      <span className={`${baseClass}__item-text`}>{title}</span>
    </button>
  )
}

export function SlashMenuPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement
}): React.ReactElement {
  const [editor] = useLexicalComposerContext()
  const [queryString, setQueryString] = useState<null | string>(null)
  const { editorConfig } = useEditorConfigContext()
  const { i18n } = useTranslation()

  const checkForTriggerMatch = useMenuTriggerMatch('/', {
    minLength: 0,
  })

  const getDynamicItems = useCallback(() => {
    let groupWithItems: Array<SlashMenuGroup> = []

    for (const dynamicItem of editorConfig.features.slashMenu.dynamicGroups) {
      const dynamicGroupWithItems = dynamicItem({
        editor,
        queryString,
      })
      groupWithItems = groupWithItems.concat(dynamicGroupWithItems)
    }

    return groupWithItems
  }, [editor, queryString, editorConfig?.features])

  const groups: SlashMenuGroup[] = useMemo(() => {
    let groupsWithItems: SlashMenuGroup[] = []
    for (const groupWithItem of editorConfig?.features.slashMenu.groups ?? []) {
      groupsWithItems.push(groupWithItem)
    }

    if (queryString) {
      // Filter current groups first
      groupsWithItems = groupsWithItems.map((group) => {
        const filteredItems = group.items.filter((item) => {
          let itemTitle = item.key
          if (item.label) {
            itemTitle = typeof item.label === 'function' ? item.label({ i18n }) : item.label
          }

          if (new RegExp(queryString, 'gi').exec(itemTitle)) {
            return true
          }
          if (item.keywords != null) {
            return item.keywords.some((keyword) => new RegExp(queryString, 'gi').exec(keyword))
          }
          return false
        })
        if (filteredItems.length) {
          return {
            ...group,
            items: filteredItems,
          }
        }
        return null
      })

      groupsWithItems = groupsWithItems.filter((group) => group != null)

      // Now add dynamic groups
      const dynamicItemGroups = getDynamicItems()

      // merge dynamic items into groups
      for (const dynamicGroup of dynamicItemGroups) {
        // 1. find the group with the same name or create new one
        let group = groupsWithItems.find((group) => group.key === dynamicGroup.key)
        if (!group) {
          group = {
            ...dynamicGroup,
            items: [],
          }
        } else {
          groupsWithItems = groupsWithItems.filter((group) => group.key !== dynamicGroup.key)
        }

        // 2. Add items to group items array and add to sanitized.slashMenu.groupsWithItems
        if (group?.items?.length) {
          group.items = group.items.concat(group.items)
        }
        groupsWithItems.push(group)
      }
    }

    return groupsWithItems
  }, [getDynamicItems, queryString, editorConfig?.features, i18n])

  const onSelectItem = useCallback(
    (
      selectedItem: SlashMenuItemType,
      nodeToRemove: TextNode | null,
      closeMenu: () => void,
      matchingString: string,
    ) => {
      if (nodeToRemove) {
        editor.update(() => {
          nodeToRemove.remove()
        })
      }
      selectedItem.onSelect({ editor, queryString: matchingString })

      closeMenu()
    },
    [editor],
  )

  return (
    <React.Fragment>
      <LexicalTypeaheadMenuPlugin
        anchorElem={anchorElem}
        groups={groups as SlashMenuGroupInternal[]}
        menuRenderFn={(
          anchorElementRef,
          { selectItemAndCleanUp, selectedItemKey, setSelectedItemKey },
        ) =>
          anchorElementRef.current && groups.length
            ? ReactDOM.createPortal(
                <div className={baseClass}>
                  {groups.map((group) => {
                    let groupTitle = group.key
                    if (group.label) {
                      groupTitle =
                        typeof group.label === 'function' ? group.label({ i18n }) : group.label
                    }

                    return (
                      <div
                        className={`${baseClass}__group ${baseClass}__group-${group.key}`}
                        key={group.key}
                      >
                        <div className={`${baseClass}__group-title`}>{groupTitle}</div>
                        {group.items.map((item, oi: number) => (
                          <SlashMenuItem
                            index={oi}
                            isSelected={selectedItemKey === item.key}
                            item={item as SlashMenuItemInternal}
                            key={item.key}
                            onClick={() => {
                              setSelectedItemKey(item.key)
                              selectItemAndCleanUp(item)
                            }}
                            onMouseEnter={() => {
                              setSelectedItemKey(item.key)
                            }}
                          />
                        ))}
                      </div>
                    )
                  })}
                </div>,
                anchorElementRef.current,
              )
            : null
        }
        onQueryChange={setQueryString}
        onSelectItem={onSelectItem}
        triggerFn={checkForTriggerMatch}
      />
    </React.Fragment>
  )
}
