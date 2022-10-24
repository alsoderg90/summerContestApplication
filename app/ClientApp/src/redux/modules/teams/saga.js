import { takeLatest, put, call } from 'redux-saga/effects'
import { GET_TEAMS_ACTION, CREATE_TEAM_ACTION } from './constants'
import { getTeams, createTeam } from '../../../api/teams'

import {
  getTeamsError,
  getTeamsSuccess,
  createTeamSuccess,
  createTeamError
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

function* teamsSaga() {
  yield takeLatest(GET_TEAMS_ACTION, onGetTeams)
  yield takeLatest(CREATE_TEAM_ACTION, onCreateTeam)
}

export default teamsSaga
