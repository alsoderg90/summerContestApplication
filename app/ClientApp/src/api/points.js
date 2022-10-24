import { get } from './api_helper'

const POINTS = 'api/points'

export const getPoints = () => get(POINTS)
