import * as postsAPI from '../lib/api/post'
import createRequestSaga, {
  createRequestActionTypes
} from '../lib/createRequestSaga'
import { createAction, handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'

const [LIST_POSTS, LIST_POSTS_SUCCESS, LIST_POSTS_FAILURE] =
  createRequestActionTypes('posts/LIST_POSTS')

export const listPosts = createAction(
  LIST_POSTS,
  ({ tag, username, page }) => ({ tag, username, page })
)

const listPostSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts)
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostSaga)
}

const initialState = { posts: null, error: null }

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts }) => ({
      ...state,
      posts
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error
    })
  },
  initialState
)

export default posts
