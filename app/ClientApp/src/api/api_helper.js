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

export async function get(url, config) {
  return await axios
    .get(url, {
      ...config
    })
    .then((response) => response.data)
}

export async function create(url, entity, config) {
  return await axios
    .post(url, entity, {
      ...config
    })
    .then((response) => response.data)
}
