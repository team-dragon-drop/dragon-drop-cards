import React, {Component} from 'react'
import Board from './components/Board'
import Home from './components/Home'
import {Route} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <main>
        <Route path="/" exact={true} render={() => <Home />} />

        <Route
          path="/b/:boardId"
          render={({match}) => <Board boardId={match.params.boardId} />}
        />

        <Route
          path="/"
          render={({location}) => {
            console.log('can haz ga?', typeof window.ga === 'function')
            if (typeof window.ga === 'function') {
              window.ga('set', 'page', location.pathname + location.search)
              window.ga('send', 'pageview')
              console.log(
                'Supposedly sent a pageview',
                location.pathname + location.search,
              )
            }
            return null
          }}
        />
      </main>
    )
  }
}
