import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import { stateAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    gravatarEmail: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verifyCondition());
  };

  verifyCondition = () => {
    const { name, gravatarEmail } = this.state;
    if (name.length > 1 && gravatarEmail.length > 1) {
      return this.setState({
        disabled: false,
      });
    }
    return this.setState({
      disabled: true,
    });
  };

  handleClick = async () => {
    const { name, gravatarEmail } = this.state;
    const endpoint = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(endpoint);
    const response = await request.json();
    const { token } = response;
    this.dispatchTokenToLocalStorage(token);
    const { history, dispatchLogin } = this.props;
    dispatchLogin({ name, gravatarEmail });
    history.push('/game');
  };

  handleSettings = () => {
    const { history } = this.props;
    history.push('/configuracoes');
  };

  dispatchTokenToLocalStorage = (token) => {
    localStorage.setItem('token', token);
  };

  render() {
    const {
      name,
      gravatarEmail,
      disabled,
    } = this.state;
    return (
      <div>
        <Input
          datatestid="input-player-name"
          type="text"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        >
          Nome
        </Input>
        <Input
          datatestid="input-gravatar-email"
          type="text"
          name="gravatarEmail"
          value={ gravatarEmail }
          onChange={ this.handleChange }
        >
          E-mail
        </Input>
        <Button
          disabled={ disabled }
          datatestid="btn-play"
          name="loginBtn"
          value={ name }
          onClick={ this.handleClick }
        >
          Play
        </Button>
        <Button
          datatestid="btn-settings"
          name="settingsBtn"
          value={ name }
          onClick={ this.handleSettings }
        >
          Settings
        </Button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (state) => dispatch(stateAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);
