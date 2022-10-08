import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedback extends React.Component {
  state = {
    name: '',
  };

  ranking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const { name } = this.state;
    const minAssertions = 3;
    const feedbackText = assertions < minAssertions ? 'Could be better...' : 'Well Done!';
    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-text">{ feedbackText }</p>
        <Button
          datatestid="btn-play-again"
          name="playAgain"
          value={ name }
          onClick={ this.playAgain }
        >
          Play Again
        </Button>
        <Button
          datatestid="btn-ranking"
          name="rankingBtn"
          value={ name }
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
