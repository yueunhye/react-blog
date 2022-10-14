import { createAction, handleActions } from 'redux-actions'

const INITIALIZE = 'write/INITIALIZE'
//특정 key값 바꾸기
const CHANGE_FIELD = 'write/CHANGE_FIELD'

export const initialize = createAction(INITIALIZE)
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value
}))

const initialState = {
  title: '',
  body: '',
  tags: []
}

const write = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      //특정 key값 업데이트
      [key]: value
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
