// import client from './client'
import axios from 'axios'

const api = axios.create()

export const login = async ({ username, password }) =>
  await api.post('/api/auth/login', { username, password })

export const register = async ({ username, password }) =>
  await api.post('/api/auth/register', { username, password })

export const check = () => api.get('api/auth/check')

export const logout = () => api.get('/api/auth/logout')
