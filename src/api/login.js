import axios from 'axios'
import { config } from 'shelljs'

const baseUrl = 'http://127.0.0.1:8001'

axios.defaults.baseURL = baseUrl
axios.interceptors.request.use(config => {
  console.log(`config is: ${config.headers}`)
  console.log(config)
  // config.headers.Auth = window.sessionStorage.getItem('token')
  return config
})

export const login = params => {
  return axios.post('/api/login/', params).then(res => res)
}
export const getOrderById = params => {
  return axios.post('/api/getorderbyid/', params).then(res => res)
}

export const getMenuList = async () => {
  const rs = axios.post('/api/getmenulist/').then(res => res)
  console.log('--getmenulist:')
  console.log(rs)
  return rs
}
