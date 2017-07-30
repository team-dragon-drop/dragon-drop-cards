import React, { Component } from 'react';
import Board from './components/Board';
import Home from './components/Home';
import { Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <main>
        <Route path="/" exact={true} render={() => (
          <Home />
        )} />
        <Route path="/b/:boardId" render={({ match }) => (
          <Board boardId={match.params.boardId} />
        )} />
      </main>
    );
  }
}
