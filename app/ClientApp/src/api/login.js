import { create } from './api_helper'

const LOGIN = 'api/users'

export const login = (auth) => create(LOGIN, auth)
