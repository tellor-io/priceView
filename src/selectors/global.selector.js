import { createSelector } from 'reselect'
import { initialState } from 'reducers/global.reducer'

const selectGlobal = (state) => state.global || initialState

const makeSelectAlert = () =>
  createSelector(
    selectGlobal,
    (globalState) => globalState.alert
  )

export { makeSelectAlert }
