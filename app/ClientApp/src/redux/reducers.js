//import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import locationReducer from './modules/locations/reducer'
import memberReducer from './modules/members/reducer'
import pointReducer from './modules/points/reducer'
import teamReducer from './modules/teams/reducer'

const rootReducer = combineReducers({
  locationReducer,
  memberReducer,
  pointReducer,
  teamReducer
})

export default rootReducer
