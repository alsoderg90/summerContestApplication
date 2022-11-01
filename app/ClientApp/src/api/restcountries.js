import axios from 'axios'

const get = async (formData) => {
  return axios
    .get(`https://restcountries.com/v3.1/name/${formData.nationality}`)
    .then((response) => response.data[0].flags.svg)
    .catch((error) => {
      console.log(error)
      return ''
    })
}

const restCountriesService = {
  get
}

export default restCountriesService
