import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { imageAction } from '../redux/actions';
import logo from '../assets/TriviaWaveTitle.png';

class Header extends Component {
  state = {
    hash: '',
  };

  componentDidMount() {
    this.fetchHash();
  }

  fetchHash = () => {
    const { perfilData: { gravatarEmail }, imageDispatch } = this.props;
    const hash = md5(gravatarEmail).toString();
    this.setState({
      hash,
    }, () => {
      const perfilImage = `https://www.gravatar.com/avatar/${hash}`;
      imageDispatch(perfilImage);
    });
  };

  render() {
    const { perfilData } = this.props;
    const { hash } = this.state;
    return (
      <div
        className="container-fluid
      d-flex justify-content-end
      p-3 text-white bg-header shadow-lg"
      >
        <div className="d-flex flex-column align-items-center w-25">
          <img src={ logo } alt="logo" width="80%" />
          <div className="d-flex gap-3">
            <p data-testid="header-player-name" className="fs-5">{ perfilData.name }</p>
            <p data-testid="header-score" className="fs-5">
              Points:
              {' '}
              { perfilData.score }
            </p>
          </div>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="perfil"
            className="rounded"
            width={ 50 }
          />
        </div>
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
  imageDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  perfilData: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  imageDispatch: (state) => dispatch(imageAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
