import './App.css';
import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
// import logo from './logo.svg';

import Game from '../components/Game';
import Login from '../components/Login';
import DBContext, { createDB, addItem, getItems } from '../indexed-DB';
import api from '../api';
import Register from '../components/Register';
import Scores from '../components/Scores';

function App(props) {
  const [init, setInit] = useState(false);
  const [scores, setScores] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  if (!init) {
    setInit(true);
    createDB()
      .then(async _ => {
        let resp = await getItems('scores');
        let users = await getItems('users');
        setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser') || '{}'));
        setScores(resp);
        setUsers(users);
      })
      .catch(e => {
        console.log('error creating db');
        console.error(e);
      });
  }
  const addItemCustom = async (data, storeName) => {
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
  const login = (username, password) => {
    let user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      alert(`Invalid credentials! Please try again.`);
    } else {
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      setLoggedInUser(user);
      window.location.href = 'game';
    }
  };
  return (
    <DBContext.Provider value={{ scores, getItems, addItem: addItemCustom, api, users, login, loggedInUser }}>
      <Router>
        <div>
          <nav>
            <ul>
              {loggedInUser.username && <li> Welcome {loggedInUser.username}</li>}
              <li className={window.location.href.split('/')[3] === '' ? 'active-url' : ''}>
                <Link to="/">Home</Link>
              </li>
              {!loggedInUser.username && (
                <Fragment>
                  <li className={window.location.href.split('/')[3] === 'register' ? 'active-url' : ''}>
                    <Link to="/register">Register</Link>
                  </li>
                  <li className={window.location.href.split('/')[3] === 'login' ? 'active-url' : ''}>
                    <Link to="/login">Login</Link>
                  </li>
                </Fragment>
              )}
              <li className={window.location.href.split('/')[3] === 'game' ? 'active-url' : ''}>
                <Link to="/game">Game</Link>
              </li>
              <li className={window.location.href.split('/')[3] === 'scores' ? 'active-url' : ''}>
                <Link to="/scores">Scores</Link>
              </li>
            </ul>
          </nav>
        </div>
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
