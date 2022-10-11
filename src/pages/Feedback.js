import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Button from '../components/Button';
import star from '../assets/star.gif';
//

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
      <div className='vh-100'>
        <Header />
        <div className='d-flex justify-content-center align-items-baseline'>
          <p className='text-black display-1 text-center mt-4 text-shadow-feedback border-feedback'>
            Feedback
          </p>
          <img src={star} alt='star' width={90} />
        </div>
        <div className='container d-flex flex-column align-items-center py-5 border-start rounded w-50 text-center shadow-lg bg-game text-light text-shadow'>
          <p data-testid='feedback-total-score' className='display-2'>
            Points: {score}
          </p>
          <p data-testid='feedback-total-question' className='fs-2'>
            Total assertions: {assertions}
          </p>
          {assertions < minAssertions ? (
            <p data-testid='feedback-text' className='display-2 text-danger'>
              Could be better...
            </p>
          ) : (
            <p data-testid='feedback-text' className='display-2 text-success'>
              Well Done!
            </p>
          )}
          <div className='d-flex gap-5'>
            <Button
              datatestid='btn-play-again'
              name='playAgain'
              onClick={this.playAgain}
              className='btn btn-success'
            >
              Play Again
            </Button>
            <Button
              datatestid='btn-ranking'
              name='rankingBtn'
              onClick={this.ranking}
              className='btn btn-dark'
            >
              Ranking
            </Button>
          </div>
        </div>
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
