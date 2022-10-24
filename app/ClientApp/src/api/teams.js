import { get, create } from './api_helper'

const TEAMS = 'api/teams'

export const getTeams = () => get(TEAMS)

export const createTeam = (newTeam) => create(TEAMS, newTeam)
