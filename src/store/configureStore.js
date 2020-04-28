import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import createReducer from 'reducers'

import sagas from 'sagas'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router'],
}

let storeObj = null

const persistedReducer = persistReducer(persistConfig, createReducer())

export const getStore = () => {
  return storeObj
}

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  }

  const sagaMiddleware = createSagaMiddleware()

  const middleWares = [sagaMiddleware, routerMiddleware(history)]

  const enhancers = [applyMiddleware(...middleWares)]

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(...enhancers)
  )
  storeObj = store

  sagaMiddleware.run(sagas)

  const persistor = persistStore(store)

  return { store, persistor }
}
