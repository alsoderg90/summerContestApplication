import axios from 'axios'

const apiUrl = '/api/members'

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

const memberService = {
  getAll,
  create,
  remove,
  update
}

export default memberService
