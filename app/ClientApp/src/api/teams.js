import { get, create, remove, edit } from './api_helper'

const TEAMS = 'api/teams'

export const getTeams = () => get(TEAMS)

export const createTeam = (newTeam) => create(TEAMS, newTeam)

export const deleteTeam = (deletedTeam) => remove(TEAMS, deletedTeam)

export const editTeam = (id, editedTeam) =>
  edit(TEAMS, id, editedTeam)
