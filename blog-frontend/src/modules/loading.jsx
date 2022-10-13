import { handleActions, createAction } from 'redux-actions'

const START_LOADING = 'loading/START_LOADING'
const FINISH_LOADING = 'loading/FINISH_LOADING'

//createAction함수 첫번째 인자로 액션생성이름, 두번째 파라미터에는 payload
export const startLoading = createAction(
  START_LOADING,
  requestType => requestType
)
export const finishLoading = createAction(
  FINISH_LOADING,
  requestType => requestType
)

const initialState = {}

//변수선언 -> 핸들액션함수 안에 객체로 -> 첫번째인자에 객체들, 두번째는 초기값
const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false
    })
  },
  initialState
)
export default loading

// export const startLoading = requestType => ({
//   type: START_LOADING,
//   requestType
// })
// export const finishLoading = requestType => ({
//   type: FINISH_LOADING,
//   requestType
// })
// function loading(state = initialState, action) {
//   switch (action.type) {
//     case START_LOADING:
//       return {
//         ...state,
//         [action.payload]: true
//       }
//     case FINISH_LOADING:
//       return {
//         ...state,
//         [action.payload]: false
//       }
//     default:
//       return state
//   }
// }
