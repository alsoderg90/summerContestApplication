import { get, create, remove } from './api_helper'

const LOCATIONS = 'api/locations'

//Locations
export const getLocations = () => get(LOCATIONS)

export const createLocation = (newLocation) => create(LOCATIONS, newLocation)

export const deleteLocation = (locationId) => remove(LOCATIONS, locationId)

//Post
// export const getPostDetails = (id) =>
//   get(url.GET_LOCATIONS, {
//     params: {
//       id: id
//     }
//   })
