import { startLoading, finishLoading } from '../modules/loading'
import { call, put } from 'redux-saga/effects'

export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`
  const FAILURE = `${type}_FAILURE`
  return [type, SUCCESS, FAILURE]
}

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`
  const FAILURE = `${type}_FAILURE`

  return function* (action) {
    yield put(startLoading(type)) //로딩시작
    try {
      const res = yield call(request, action.payload)
      yield put({
        type: SUCCESS,
        payload: res.data
      })
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true
      })
    }
    yield put(finishLoading(type)) //로딩끝
  }
}

// export default function createRequestThunk(type, request) {
//   const SUCCESS = `${type}_SUCCESS`
//   const FAILURE = `${type}_FAILURE`

//   return params => async dispatch => {
//     dispatch({ type })
//     dispatch(startLoading(type))
//     try {
//       const res = await request(params)
//       dispatch({
//         type: SUCCESS,
//         payload: res.data
//       })
//       dispatch(finishLoading(type))
//     } catch (e) {
//       dispatch({
//         type: FAILURE,
//         payload: e,
//         error: true
//       })
//       dispatch(startLoading(type))
//       throw e
//     }
//   }
// }
