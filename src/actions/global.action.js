import { SET_MESSAGE } from 'constants/global.const'

export const setMessage = (payload) => {
  return {
    type: SET_MESSAGE,
    payload,
  }
}
