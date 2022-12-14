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

export const createTeamMemberPointsSuccess = (createdPoints) => {
  return {
    type: CREATE_TEAM_MEMBER_POINTS_SUCCESS,
    payload: createdPoints
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

export const deleteTeamMemberSuccess = (id) => {
  return {
    type: DELETE_TEAM_MEMBER_SUCCESS,
    payload: id
  }
}

export const deleteTeamMemberPointsSuccess = (id) => {
  return {
    type: DELETE_TEAM_MEMBER_POINTS_SUCCESS,
    payload: id
  }
}

export const editTeam = (id, editedTeam) => {
  return {
    type: EDIT_TEAM_ACTION,
    id,
    editedTeam
  }
}

export const editTeamSuccess = (editedTeam) => {
  return {
    type: EDIT_TEAM_SUCCESS,
    payload: editedTeam
  }
}

export const editTeamError = (error) => {
  return {
    type: EDIT_TEAM_ERROR,
    payload: error
  }
}

export const editTeamMemberSuccess = (editedMember) => {
  return {
    type: EDIT_TEAM_MEMBER_SUCCESS,
    payload: editedMember
  }
}

export const editTeamMemberPointsSuccess = (editedPoints) => {
  return {
    type: EDIT_TEAM_MEMBER_POINTS_SUCCESS,
    payload: editedPoints
  }
}
