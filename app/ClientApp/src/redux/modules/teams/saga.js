import { takeLatest, put, call, all } from 'redux-saga/effects'
import { getTeams, createTeam, deleteTeam, editTeam } from 'api/teams'
import {
  GET_TEAMS_ACTION,
  CREATE_TEAM_ACTION,
  DELETE_TEAM_ACTION,
  EDIT_TEAM_ACTION
} from './constants'
import {
  getTeamsError,
  getTeamsSuccess,
  createTeamSuccess,
  createTeamError,
  deleteTeamError,
  deleteTeamSuccess,
  editTeamError,
  editTeamSuccess
} from './actions'
import { createNotification } from 'redux/helpers/notifications/actions'

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
    yield all([
      put(createTeamSuccess(response)),
      put(
        createNotification({
          type: 'created',
          message: response.name
        })
      )
    ])
  } catch (error) {
    yield put(createTeamError(error))
  }
}

function* onDeleteTeam({ id }) {
  try {
    const response = yield call(() => deleteTeam(id))
    yield all([
      put(deleteTeamSuccess(response)),
      put(
        createNotification({
          type: 'deleted',
          message: response.name
        })
      )
    ])
  } catch (error) {
    yield put(deleteTeamError(error))
  }
}

function* onEditTeam({ id, editedTeam }) {
  try {
    const response = yield call(() => editTeam(id, editedTeam))
    yield all([
      put(editTeamSuccess(response)),
      put(
        createNotification({
          type: 'edited',
          message: response.name
        })
      )
    ])
  } catch (error) {
    yield put(editTeamError(error))
  }
}

function* teamsSaga() {
  yield takeLatest(GET_TEAMS_ACTION, onGetTeams)
  yield takeLatest(CREATE_TEAM_ACTION, onCreateTeam)
  yield takeLatest(DELETE_TEAM_ACTION, onDeleteTeam)
  yield takeLatest(EDIT_TEAM_ACTION, onEditTeam)
}

export default teamsSaga
