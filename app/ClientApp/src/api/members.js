import { get, create } from './api_helper'

const MEMBERS = 'api/members'

export const getMembers = () => get(MEMBERS)

export const createMember = (newMember) => create(MEMBERS, newMember)
