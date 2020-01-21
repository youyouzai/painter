import axios from 'axios'
import { Message } from 'element-ui'

const baseURL = 'http://localhost:3000/'
const successCode = 0
// create an axios instance
const service = axios.create({
  baseURL, // url = base url + request url
  timeout: 5000 // request timeout
})
function showError(message = 'Error') {
  Message({
    message: message,
    type: 'error',
    duration: 2 * 1000
  })
}
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== successCode) {
      showError(res.msg)
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    showError('~~感觉有什么不对！')
    return Promise.reject(error)
  }
)

export default service
