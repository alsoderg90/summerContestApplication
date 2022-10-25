import { get, create, remove } from './api_helper'

const MEMBERS = 'api/members'

export const getMembers = () => get(MEMBERS)

export const createMember = (newMember) => create(MEMBERS, newMember)

export const deleteMember = (id) => remove(MEMBERS, id)
