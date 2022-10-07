import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';

class Game extends Component {
  state = {
    results: [],
    questions: [],
    index: 0,
    triggerButton: false,
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
        }))
        .sort(() => Math.random() - half);

      return this.setState({
        questions: obj,
      });
    }
    return null;
  };

  handleClick = () => {
    this.setState({
      triggerButton: true,
    });
  };

  render() {
    const { results, index, questions, triggerButton } = this.state;
    if (results.length > 0) {
      this.fetchQuestions();
    }
    return (
      <div>
        <Header />
        {results.length > 0 && (
          <div>
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
                  className={ triggerButton && e.type }
                  onClick={ this.handleClick }
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

export default Game;
