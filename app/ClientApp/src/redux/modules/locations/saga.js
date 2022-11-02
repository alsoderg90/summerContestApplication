import { takeLatest, put, call, all } from 'redux-saga/effects'
import {
  getLocations,
  createLocation,
  deleteLocation,
  editLocation
} from 'api/locations'
import {
  GET_LOCATIONS_ACTION,
  CREATE_LOCATION_ACTION,
  DELETE_LOCATION_ACTION,
  EDIT_LOCATION_ACTION
} from './constants'
import {
  getLocationsError,
  getLocationsSuccess,
  createLocationSuccess,
  createLocationError,
  deleteLocationError,
  deleteLocationSuccess,
  editLocationSuccess,
  editLocationError
} from './actions'
import {
  createMemberLocationSuccess,
  deleteMemberLocationSuccess,
  editMemberLocationSuccess
} from '../members/actions'

function* onGetLocations() {
  try {
    const response = yield call(getLocations)
    yield put(getLocationsSuccess(response))
  } catch (error) {
    yield put(getLocationsError(error))
  }
}

function* onCreateLocation({ newLocation }) {
  try {
    const response = yield call(() => createLocation(newLocation))
    yield all([
      put(createLocationSuccess(response)),
      put(createMemberLocationSuccess(response))
    ])
  } catch (error) {
    yield put(createLocationError(error))
  }
}

function* onDeleteLocation({ id }) {
  try {
    const response = yield call(() => deleteLocation(id))
    yield all([
      put(deleteLocationSuccess(response)),
      put(deleteMemberLocationSuccess(response))
    ])
  } catch (error) {
    yield put(deleteLocationError(error))
  }
}

function* onEditLocation({ id, editedLocation }) {
  try {
    const response = yield call(() =>
      editLocation(id, editedLocation)
    )
    yield all([
      put(editLocationSuccess(response)),
      put(editMemberLocationSuccess(response))
    ])
  } catch (error) {
    yield put(editLocationError(error))
  }
}

function* locationSaga() {
  yield takeLatest(GET_LOCATIONS_ACTION, onGetLocations)
  yield takeLatest(CREATE_LOCATION_ACTION, onCreateLocation)
  yield takeLatest(DELETE_LOCATION_ACTION, onDeleteLocation)
  yield takeLatest(EDIT_LOCATION_ACTION, onEditLocation)
}

export default locationSaga
