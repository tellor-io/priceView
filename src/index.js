import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'
import './style/index.scss'

import history from 'utils/history'
import configureStore from 'store/configureStore'
import Routes from 'containers/App'

import * as serviceWorker from './serviceWorker'

const initialState = {}
const { store, persistor } = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  MOUNT_NODE
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
