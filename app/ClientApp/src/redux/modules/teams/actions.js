import {
  GET_TEAMS_ACTION,
  GET_TEAMS_ERROR,
  GET_TEAMS_SUCCESS,
  CREATE_TEAM_ACTION,
  CREATE_TEAM_ERROR,
  CREATE_TEAM_SUCCESS,
  DELETE_TEAM_ACTION,
  DELETE_TEAM_ERROR,
  DELETE_TEAM_SUCCESS
} from './constants'

export const getTeams = () => {
  return {
    type: GET_TEAMS_ACTION
  }
}

export const getTeamsSuccess = (teams) => {
  return {
    type: GET_TEAMS_SUCCESS,
    payload: teams
  }
}

export const getTeamsError = (error) => {
  return {
    type: GET_TEAMS_ERROR,
    payload: error
  }
}

export const createTeam = (newTeam) => {
  return {
    type: CREATE_TEAM_ACTION,
    newTeam
  }
}

export const createTeamSuccess = (team) => {
  return {
    type: CREATE_TEAM_SUCCESS,
    payload: team
  }
}

export const createTeamError = (error) => {
  return {
    type: CREATE_TEAM_ERROR,
    payload: error
  }
}

export const deleteTeam = (id) => {
  return {
    type: DELETE_TEAM_ACTION,
    id
  }
}

export const deleteTeamSuccess = (deletedTeam) => {
  return {
    type: DELETE_TEAM_SUCCESS,
    payload: deletedTeam
  }
}

export const deleteTeamError = (error) => {
  return {
    type: DELETE_TEAM_ERROR,
    payload: error
  }
}
