import type { AdminViewProps } from 'payload/types'

import { Button } from '@payloadcms/ui/elements/Button'
import { Translation } from '@payloadcms/ui/elements/Translation'
import { MinimalTemplate } from '@payloadcms/ui/templates/Minimal'
import LinkImport from 'next/link.js'
import React from 'react'

import { ResetPasswordClient } from './index.client.js'
import './index.scss'

export const resetPasswordBaseClass = 'reset-password'

const Link = (LinkImport.default || LinkImport) as unknown as typeof LinkImport.default

export { generateResetPasswordMetadata } from './meta.js'

export const ResetPassword: React.FC<AdminViewProps> = ({ initPageResult, params }) => {
  const { req } = initPageResult

  const {
    segments: [_, token],
  } = params

  const {
    i18n,
    payload: { config },
    user,
  } = req

  const {
    routes: { admin },
  } = config

  if (user) {
    return (
      <MinimalTemplate className={resetPasswordBaseClass}>
        <div className={`${resetPasswordBaseClass}__wrap`}>
          <h1>{i18n.t('authentication:alreadyLoggedIn')}</h1>
          <p>
            <Translation
              elements={{
                '0': ({ children }) => <Link href={`${admin}/account`}>{children}</Link>,
              }}
              i18nKey="authentication:loggedInChangePassword"
              t={i18n.t}
            />
          </p>
          <br />
          <Button Link={Link} buttonStyle="secondary" el="link" to={admin}>
            {i18n.t('general:backToDashboard')}
          </Button>
        </div>
      </MinimalTemplate>
    )
  }

  return (
    <MinimalTemplate className={resetPasswordBaseClass}>
      <div className={`${resetPasswordBaseClass}__wrap`}>
        <h1>{i18n.t('authentication:resetPassword')}</h1>
        <ResetPasswordClient token={token} />
      </div>
    </MinimalTemplate>
  )
}
