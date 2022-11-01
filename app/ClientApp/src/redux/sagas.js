import { all, fork } from 'redux-saga/effects'
import locationSaga from './modules/locations/saga'
import membersSaga from './modules/members/saga'
import pointsSaga from './modules/points/saga'
import teamsSaga from './modules/teams/saga'
import loginSaga from './modules/login/saga'

export default function* rootSaga() {
  yield all([fork(locationSaga)])
  yield all([fork(membersSaga)])
  yield all([fork(pointsSaga)])
  yield all([fork(teamsSaga)])
  yield all([fork(loginSaga)])
}
