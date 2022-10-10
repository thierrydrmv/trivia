import { HOME_DISPATCH, IMAGE_DATA, LOGIN_DATA, SCORE_DATA } from './actionTypes';

export const imageAction = (state) => ({ type: IMAGE_DATA, state });

export const stateAction = (state) => ({ type: LOGIN_DATA, state });

export const scoreAction = (state) => ({ type: SCORE_DATA, state });

export const rankingToHomeAction = () => ({ type: HOME_DISPATCH });
