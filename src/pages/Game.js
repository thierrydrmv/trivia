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
    timer: 30,
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
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(endpoint);
    const response = await request.json();
    const { results } = response;
    if (results.length === 0) {
      localStorage.removeItem('token');
      const { history } = this.props;
      return history.push('/');
    }
    return this.setState({
      results,
    });
  };

  fetchQuestions = () => {
    const { results, index, questions } = this.state;
    console.log(questions);
    if (questions.length === 0) {
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

      return this.setState({
        questions: obj,
      }, () => this.handleTimer());
    }
    return null;
  };

  handleClick = ({ target }) => {
    const { name } = target;
    const { playerInfo: { score }, dispatchScore } = this.props;
    const { questions, timer } = this.state;
    if (name === 'correct') {
      const minimumPoints = 10;
      let difficultyAvaliation = 0;
      const requestedTimer = 17;
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
      dispatchScore(totalScore);
    }
    this.setState({
      triggerButton: true,
    });
  };

  handleTimer = () => {
    const timerSec = 1000;
    const timerForGame = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => {
        const { timer } = this.state;
        if (timer === 0) {
          clearInterval(timerForGame);
          this.setState({
            disabled: true,
          });
        }
      });
    }, timerSec);
  };

  render() {
    const { results, index, questions, triggerButton, timer, disabled } = this.state;
    if (results.length > 0) {
      this.fetchQuestions();
    }
    return (
      <div>
        <Header />
        {results.length > 0 && (
          <div>
            <p>{ timer }</p>
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
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
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
