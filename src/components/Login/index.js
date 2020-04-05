import React, { Fragment, useState } from 'react';
import GameContext from '../../indexed-DB';
import style from "./style.css";

export default props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <GameContext.Consumer>
      {context => {
        return (
          <div className="form">
              <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></input>
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
              {/* <button disabled={username.length < 3 || password.length < 8} onClick={_ => context.api.loginUser({ password, username })}>Submit</button> */}
              <button disabled={username.length < 3 || password.length < 8} onClick={_ => context.login(username, password)}>Submit</button>
          </div>
        );
      }}
    </GameContext.Consumer>
  );
};
