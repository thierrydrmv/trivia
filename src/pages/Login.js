import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

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

  handleClick = () => {
  };

  render() {
    const { name, gravatarEmail, disabled } = this.state;
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
          onChange={ this.handleClick }
        >
          Play
        </Button>
      </div>
    );
  }
}

export default Login;
