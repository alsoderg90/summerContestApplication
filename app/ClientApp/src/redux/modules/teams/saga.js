import { takeLatest, put, call } from 'redux-saga/effects'
import {
  GET_TEAMS_ACTION,
  CREATE_TEAM_ACTION,
  DELETE_TEAM_ACTION
} from './constants'
import { getTeams, createTeam, deleteTeam } from '../../../api/teams'

import {
  getTeamsError,
  getTeamsSuccess,
  createTeamSuccess,
  createTeamError,
  deleteTeamError,
  deleteTeamSuccess
} from './actions'

function* onGetTeams() {
  try {
    const response = yield call(getTeams)
    yield put(getTeamsSuccess(response))
  } catch (error) {
    yield put(getTeamsError(error))
  }
}

function* onCreateTeam({ newTeam }) {
  try {
    const response = yield call(() => createTeam(newTeam))
    yield put(createTeamSuccess(response))
  } catch (error) {
    yield put(createTeamError(error))
  }
}

function* onDeleteTeam({ id }) {
  try {
    const response = yield call(() => deleteTeam(id))
    yield put(deleteTeamSuccess(response))
  } catch (error) {
    yield put(deleteTeamError(error))
  }
}

function* teamsSaga() {
  yield takeLatest(GET_TEAMS_ACTION, onGetTeams)
  yield takeLatest(CREATE_TEAM_ACTION, onCreateTeam)
  yield takeLatest(DELETE_TEAM_ACTION, onDeleteTeam)
}

export default teamsSaga
