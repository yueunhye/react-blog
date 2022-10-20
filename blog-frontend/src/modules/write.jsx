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

const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost)

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga)
}

const initialState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null
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
