import axios from 'axios'
import {
  config
} from 'shelljs'

const baseUrl = 'http://127.0.0.1:8001'

axios.defaults.baseURL = baseUrl
// axios.interceptors.request.use(config => {
//   console.log(`config is: ${config.headers}`)
//   console.log(config)
//   // config.headers.Auth = window.sessionStorage.getItem('token')
//   return config
// })

export const login = params => {
  return axios.post('/api/login/', params).then(res => res)
}
export const getOrderById = params => {
  return axios.post('/api/getorderbyid/', params).then(res => res)
}

export const getMenuListUtil = () => {
  const rs = axios.post('/api/getmenulist/').then(res => res)
  console.log('--this is export const getMenulist')
  return rs
}

export const getUserListUtil = (params) => {
  const rs = axios.post('/api/getuserlist/', params).then(res => res)
  console.log('-- this is export const getuserlist')
  return rs
}

export const addUserUtil = params => {
  const rs = axios.post('/api/saveuser/', params).then(res => res)
  console.log('-- this is login.js addUserUtil')
  return rs
}

export const editUserUtil = params => {
  const rs = axios.post('/api/edituser/', params).then(res => res)
  console.log('-- this is login.js editUserUtil')
  return rs
}

export const deleteUserUtil = params => {
  const rs = axios.post('/api/deleteuser/', params).then(res => res)
  console.log('-- this is login.js editUserUtil')
  return rs
}
