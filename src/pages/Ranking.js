import PropTypes from 'prop-types';
import React from 'react';
import Button from '../components/Button';

class Ranking extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Button
          datatestid="btn-go-home"
          onClick={ this.handleClick }
        >
          Ir para o início!
        </Button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
