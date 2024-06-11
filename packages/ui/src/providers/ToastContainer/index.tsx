'use client'
import React from 'react'
import { Toaster } from 'sonner'

import { Error } from './icons/Error.js'
import { Info } from './icons/Info.js'
import { Success } from './icons/Success.js'
import { Warning } from './icons/Warning.js'

export const ToastContainer: React.FC = () => {
  return (
    <Toaster
      className="payload-toast-container"
      closeButton
      // @ts-expect-error
      dir="undefined"
      icons={{
        error: <Error />,
        info: <Info />,
        success: <Success />,
        warning: <Warning />,
      }}
      offset="36px"
      toastOptions={{
        classNames: {
          closeButton: 'payload-toast-close-button',
          content: 'toast-content',
          error: 'toast-error',
          icon: 'toast-icon',
          info: 'toast-info',
          success: 'toast-success',
          toast: 'payload-toast-item',
          warning: 'toast-warning',
        },
        unstyled: true,
      }}
      visibleToasts={5}
    />
  )
}
