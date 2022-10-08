import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    hash: '',
  };

  componentDidMount() {
    this.fetchHash();
  }

  fetchHash = () => {
    const { perfilData: { gravatarEmail } } = this.props;
    const hash = md5(gravatarEmail).toString();
    this.setState({
      hash,
    });
  };

  render() {
    const { perfilData } = this.props;
    const { hash } = this.state;
    return (
      <div>
        <p data-testid="header-player-name">{ perfilData.name }</p>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="perfil"
        />
        <p data-testid="header-score">{ perfilData.score }</p>
      </div>
    );
  }
}

Header.propTypes = {
  perfilData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  perfilData: state.player,
});

export default connect(mapStateToProps)(Header);
