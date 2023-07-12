import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import classes from './index.module.scss'

type Props = {
  name: string
  label: string
  register: UseFormRegister<FieldValues & any>
  required?: boolean
  error: any
  type?: 'text' | 'number' | 'password'
}

export const Input: React.FC<Props> = ({
  name,
  label,
  required,
  register,
  error,
  type = 'text',
}) => {
  return (
    <div className={classes.inputWrap}>
      <label htmlFor="name" className={classes.label}>
        {`${label} ${required ? '*' : ''}`}
      </label>
      <input className={classes.input} {...{ type }} {...register(name, { required })} />
      {error && <div className={classes.error}>This field is required</div>}
    </div>
  )
}
