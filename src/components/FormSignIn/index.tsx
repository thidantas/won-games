'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Email, ErrorOutline, Lock } from '@styled-icons/material-outlined'

import Button from 'components/Button'
import TextField from 'components/TextField'
import { PacmanLoading } from 'components/PacmanLoading'
import { FormWrapper, FormLink, FormError } from 'components/Form'
import { FieldErrors, signInValidate } from 'utils/validations/validators'

import * as S from './styles'

const FormSignIn = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const errors = signInValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    setFieldError({})

    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: `${window.location.origin}${callbackUrl}`
    })

    if (result?.error) {
      setLoading(false)
      setFormError('Incorrect email or password')
      return
    }

    if (result?.url) {
      setLoading(false)
      return router.push(result?.url)
    }
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          type="email"
          placeholder="Email"
          error={fieldError?.email}
          icon={<Email />}
          onInputChange={(v) => handleInput('email', v)}
        />

        <TextField
          name="password"
          type="password"
          placeholder="Password	"
          error={fieldError?.password}
          icon={<Lock />}
          onInputChange={(v) => handleInput('password', v)}
        />

        {!!formError && (
          <FormError>
            <ErrorOutline />
            {formError}
          </FormError>
        )}

        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <PacmanLoading ballSize={5} /> : <span>Sign in now</span>}
        </Button>

        <FormLink>
          {"Don't have an account?"} <Link href="/sign-up">Sign up</Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignIn
