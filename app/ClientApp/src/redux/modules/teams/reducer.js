import {
  GET_TEAMS_ACTION,
  GET_TEAMS_ERROR,
  GET_TEAMS_SUCCESS,
  CREATE_TEAM_ACTION,
  CREATE_TEAM_ERROR,
  CREATE_TEAM_SUCCESS
} from './constants'

const initialState = {
  teams: undefined,
  loadingTeams: false,
  error: {
    message: ''
  }
}

/* eslint-disable indent */
const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAMS_ACTION:
    case CREATE_TEAM_ACTION:
      state = { ...state, loadingTeams: true }
      break
    case CREATE_TEAM_ERROR:
    case GET_TEAMS_ERROR:
      console.log('error')
      state = { ...state, error: { message: 'Error' }, loadingTeams: false }
      break
    case GET_TEAMS_SUCCESS:
      state = { ...state, teams: action.payload, loadingTeams: false }
      break
    case CREATE_TEAM_SUCCESS:
      state = {
        ...state,
        members: state.teams.concat(action.payload),
        loadingMembers: false
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default teamReducer
