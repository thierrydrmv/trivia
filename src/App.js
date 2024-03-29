import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="bg-neon">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/configuracoes" component={ Settings } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/ranking" component={ Ranking } />
        </Switch>
      </div>
    );
  }
}
