import React, { Fragment } from 'react'
import Link from 'next/link'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import CreateAccountForm from './Form'

import classes from './index.module.scss'

const CreateAccount = async () => {
  await getMeUser({
    userRedirect: `/account?message=${encodeURIComponent(
      'Cannot create a new account while logged in, please log out and try again.',
    )}`,
  })

  return (
    <Gutter className={classes.createAccount}>
      <h1>Create Account</h1>
      <RenderParams />
      <CreateAccountForm />
      <Fragment>
        {'Already have an account? '}
        <Link href="/login">Login</Link>
      </Fragment>
    </Gutter>
  )
}

export default CreateAccount
