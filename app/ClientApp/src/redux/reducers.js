import { combineReducers } from 'redux'
import locationReducer from './modules/locations/reducer'
import memberReducer from './modules/members/reducer'
import pointReducer from './modules/points/reducer'
import teamReducer from './modules/teams/reducer'
import loginReducer from './modules/login/reducer'
import notificationReducer from './helpers/notifications/reducer'

const rootReducer = combineReducers({
  locationReducer,
  memberReducer,
  pointReducer,
  notificationReducer,
  teamReducer,
  loginReducer
})

export default rootReducer
