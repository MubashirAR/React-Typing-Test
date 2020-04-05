import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
// import logo from './logo.svg';

import Game from '../components/Game';
import Login from '../components/Login';
import DBContext, { createDB, addItem, getItems } from '../indexed-DB';
import api from '../api';
import Register from '../components/Register';
import Scores from '../components/Scores';

function App() {
  const [init, setInit] = useState(false);
  // eslint-disable-next-line
  const [scores, setScores] = useState([]);
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line
  // let addItemCustom;
  if (!init) {
    setInit(true);
    createDB()
      .then(async _ => {
        let resp = await getItems('scores');
        let users = await getItems('users');
        setScores(resp);
        setUsers(users);
      })
      .catch(e => {
        console.log('error creating db');
        console.error(e);
      });
  }
  let addItemCustom = async (data, storeName) => {
    try {
      await addItem(data, storeName);
      let resp = await getItems(storeName);
      setScores(resp);
      let users = await getItems('users');
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };
  // let url = useLocation();
  // console.log({url})
  return (
    <DBContext.Provider value={{ scores, getItems, addItem: addItemCustom, api, users }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li className={window.location.href.split('/')[3] === '' && 'active-url'}>
                <Link to="/">Home</Link>
              </li>
              <li className={window.location.href.split('/')[3] === 'register' && 'active-url'}>
                <Link to="/register">Register</Link>
              </li>
              <li className={window.location.href.split('/')[3] === 'login' && 'active-url'}>
                <Link to="/login">Login</Link>
              </li>
              <li className={window.location.href.split('/')[3] === 'game' && 'active-url'}>
                <Link to="/game">Game</Link>
              </li>
              <li className={window.location.href.split('/')[3] === 'scores' && 'active-url'}>
                <Link to="/scores">Scores</Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* <div className="App">
        </div> */}
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/">
            <Game />
          </Route>
        </Switch>
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
        <Switch>
          <Route path="/scores">
            <Scores />
          </Route>
        </Switch>
      </Router>
    </DBContext.Provider>
  );
}

export default App;
