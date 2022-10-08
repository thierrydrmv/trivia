import { LOGIN_DATA, SCORE_DATA } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_DATA:
    return {
      ...state,
      name: action.state.name,
      gravatarEmail: action.state.gravatarEmail,
    };
  case SCORE_DATA:
    return {
      ...state,
      score: state.score + action.state,
    };
  default:
    return state;
  }
}
