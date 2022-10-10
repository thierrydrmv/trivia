import {
  HOME_DISPATCH,
  IMAGE_DATA,
  LOGIN_DATA,
  SCORE_DATA,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
  gravatarAvatar: '',
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case IMAGE_DATA:
    return {
      ...state,
      gravatarAvatar: action.state,
    };
  case LOGIN_DATA:
    return {
      ...state,
      name: action.state.name,
      gravatarEmail: action.state.gravatarEmail,
    };
  case SCORE_DATA:
    return {
      ...state,
      score: state.score + action.state.score,
      assertions: state.assertions + action.state.assertions,
    };
  case HOME_DISPATCH:
    return {
      name: '',
      gravatarEmail: '',
      score: 0,
      assertions: 0,
      gravatarAvatar: '',
    };
  default:
    return state;
  }
}
