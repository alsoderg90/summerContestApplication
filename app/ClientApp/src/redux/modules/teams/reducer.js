import {
  GET_TEAMS_ACTION,
  GET_TEAMS_ERROR,
  GET_TEAMS_SUCCESS,
  CREATE_TEAM_ACTION,
  CREATE_TEAM_ERROR,
  CREATE_TEAM_SUCCESS,
  DELETE_TEAM_ACTION,
  DELETE_TEAM_ERROR,
  DELETE_TEAM_SUCCESS,
  EDIT_TEAM_ACTION,
  EDIT_TEAM_ERROR,
  EDIT_TEAM_SUCCESS,
  EDIT_TEAM_MEMBER_SUCCESS,
  DELETE_TEAM_MEMBER_SUCCESS,
  CREATE_TEAM_MEMBER_POINTS_SUCCESS,
  EDIT_TEAM_MEMBER_POINTS_SUCCESS,
  DELETE_TEAM_MEMBER_POINTS_SUCCESS
} from './constants'

const initialState = {
  teams: undefined,
  loadingTeams: false,
  error: undefined
}

/* eslint-disable indent */
const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAMS_ACTION:
    case DELETE_TEAM_ACTION:
    case CREATE_TEAM_ACTION:
    case EDIT_TEAM_ACTION:
      state = { ...state, loadingTeams: true }
      break
    case CREATE_TEAM_ERROR:
    case DELETE_TEAM_ERROR:
    case EDIT_TEAM_ERROR:
    case GET_TEAMS_ERROR: {
      const { data, status } = action.payload.response
      state = {
        ...state,
        error: { message: data, status },
        loadingMembers: false
      }
      break
    }
    case GET_TEAMS_SUCCESS:
      state = { ...state, teams: action.payload, loadingTeams: false }
      break
    case CREATE_TEAM_SUCCESS:
      state = {
        ...state,
        teams: state.teams.concat(action.payload),
        loadingTeams: false
      }
      break
    case CREATE_TEAM_MEMBER_POINTS_SUCCESS: {
      const { points } = action.payload
      const teams = state.teams.forEach((team) => {
        const members = team.members.map((member) => {
          const memberPoints = points.find(
            (point) => point.memberId === member.id
          )
          if (memberPoints) member.points.concat(memberPoints)
        })
        return { ...team, members }
      })
      state = { ...state, teams }
      break
    }
    case EDIT_TEAM_SUCCESS:
      {
        const teams = state.teams?.map((team) => {
          const members = team.members.filter((member) => {
            return action.payload.members.some(
              (am) => am.id !== member.id
            )
          })
          return team.id == action.payload.id
            ? action.payload
            : { ...team, members }
        })
        state = {
          ...state,
          teams,
          loadingTeams: false
        }
      }
      break
    case EDIT_TEAM_MEMBER_SUCCESS: {
      const teamId = action.payload.team?.id
      const { id } = action.payload
      if (teamId)
        state = {
          ...state,
          teams: state.teams.map((team) =>
            team.id !== teamId
              ? team
              : {
                  ...team,
                  members: team.members.map((member) =>
                    member.id === id ? action.payload : member
                  )
                }
          )
        }
      else state = { ...state }
      break
    }
    case EDIT_TEAM_MEMBER_POINTS_SUCCESS: {
      const updatedPoints = action.payload.points
      const teams = state.teams.map((team) => {
        const members = team.members.map((member) => {
          const memberPoints = updatedPoints.find(
            (updatedPoint) => updatedPoint.memberId === member.id
          )
          const points = member.points.map((point) =>
            point.id === memberPoints.id ? memberPoints : point
          )
          return { ...member, points }
        })
        return { ...team, members }
      })
      state = { ...state, teams }
      break
    }
    case DELETE_TEAM_MEMBER_POINTS_SUCCESS: {
      const deletedPoint = action.payload
      const teams = state.teams.map((team) => {
        const members = team.members.map((member) => {
          const points = member.points.filter(
            (point) => point.locationId !== deletedPoint
          )
          return { ...member, points }
        })
        return { ...team, members }
      })
      state = { ...state, teams }
      break
    }
    case DELETE_TEAM_MEMBER_SUCCESS:
      state = {
        ...state,
        teams: state.teams.map((team) => {
          const members = team.members.filter(
            (member) => member.id !== action.payload
          )
          return { ...team, members }
        })
      }
      break
    case DELETE_TEAM_SUCCESS:
      state = {
        ...state,
        teams: state.teams.filter(
          (team) => team.id !== action.payload
        ),
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
