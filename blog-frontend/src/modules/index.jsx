import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import auth, { authSaga } from './auth'
import loading from './loading'
import user, { userSaga } from './user'
import write from './write'

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write
})
// all 함수는 여러 사가를 합쳐주는 역할
export function* rootSaga() {
  yield all([authSaga(), userSaga()])
}

export default rootReducer
