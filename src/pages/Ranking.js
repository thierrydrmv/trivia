import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { rankingToHomeAction } from '../redux/actions';

class Ranking extends React.Component {
  state = {
    playersList: [],
  };

  componentDidMount() {
    this.fetchPlayers();
  }

  fetchPlayers = () => {
    const { state: { name, gravatarAvatar, score } } = this.props;
    const obj = [{
      name, gravatarAvatar, score,
    }];
    const list = JSON.parse(localStorage.getItem('players'));
    console.log(list);
    if (list) {
      console.log('condicao');
      return this.setState({
        playersList: [...list, ...obj],
      }, () => {
        const { playersList } = this.state;
        localStorage.setItem('players', JSON.stringify(playersList));
        this.sortPlayersList();
      });
    }
    console.log('setItem final');
    localStorage.setItem('players', JSON.stringify(obj));
    this.setState({
      playersList: obj,
    });
  };

  sortPlayersList = () => {
    const { playersList } = this.state;
    playersList.sort((a, b) => b.score - a.score);
    this.setState({
      playersList,
    });
  };

  handleClick = () => {
    const { history, homeDispatch } = this.props;
    homeDispatch();
    history.push('/');
  };

  render() {
    const { playersList } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {playersList.map((e, i) => (
          <div key={ `player-name-${i}` }>
            <p data-testid={ `player-name-${i}` }>{e.name}</p>
            <p data-testid={ `player-score-${i}` }>{e.score}</p>
            <img src={ e.gravatarAvatar } alt="avatar" />
          </div>
        ))}
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
  homeDispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarAvatar: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  state: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  homeDispatch: () => dispatch(rankingToHomeAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
