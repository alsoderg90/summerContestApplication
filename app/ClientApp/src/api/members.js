import { get, create, remove, edit } from './api_helper'

const MEMBERS = 'api/members'

export const getMembers = () => get(MEMBERS)

export const createMember = (newMember) => create(MEMBERS, newMember)

export const deleteMember = (id) => remove(MEMBERS, id)

export const editMember = (id, editedMember) =>
  edit(MEMBERS, id, editedMember)
