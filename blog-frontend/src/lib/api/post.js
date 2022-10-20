import axios from 'axios'

const api = axios.create()

export const writePost = async ({ title, body, tags }) =>
  await api.post('/api/posts', { title, body, tags })
