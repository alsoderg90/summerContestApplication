import { takeLatest, put, call } from 'redux-saga/effects'
import { GET_POINTS_ACTION } from './constants'
import { getPoints } from '../../../api/points'

import { getPointsError, getPointsSuccess } from './actions'

function* onGetPoints() {
  try {
    const response = yield call(getPoints)
    yield put(getPointsSuccess(response))
  } catch (error) {
    yield put(getPointsError(error))
  }
}

function* pointsSaga() {
  yield takeLatest(GET_POINTS_ACTION, onGetPoints)
}

export default pointsSaga
