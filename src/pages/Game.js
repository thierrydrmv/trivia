import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Button from '../components/Button';
import { scoreAction } from '../redux/actions';

class Game extends Component {
  state = {
    results: [],
    questions: [],
    index: 0,
    triggerButton: false,
    timer: 10,
    disabled: false,
  };

  componentDidMount() {
    this.fetchToken();
  }

  fetchToken = () => {
    const token = localStorage.getItem('token');
    this.fetchResults(token);
  };

  fetchResults = async (token) => {
    const minimumNumber = 10;
    if (token === null || token.length < minimumNumber) {
      localStorage.removeItem('token');
      const { history } = this.props;
      return history.push('/');
    }
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(endpoint);
    const response = await request.json();
    const { results } = response;
    if (results.length === 0 || !results) {
      localStorage.removeItem('token');
      const { history } = this.props;
      return history.push('/');
    }
    return this.setState(
      {
        results,
      },
      () => this.fetchQuestions(),
    );
  };

  nextQuestion = () => {
    const lastQuestion = 4;
    const { index } = this.state;
    if (index === lastQuestion) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState(
      (prevState) => ({
        index: prevState.index + 1,
      }),
      () => this.fetchQuestions(),
    );
  };

  fetchQuestions = () => {
    const { results, index } = this.state;
    const half = 0.5;
    const arrOfAnswers = [
      results[index].correct_answer,
      ...results[index].incorrect_answers,
    ];
    const obj = arrOfAnswers
      .map((item, i) => ({
        answer: item,
        type: i === 0 ? 'correct' : 'incorrect',
        indexOfObj: i - 1,
        difficulty: results[index].difficulty,
      }))
      .sort(() => Math.random() - half);

    this.setState(
      {
        questions: obj,
        timer: 10,
        triggerButton: false,
        disabled: false,
      },
      () => this.handleTimer(),
    );
  };

  handleClick = ({ target }) => {
    const { name } = target;
    const { dispatchScore } = this.props;
    const { questions, timer } = this.state;
    if (name === 'correct') {
      const minimumPoints = 10;
      let difficultyAvaliation = 0;
      if (questions[0].difficulty === 'hard') {
        const hardN = 3;
        difficultyAvaliation = hardN;
      }
      if (questions[0].difficulty === 'medium') {
        const mediumN = 2;
        difficultyAvaliation = mediumN;
      }
      if (questions[0].difficulty === 'easy') {
        const easyN = 1;
        difficultyAvaliation = easyN;
      }
      const totalScore = minimumPoints + (timer * difficultyAvaliation);

      const obj = {
        score: totalScore,
        assertions: 1,
      };

      dispatchScore(obj);
    }
    clearInterval(this.timerForGame);
    this.setState({
      triggerButton: true,
      disabled: true,
    });
  };

  handleTimer = () => {
    const timerSec = 1000;
    this.timerForGame = setInterval(() => {
      this.setState(
        (prevState) => ({
          timer: prevState.timer - 1,
        }),
        () => {
          const { timer } = this.state;
          if (timer === 0) {
            clearInterval(this.timerForGame);
            this.setState({
              disabled: true,
              triggerButton: true,
            });
          }
        },
      );
    }, timerSec);
  };

  render() {
    const { results, index, questions, triggerButton, timer, disabled } = this.state;
    const lastQuestion = 4;
    return (
      <div>
        <Header />
        {results.length > 0 && index <= lastQuestion && (
          <div>
            <p data-testid="timer">{timer}</p>
            <p data-testid="question-category">{results[index].category}</p>
            <p data-testid="question-text">{results[index].question}</p>
            <div data-testid="answer-options">
              {questions.map((e) => (
                <Button
                  key={ e.indexOfObj }
                  datatestid={
                    e.type === 'correct'
                      ? 'correct-answer'
                      : `wrong-answer-${e.indexOfObj}`
                  }
                  name={ e.type }
                  className={ triggerButton && e.type }
                  onClick={ this.handleClick }
                  disabled={ disabled }
                >
                  {e.answer}
                </Button>
              ))}
            </div>
            {triggerButton && (
              <Button datatestid="btn-next" onClick={ this.nextQuestion }>
                Next
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  dispatchScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  playerInfo: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (state) => dispatch(scoreAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
