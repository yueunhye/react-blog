import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import AuthForm from './AuthForm'
import { changeField, initialForm, register } from '../../modules/auth'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError
  }))
  const onChange = e => {
    const { value, name } = e.target
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value
      })
    )
  }
  const onSubmit = e => {
    e.preventDefault()
    const { username, password, passwordConfirm } = form
    if (password !== passwordConfirm) {
      return
    }
    dispatch(register({ username, password }))
  }
  useEffect(() => {
    dispatch(initialForm('register'))
  }, [dispatch])

  useEffect(() => {
    if (authError) {
      console.log('오류 발생')
      console.log(authError)
      return
    }
    if (auth) {
      console.log(`회원가입 성공`)
      console.log(auth)
    }
  }, [authError, auth])

  return (
    <AuthForm
      type='register'
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}

export default RegisterForm
