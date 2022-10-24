import { takeLatest, put, call } from 'redux-saga/effects'
import { GET_MEMBERS_ACTION, CREATE_MEMBER_ACTION } from './constants'
import { getMembers, createMember } from '../../../api/members'

import {
  getMembersError,
  getMembersSuccess,
  createMemberSuccess,
  createMemberError
} from './actions'

function* onGetMembers() {
  try {
    const response = yield call(getMembers)
    yield put(getMembersSuccess(response))
  } catch (error) {
    yield put(getMembersError(error))
  }
}

function* onCreateMember({ newMember }) {
  try {
    const response = yield call(() => createMember(newMember))
    yield put(createMemberSuccess(response))
  } catch (error) {
    yield put(createMemberError(error))
  }
}

function* membersSaga() {
  yield takeLatest(GET_MEMBERS_ACTION, onGetMembers)
  yield takeLatest(CREATE_MEMBER_ACTION, onCreateMember)
}

export default membersSaga
