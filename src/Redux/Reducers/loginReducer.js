import { LOGIN_DATA } from '../Actions/actionTypes';

const INITIAL_STATE = {
  email: '',
  gravatarEmail: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_DATA:
    return {
      ...state,
      email: action.state.email,
      gravatarEmail: action.state.gravatarEmail,
    };
  default:
    return state;
  }
}
