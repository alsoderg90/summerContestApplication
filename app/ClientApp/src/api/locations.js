import { get, create } from './api_helper'

const LOCATIONS = 'api/locations'

//Locations
export const getLocations = () => get(LOCATIONS)

export const createLocation = (newLocation) => create(LOCATIONS, newLocation)

//Post
// export const getPostDetails = (id) =>
//   get(url.GET_LOCATIONS, {
//     params: {
//       id: id
//     }
//   })
