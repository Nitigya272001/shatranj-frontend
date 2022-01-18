import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Onboard from './onboard/onboard'
import Navbar from './onboard/Navbar'
import ChessGame from './online/chessgame'
import Footer from './onboard/Footer';
import HomePage from './homepage/HomePage'
import GameComputer from './with-computer/GameComputer';


function App() {
  return (
    <>
      <Navbar />
        <Router>
          <Switch>
            <Route path = "/" exact>
              <HomePage />
            </Route>
            <Route path = "/computer" exact>
              <GameComputer />
            </Route>
            <Route path = "/online" exact>
              <Onboard/>
            </Route>
            <Route path = "/game/:gameid" exact>
              <ChessGame/>
            </Route>
            <Redirect to = "/" />
          </Switch>
        </Router>
      <Footer />
    </>
    )
}

export default App;
