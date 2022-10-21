import axios from 'axios'

const apiUrl = '/api/points'

const getAll = async () => {
  return axios.get(apiUrl)
}

const create = async (newMember) => {
  return axios.post(apiUrl, newMember)
}

const Delete = async (id) => {
  return axios.delete(`${apiUrl}${id}`)
}

const update = async (id, object) => {
  return axios.put(`${apiUrl}${id}`, object)
}

const pointServive = {
  getAll,
  create,
  Delete,
  update
}

export default pointServive
