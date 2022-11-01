import { takeLatest, put, call } from 'redux-saga/effects'
import { getLocations, createLocation, deleteLocation } from 'api/locations'
import { setPointsSuccess } from '../points/actions'
import {
  GET_LOCATIONS_ACTION,
  CREATE_LOCATION_ACTION,
  DELETE_LOCATION_ACTION
} from './constants'
import {
  getLocationsError,
  getLocationsSuccess,
  createLocationSuccess,
  createLocationError,
  deleteLocationError,
  deleteLocationSuccess
} from './actions'

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
    yield put(createLocationSuccess(response))
    yield put(setPointsSuccess(response.points))
  } catch (error) {
    yield put(createLocationError(error))
  }
}

function* onDeleteMember({ id }) {
  try {
    const response = yield call(() => deleteLocation(id))
    yield put(deleteLocationSuccess(response))
  } catch (error) {
    yield put(deleteLocationError(error))
  }
}

function* locationSaga() {
  yield takeLatest(GET_LOCATIONS_ACTION, onGetLocations)
  yield takeLatest(CREATE_LOCATION_ACTION, onCreateLocation)
  yield takeLatest(DELETE_LOCATION_ACTION, onDeleteMember)
}

export default locationSaga
