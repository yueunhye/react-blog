import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import PostListPage from './pages/PostListPage'
import PostPage from './pages/PostPage'
import RegisterPage from './pages/RegisterPage'
import WritePage from './pages/WritePage'
import { Helmet } from 'react-helmet-async'

const App = () => {
  return (
    <>
      <Helmet>
        <title>SUNNY</title>
      </Helmet>
      <Routes>
        <Route path='/' element={<PostListPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/write' element={<WritePage />} />
        <Route path='/@:username'>
          <Route index element={<PostListPage />} />
          <Route path=':postId' element={<PostPage />} />
        </Route>
        {/* <Route path='/@:username' element={<PostListPage />} />
      <Route path='/@:username/:postId' element={<PostPage />} /> */}
      </Routes>
    </>
  )
}

export default App
