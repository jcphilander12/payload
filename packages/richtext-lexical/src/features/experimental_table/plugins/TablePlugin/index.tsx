'use client'

import type {
  EditorThemeClasses,
  Klass,
  LexicalCommand,
  LexicalEditor,
  LexicalNode,
  RangeSelection,
} from 'lexical'
import type { JSX } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createTableNodeWithDimensions, TableNode } from '@lexical/table'
import { $insertNodeToNearestRoot, mergeRegister } from '@lexical/utils'
import { useModal } from '@payloadcms/ui'
import {
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from 'lexical'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as React from 'react'

import type { PluginComponent } from '../../../typesClient.js'

import { invariant } from '../../../../lexical/utils/invariant.js'
import { FieldsDrawer } from '../../../../utilities/fieldsDrawer/Drawer.js'

export type InsertTableCommandPayload = Readonly<{
  columns: string
  includeHeaders?: boolean
  rows: string
}>

export type CellContextShape = {
  cellEditorConfig: CellEditorConfig | null
  cellEditorPlugins: Array<JSX.Element> | JSX.Element | null
  set: (
    cellEditorConfig: CellEditorConfig | null,
    cellEditorPlugins: Array<JSX.Element> | JSX.Element | null,
  ) => void
}

export type CellEditorConfig = Readonly<{
  namespace: string
  nodes?: ReadonlyArray<Klass<LexicalNode>>
  onError: (error: Error, editor: LexicalEditor) => void
  readOnly?: boolean
  theme?: EditorThemeClasses
}>

export const INSERT_NEW_TABLE_COMMAND: LexicalCommand<InsertTableCommandPayload> = createCommand(
  'INSERT_NEW_TABLE_COMMAND',
)

export const OPEN_TABLE_DRAWER_COMMAND: LexicalCommand<{}> = createCommand(
  'OPEN_EMBED_DRAWER_COMMAND',
)

export const CellContext = createContext<CellContextShape>({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => {
    // Empty
  },
})
const drawerSlug = 'lexical-table-create'

export function TableContext({ children }: { children: JSX.Element }) {
  const [contextValue, setContextValue] = useState<{
    cellEditorConfig: CellEditorConfig | null
    cellEditorPlugins: Array<JSX.Element> | JSX.Element | null
  }>({
    cellEditorConfig: null,
    cellEditorPlugins: null,
  })
  return (
    <CellContext.Provider
      value={useMemo(
        () => ({
          cellEditorConfig: contextValue.cellEditorConfig,
          cellEditorPlugins: contextValue.cellEditorPlugins,
          set: (cellEditorConfig, cellEditorPlugins) => {
            setContextValue({ cellEditorConfig, cellEditorPlugins })
          },
        }),
        [contextValue.cellEditorConfig, contextValue.cellEditorPlugins],
      )}
    >
      {children}
    </CellContext.Provider>
  )
}

export const TablePlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext()
  const cellContext = useContext(CellContext)
  const { closeModal, toggleModal } = useModal()

  useEffect(() => {
    if (!editor.hasNodes([TableNode])) {
      invariant(false, 'TablePlugin: TableNode is not registered on editor')
    }

    return mergeRegister(
      editor.registerCommand<InsertTableCommandPayload>(
        INSERT_NEW_TABLE_COMMAND,
        ({ columns, includeHeaders, rows }) => {
          const tableNode = $createTableNodeWithDimensions(
            Number(rows),
            Number(columns),
            includeHeaders,
          )
          $insertNodes([tableNode])
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        OPEN_TABLE_DRAWER_COMMAND,
        () => {
          let rangeSelection: RangeSelection | null = null

          editor.getEditorState().read(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
              rangeSelection = selection
            }
          })

          if (rangeSelection) {
            toggleModal(drawerSlug)
          }
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [cellContext, editor, toggleModal])

  return (
    <FieldsDrawer
      data={{}}
      drawerSlug={drawerSlug}
      drawerTitle="Create Table"
      featureKey="experimental_table"
      handleDrawerSubmit={(_fields, data) => {
        closeModal(drawerSlug)

        if (!data.columns || !data.rows) {
          return
        }

        editor.dispatchCommand(INSERT_NEW_TABLE_COMMAND, {
          columns: String(data.columns),
          rows: String(data.rows),
        })
      }}
      schemaPathSuffix="fields"
    />
  )
}
