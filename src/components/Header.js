import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    // const { perfilData } = this.props;
    return (
      <div>
        <p data-testid="header-player-name">a</p>
        <img
          data-testid="header-profile-picture"
          src=""
          alt="perfil"
        />
        <p data-testid="header-score">a</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  perfilData: state,
});

export default connect(mapStateToProps)(Header);
