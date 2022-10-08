import { GENERIC_DATA, LOGIN_DATA, SCORE_DATA } from './actionTypes';

export const genericAction = (state) => ({ type: GENERIC_DATA, state });

export const stateAction = (state) => ({ type: LOGIN_DATA, state });

export const scoreAction = (state) => ({ type: SCORE_DATA, state });
