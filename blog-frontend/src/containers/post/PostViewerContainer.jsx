import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostViewer from '../../components/post/PostViewer'
import { readPost, unloadPost } from '../../modules/post'
import { useParams, useNavigate } from 'react-router-dom'
import { setOriginalPost } from '../../modules/write'
import PostActionButton from '../../components/post/PostActionButton'
import { removePost } from '../../lib/api/post'

const PostViewerContainer = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user
    })
  )
  useEffect(() => {
    dispatch(readPost(postId))
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost())
    }
  }, [dispatch, postId])
  const onEdit = () => {
    dispatch(setOriginalPost(post))
    navigate('/write')
  }
  const onRemove = async () => {
    try {
      await removePost(postId)
      navigate('/')
    } catch (e) {
      console.log('onRemove', e)
    }
  }
  //자신의 포스트 일때만 버튼나타나게
  const ownPost = (user && user._id) === (post && post.user._id)
  return (
    <PostViewer
      post={post}
      error={error}
      loading={loading}
      actionButtons={
        ownPost && <PostActionButton onEdit={onEdit} onRemove={onRemove} />
      }
    />
  )
}

export default PostViewerContainer
