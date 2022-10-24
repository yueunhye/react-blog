import axios from 'axios'

const api = axios.create()

export const writePost = async ({ title, body, tags }) =>
  await api.post('/api/posts', { title, body, tags })

export const readPost = async id => await api.get(`/api/posts/${id}`)

export const listPosts = async ({ page, username, tag }) => {
  return await api.get(`/api/posts`, {
    params: { page, username, tag }
  })
}

export const updatePost = async ({ id, title, body, tags }) => {
  await api.patch(`/api/posts/${id}`, { title, body, tags })
}

export const removePost = async id => await api.delete(`/api/posts/${id}`)
