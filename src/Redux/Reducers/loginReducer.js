import { LOGIN_DATA } from "../Actions";

const INITIAL_STATE = {
  email: '',
  gravatarEmail: '',
}

export const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_DATA:
      return {
        ...state,
        email: action.state.email,
        gravatarEmail: action.state.gravatarEmail
      }
    default:
      return state,
  }
}