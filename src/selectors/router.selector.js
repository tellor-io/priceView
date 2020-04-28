import { createSelector } from 'reselect'

const initialState = {
  location: {},
}
const selectRouter = (state) => state.router || initialState

const makeSelectPathName = () =>
  createSelector(
    selectRouter,
    (routerState) => routerState.location.pathname
  )

export { makeSelectPathName }
