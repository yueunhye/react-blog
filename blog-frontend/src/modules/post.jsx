import createRequestSaga, {
  createRequestActionTypes
} from '../lib/createRequestSaga'
import { createAction, handleActions } from 'redux-actions'
import * as postAPI from '../lib/api/post'
import { takeLatest } from 'redux-saga/effects'

const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] =
  createRequestActionTypes('post/READ_POST')
const UNLOAD_POST = 'post/UNLOAD_POST'

export const readPost = createAction(READ_POST, id => id)
export const unloadPost = createAction(UNLOAD_POST)

const readPostSaga = createRequestSaga(READ_POST, postAPI.readPost)
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga)
}

const initialState = { post: null, error: null, lastPage: 1 }

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      lastPage: parseInt(['last-page'], 10)
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error
    }),
    [UNLOAD_POST]: () => initialState //초기 상태로 바뀜
  },
  initialState
)

export default post
