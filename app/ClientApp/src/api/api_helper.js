import axios from 'axios'

const axiosApi = axios.create({
  baseURL: '/api'
})

axios.interceptors.request.use(function (config) {
  return config
})

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

const getToken = () => {
  return window.localStorage.getItem('token')
}

export const setToken = (newToken) => {
  window.localStorage.setItem('token', newToken)
}

export const setUser = (newUser) => {
  window.localStorage.setItem('user', newUser)
}

export async function get(url, config) {
  const response = await axios
    .get(url, {
      ...config
    })
    .then((response) => response.data)
  return response
}

export async function create(url, entity, config) {
  const response = await axios
    .post(url, entity, {
      ...config
    })
    .then((response) => {
      return response.data
    })
  return response
}

export async function remove(url, id, config) {
  const token = getToken()
  const response = await axios
    .delete(`${url}/${id}`, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response.data)
  return response
}
