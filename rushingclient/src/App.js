import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import RushingPlayersList from './RushingPlayersList'
import RushingPlayersCreateUpdate from './RushingPlayersCreateUpdate'

import './App.css';

const BaseLayout = () => (
  <div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Rushing</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link" href="/">Players</a>
          <a className="nav-item nav-link"
            href="/rushingplayers">Add Players</a>

        </div>
      </div>
    </nav>

    <div className="content">
      <Route path="/" exact component={RushingPlayersList} />
      <Route path="/rushingplayers/" exact component={RushingPlayersCreateUpdate} />
      <Route path="/rushingplayers/:id" component={RushingPlayersCreateUpdate} />

    </div>

  </div>
)


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout />
      </BrowserRouter>
    );
  }
}

export default App;