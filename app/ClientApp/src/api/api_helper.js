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
    .then((response) => response.data)
  return response
}

export async function remove(url, id, config) {
  const response = await axios
    .delete(`${url}/${id}`, {
      ...config
    })
    .then((response) => response.data)
  return response
}
