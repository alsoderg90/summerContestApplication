import { takeLatest, put, call } from 'redux-saga/effects'
import {
  getMembers,
  createMember,
  deleteMember,
  editMember
} from 'api/members'
import {
  GET_MEMBERS_ACTION,
  CREATE_MEMBER_ACTION,
  DELETE_MEMBER_ACTION,
  EDIT_MEMBER_ACTION
} from './constants'
import {
  getMembersError,
  getMembersSuccess,
  createMemberSuccess,
  createMemberError,
  deleteMemberSuccess,
  deleteMemberError,
  editMemberError,
  editMemberSuccess
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

function* onDeleteMember({ id }) {
  try {
    const response = yield call(() => deleteMember(id))
    yield put(deleteMemberSuccess(response))
  } catch (error) {
    yield put(deleteMemberError(error))
  }
}

function* onEditMember({ id, editedMember }) {
  try {
    const response = yield call(() => editMember(id, editedMember))
    yield put(editMemberSuccess(response))
  } catch (error) {
    yield put(editMemberError(error))
  }
}

function* membersSaga() {
  yield takeLatest(GET_MEMBERS_ACTION, onGetMembers)
  yield takeLatest(CREATE_MEMBER_ACTION, onCreateMember)
  yield takeLatest(DELETE_MEMBER_ACTION, onDeleteMember)
  yield takeLatest(EDIT_MEMBER_ACTION, onEditMember)
}

export default membersSaga
