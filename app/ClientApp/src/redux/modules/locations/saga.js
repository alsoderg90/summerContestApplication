import { takeLatest, put, call } from 'redux-saga/effects'
import { GET_LOCATIONS_ACTION, CREATE_LOCATION_ACTION } from './constants'
import { getLocations, createLocation } from '../../../api/locations'

import {
  getLocationsError,
  getLocationsSuccess,
  createLocationSuccess,
  createLocationError
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
  } catch (error) {
    yield put(createLocationError(error))
  }
}

function* locationSaga() {
  yield takeLatest(GET_LOCATIONS_ACTION, onGetLocations)
  yield takeLatest(CREATE_LOCATION_ACTION, onCreateLocation)
}

export default locationSaga
