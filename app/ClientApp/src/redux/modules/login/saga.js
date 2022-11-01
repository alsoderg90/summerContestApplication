import { takeLatest, put, call } from 'redux-saga/effects'
import { LOGIN_ACTION } from './constants'
import { login as adminLogin } from 'api/login'
import { setToken, setUser } from 'api/api_helper'

import { loginError, loginSuccess } from './actions'

function* login(auth) {
  const { payload } = auth
  try {
    const response = yield call(() => adminLogin(payload))
    yield put(loginSuccess(payload))
    setToken(response)
    setUser(payload.email)
  } catch (error) {
    yield put(loginError(error))
  }
}

function* loginSaga() {
  yield takeLatest(LOGIN_ACTION, login)
}

export default loginSaga
