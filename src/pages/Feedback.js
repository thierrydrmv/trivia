import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedback extends React.Component {
  ranking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { assertions, score } = this.props;
    const minAssertions = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-text">
          {assertions < minAssertions ? 'Could be better...' : 'Well Done!'}
        </p>
        <Button
          datatestid="btn-play-again"
          name="playAgain"
          onClick={ this.playAgain }
        >
          Play Again
        </Button>
        <Button
          datatestid="btn-ranking"
          name="rankingBtn"
          onClick={ this.ranking }
        >
          Ranking
        </Button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
