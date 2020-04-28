import axios from 'axios'
import moment from 'moment'
import { getStore } from 'store/configureStore'
import { logoutRequest } from 'actions/auth.action'

const request = axios.create({
  baseURL: process.env.REACT_APP_PROXY + '/' + process.env.REACT_APP_API_BASE_URL,
})

request.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401) {
    //place your reentry code
    if (request.defaults.headers.common['Authorization'])
      getStore().dispatch(logoutRequest())
  }
  throw error
})
