import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostViewer from '../../components/posts/PostViewer'
import { readPost, unloadPost } from '../../modules/post'
import { useParams } from 'react-router-dom'

const PostViewerContainer = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST']
  }))
  useEffect(() => {
    dispatch(readPost(postId))
    return () => {
      dispatch(unloadPost())
    }
  }, [dispatch, postId])
  return <PostViewer post={post} error={error} loading={loading} />
}

export default PostViewerContainer
