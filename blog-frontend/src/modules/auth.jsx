import produce from 'immer'
import createRequestSaga, {
  createRequestActionTypes
} from '../lib/createRequestSaga'
import * as authAPI from '../lib/api/auth'
import { handleActions, createAction } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'

const CHANGE_FIELD = 'auth/CHANGE_FIELD'
const INITIALIZE_FORM = 'auth/INITIALIZE_FROM'

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER')
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN')

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, //register, login
    key, // username, password, passwordConfirm
    value // 실제 바꾸려는 값
  })
)
export const initializeForm = createAction(INITIALIZE_FORM, form => form)

export const register = createAction(REGISTER, ({ username, password }) => ({
  username,
  password
}))
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password
}))

const registerSaga = createRequestSaga(REGISTER, authAPI.register)
const loginSaga = createRequestSaga(LOGIN, authAPI.login)
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga)
  yield takeLatest(LOGIN, loginSaga)
}

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: ''
  },
  login: {
    username: '',
    password: ''
  },
  auth: null,
  authError: null
}

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    })
  },
  initialState
)

export default auth
// export const changeField = ({ form, key, value }) => ({
//   type: CHANGE_FIELD,
//   form,
//   key,
//   value
// })
// export const initializeForm = form => ({ type: INITIALIZE_FORM, form })
// export const register = ({ username, password }) => ({
//   type: REGISTER,
//   username,
//   password
// })
// export const login = ({ username, password }) => ({
//   type: LOGIN,
//   username,
//   password
// })
// function auth(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_FIELD:
//       const nextState = produce(state, draft => {
//         draft[action.form][action.key] = action.value
//       })
//       return nextState
//     case INITIALIZE_FORM:
//       return {
//         ...state,
//         [action.form]: initialState[action.form],
//         authError: null
//       }
//     default:
//       return state
//   }
// }
