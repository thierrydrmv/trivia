import { GENERIC_DATA, LOGIN_DATA } from "./actionTypes";

export const genericAction = (state) => ({ type: GENERIC_DATA, state });

export const stateAction = (state) => ({ type: LOGIN_DATA, state });
