import axios from 'axios'

const apiUrl = '/api/teams'

const getAll = async () => {
  const response = await axios.get(apiUrl)
  return response.data
}

const create = async (newMember) => {
  const response = await axios.post(apiUrl, newMember)
  return response.data
}

const remove = async (id) => {
  return axios.delete(`${apiUrl}${id}`)
}

const update = async (id, object) => {
  return axios.put(`${apiUrl}${id}`, object)
}

const teamService = {
  getAll,
  create,
  remove,
  update
}

export default teamService
