import axios from 'axios'

const apiUrl = '/api/locations'

const getAll = async () => {
  const response = await axios.get(apiUrl)
  return response.data
}

const create = async (newLocation) => {
  const response = await axios.post(apiUrl, newLocation)
  return response.data
}

const remove = async (id) => {
  return axios.delete(`${apiUrl}/${id}`)
}

const update = async (id, object) => {
  return axios.put(`${apiUrl}/${id}`, object)
}

const locationService = {
  getAll,
  create,
  remove,
  update
}

export default locationService
