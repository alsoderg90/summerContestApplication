import axios from 'axios'

const get = async (formData) => {
  return axios.get(
    `https://restcountries.com/v3.1/name/${formData.nationality}`
  )
}

const restCountriesService = {
  get
}

export default restCountriesService
