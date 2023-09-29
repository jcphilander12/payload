import * as React from 'react'
import { createContext, useContext, useMemo } from 'react'

import type { FieldProps } from '../../../types'
import type { SanitizedEditorConfig } from './types'

// Should always produce a 20 character pseudo-random string
function generateQuickGuid(): string {
  return Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12)
}
interface ContextType {
  editorConfig: SanitizedEditorConfig
  field: FieldProps
  uuid: string
}

const Context: React.Context<ContextType> = createContext({
  editorConfig: null,
  field: null,
  uuid: generateQuickGuid(),
})

export const EditorConfigProvider = ({
  children,
  editorConfig,
  fieldProps,
}: {
  children: React.ReactNode
  editorConfig: SanitizedEditorConfig
  fieldProps: FieldProps
}): JSX.Element => {
  const editorContext = useMemo(
    () => ({ editorConfig, field: fieldProps, uuid: generateQuickGuid() }),
    [editorConfig, fieldProps],
  )

  return <Context.Provider value={editorContext}>{children}</Context.Provider>
}

export const useEditorConfigContext = (): ContextType => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useEditorConfigContext must be used within an EditorConfigProvider')
  }
  return context
}
