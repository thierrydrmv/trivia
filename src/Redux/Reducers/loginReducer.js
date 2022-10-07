import { LOGIN_DATA } from '../Actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_DATA:
    return {
      ...state,
      name: action.state.name,
      gravatarEmail: action.state.gravatarEmail,
    };
  default:
    return state;
  }
}
