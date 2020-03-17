import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8001'

axios.defaults.baseURL = baseUrl

export const login = params => {
  return axios.post('/api/login/', params).then(res => res)
}
export const getOrderById = params => {
  return axios.post('/api/getorderbyid/', params).then(res => res)
}
