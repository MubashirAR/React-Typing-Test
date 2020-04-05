import React, { Fragment, useState } from 'react';
import GameContext from '../../indexed-DB';
import style from "./style.css";

export default props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    // <GameContext.Consumer>
    //   {context => {
    //     return (
    //       <Fragment>
    //         {/* <form> */}
    //           <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></input>
    //           <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
    //           <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
    //           <button onClick={_ => context.api.register({ email, password, username })}>Submit</button>
    //         {/* </form> */}
    //       </Fragment>
    //     );
    //   }}
    // </GameContext.Consumer>
    <GameContext.Consumer>
      {context => {
        return (
          <div className="form">
              <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></input>
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
              <button disabled={username.length < 3 || password.length < 8} onClick={_ => context.api.loginUser({ password, username })}>Submit</button>
          </div>
        );
      }}
    </GameContext.Consumer>
  );
};
