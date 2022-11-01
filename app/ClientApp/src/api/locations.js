import { get, create, remove, edit } from './api_helper'

const LOCATIONS = 'api/locations'

//Locations
export const getLocations = () => get(LOCATIONS)

export const createLocation = (newLocation) => create(LOCATIONS, newLocation)

export const deleteLocation = (locationId) => remove(LOCATIONS, locationId)

export const editLocation = (id, editedLocation) =>
  edit(LOCATIONS, id, editedLocation)

//Post
// export const getPostDetails = (id) =>
//   get(url.GET_LOCATIONS, {
//     params: {
//       id: id
//     }
//   })
