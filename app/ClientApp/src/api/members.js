import axios from 'axios'

const apiUrl = '/api/members'

const getAll = async () => {
  return axios.get(apiUrl)
}

const create = async (newMember) => {
  return axios.post(apiUrl, newMember)
}

const Delete = async (id) => {
  return axios.delete(`${apiUrl}${id}`)
}

const Edit = async (id, object) => {
  return axios.put(`${apiUrl}${id}`, object)
}

const memberService = {
  getAll,
  create,
  Delete,
  Edit
}

export default memberService
