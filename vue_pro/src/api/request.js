import axios from 'axios'

const api = axios.create({
  baseURL: 'http://123.60.41.109:8088'
})
api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
export default api
