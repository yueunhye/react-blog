import React from 'react'
import HeaderContainer from '../containers/common/HeaderContainer'
import PageinationContainer from '../containers/post/PageinationContainer'
import PostListContainer from '../containers/post/PostListContainer'

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostListContainer />
      <PageinationContainer />
    </>
  )
}

export default PostListPage
