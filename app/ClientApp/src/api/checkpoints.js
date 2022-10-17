import axios from 'axios'

const apiUrl = '/api/checkpoints'

const getAll = async () => {
  return axios.get(apiUrl)
}

const create = async (newCheckpoint) => {
  console.log(newCheckpoint)
  return axios.post(apiUrl, newCheckpoint)
}

const Delete = async (id) => {
  return axios.delete(`${apiUrl}${id}`)
}

const Edit = async (id, object) => {
  return axios.put(`${apiUrl}${id}`, object)
}

const checkpointsService = {
  getAll,
  create,
  Delete,
  Edit
}

export default checkpointsService
