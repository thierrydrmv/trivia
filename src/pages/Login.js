import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import gear from '../assets/gearfill.svg';
import play from '../assets/play-fill.svg';
import { stateAction } from '../redux/actions';
import logo from '../assets/TriviaWaveTitle.png';

class Login extends React.Component {
  state = {
    name: '',
    gravatarEmail: '',
    disabled: true,
    wSize: window.innerWidth,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.verifyCondition()
    );
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
    window.addEventListener('resize', () => {
      this.setState({
        wSize: window.innerWidth,
      });
    });

    const { name, gravatarEmail, disabled, wSize } = this.state;
    return (
      <div className='container'>
        <div className='d-flex justify-content-center align-items-center flex-column vh-100 gap-3 text-center'>
          <img src={logo} alt='logo' width='80%' />
          <div
            className={`${
              wSize < 1000 ? 'w-100' : 'w-50'
            } p-5 border-top rounded text-black bg-div-login`}
          >
            <Input
              datatestid='input-player-name'
              type='text'
              name='name'
              value={name}
              onChange={this.handleChange}
              className='form-control'
            >
              <span className='fs-4'>Nome</span>
            </Input>
            <Input
              datatestid='input-gravatar-email'
              type='text'
              name='gravatarEmail'
              value={gravatarEmail}
              onChange={this.handleChange}
              className='form-control'
            >
              <span className='fs-4'>E-mail</span>
            </Input>
            <div className='d-flex justify-content-center mt-4 gap-4 teste'>
              <button
                className={disabled ? 'disabled-start' : 'start-btn'}
                onClick={this.handleClick}
                disabled={disabled}
              >
                START
              </button>
              <img
                src={gear}
                alt='settings'
                width={45}
                onClick={this.handleSettings}
                className='settings-button'
              />
            </div>
          </div>
        </div>
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
