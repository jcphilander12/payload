'use client'

import type { FormFieldBase } from 'payload'

import React from 'react'

type LeafContextType = {
  attributes: Record<string, unknown>
  children: React.ReactNode
  editorRef: React.RefObject<HTMLDivElement>
  fieldProps: {
    name: string
  } & FormFieldBase
  leaf: string
  path: string
  schemaPath: string
}

const LeafContext = React.createContext<LeafContextType>({
  attributes: {},
  children: null,
  editorRef: null,
  fieldProps: {} as any,
  leaf: '',
  path: '',
  schemaPath: '',
})

export const LeafProvider: React.FC<
  {
    result: React.ReactNode
  } & LeafContextType
> = (props) => {
  const { children, result, ...rest } = props

  return (
    <LeafContext.Provider
      value={{
        ...rest,
        children: result,
      }}
    >
      {children}
    </LeafContext.Provider>
  )
}

export const useLeaf = () => {
  const path = React.useContext(LeafContext)
  return path
}
