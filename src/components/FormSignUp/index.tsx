'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Lock,
  Email,
  ErrorOutline,
  AccountCircle
} from '@styled-icons/material-outlined'

import useRegister from 'services/client/auth/useRegister'
import Button from 'components/Button'
import TextField from 'components/TextField'
import { FormWrapper, FormLink, FormError } from 'components/Form'
import { PacmanLoading } from 'components/PacmanLoading'
import { FieldErrors, signUpValidate } from 'utils/validations/validators'

const FormSignUp = () => {
  const { register, loading, error } = useRegister()
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const validationErrors = signUpValidate(values)

    if (Object.keys(validationErrors).length) {
      setFieldError(validationErrors)
      return
    }

    setFieldError({})

    await register({
      username: values.username,
      email: values.email,
      password: values.password
    })
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          type="text"
          placeholder="Username"
          error={fieldError?.username}
          icon={<AccountCircle />}
          onInputChange={(v) => handleInput('username', v)}
        />

        <TextField
          name="email"
          type="email"
          error={fieldError?.email}
          icon={<Email />}
          placeholder="Email"
          onInputChange={(v) => handleInput('email', v)}
        />

        <TextField
          name="password"
          type="password"
          error={fieldError?.password}
          icon={<Lock />}
          placeholder="Password	"
          onInputChange={(v) => handleInput('password', v)}
        />

        <TextField
          name="confirm_password"
          type="password"
          error={fieldError?.confirm_password}
          icon={<Lock />}
          placeholder="Confirm password"
          onInputChange={(v) => handleInput('confirm_password', v)}
        />

        {!!error && (
          <FormError>
            <ErrorOutline />
            {error}
          </FormError>
        )}

        <Button size="large" fullWidth type="submit" disabled={loading}>
          {loading ? <PacmanLoading ballSize={5} /> : 'Sign up'}
        </Button>

        <FormLink>
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignUp
