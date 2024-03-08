import lexicalContentEditableImport from '@lexical/react/LexicalContentEditable.js'
const { ContentEditable } = lexicalContentEditableImport

import * as React from 'react'

import './ContentEditable.scss'

export function LexicalContentEditable({ className }: { className?: string }): JSX.Element {
  return <ContentEditable className={className ?? 'ContentEditable__root'} />
}
