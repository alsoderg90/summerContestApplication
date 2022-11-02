import { create } from './api_helper'

const LOGIN = 'api/login'

export const login = (auth) => create(LOGIN, auth)
