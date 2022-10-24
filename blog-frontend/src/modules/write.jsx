import { createAction, handleActions } from 'redux-actions'
import * as postAPI from '../lib/api/post'
import createRequestSaga, {
  createRequestActionTypes
} from '../lib/createRequestSaga'
import { takeLatest } from 'redux-saga/effects'

const INITIALIZE = 'write/INITIALIZE'
//특정 key값 바꾸기
const CHANGE_FIELD = 'write/CHANGE_FIELD'
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] =
  createRequestActionTypes('write/WRITE_POST')
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST'
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] =
  createRequestActionTypes('write/UPDATE_POST')

export const initialize = createAction(INITIALIZE)
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value
}))
export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
  title,
  body,
  tags
}))
export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post)
export const updatePost = createAction(
  UPDATE_POST,
  ({ id, title, body, tags }) => ({
    id,
    title,
    body,
    tags
  })
)

const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost)
const updatePostSaga = createRequestSaga(UPDATE_POST, postAPI.updatePost)

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga)
  yield takeLatest(UPDATE_POST, updatePostSaga)
}

const initialState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
  originalPostId: null
}

const write = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      //특정 key값 업데이트
      [key]: value
    }),
    [WRITE_POST]: state => ({
      ...state,
      post: null,
      postError: null
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post
    }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      title: post.title,
      body: post.body,
      tags: post.tags,
      originalPostId: post._id
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      error: postError
    })
  },
  initialState
)

export default write

// export const initialize = () => ({type: INITIALIZE})
// export const changeField = ({key, value}) => ({type: CHANGE_FIELD, key, value})
// function write (state, action) {
//   switch(action.type) {
//     case INITIALIZE:
//       return {initialState}
//     case CHANGE_FIELD:
//       return {...state, [action.key]: action.value}
//     default:
//     return state
//   }
// }
