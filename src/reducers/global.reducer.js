import produce from 'immer'
import { SET_MESSAGE } from 'constants/global.const'

export const initialState = {
  loading: false,
  alert: {
    type: '',
    message: '',
    title: '',
    visible: false,
  },
}

const globalReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MESSAGE:
        draft.alert.type = action.payload.type
        draft.alert.message = action.payload.message
        draft.alert.visible = action.payload.visible
        draft.alert.title = action.payload.title
        break
      default:
        return state
    }
  })

export default globalReducer
