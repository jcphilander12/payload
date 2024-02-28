import type { SerializedListItemNode } from '@lexical/list'

import type { LexicalPluginNodeConverter } from '../types'

import { convertLexicalPluginNodesToLexical } from '..'

export const ListItemConverter: LexicalPluginNodeConverter = {
  converter({ childIndex, converters, lexicalPluginNode }) {
    return {
      ...lexicalPluginNode,
      type: 'listitem',
      checked: undefined,
      children: convertLexicalPluginNodesToLexical({
        converters,
        lexicalPluginNodes: (lexicalPluginNode as any)?.children || [],
        parentNodeType: 'listitem',
      }),
      value: childIndex + 1,
      version: 1,
    } as const as SerializedListItemNode
  },
  nodeTypes: ['listitem'],
}
