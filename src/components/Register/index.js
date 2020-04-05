import React, { Fragment, useState } from 'react';
import GameContext from '../../indexed-DB';

export default props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const addUser = async context => {
    try {
      if(context.users.find(u => u.username === username)) {
        return alert(`User exists! Please try a different username.`)
      }
      // NEVER SAVE PASSWORD IN PLAINTEXT IN A REAL APP. THIS IS FOR DEMO PURPOSES ONLY.
      let resp = await context.addItem({ email, password, username }, 'users')
      alert(`User ${username} created successfully! Please login`);
      window.location.href = 'login'
    } catch (error) {
      alert(`Sorry couldn't save user. Reason: ${error.message}`)
    }
  }
  return (
    <GameContext.Consumer>
      {context => {
        return (
          <div className="form">
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></input>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
            {/* <button disabled={username.length < 3 || password.length < 8} onClick={_ => context.api.register({ email, password, username })}>Submit</button> */}
            <button disabled={username.length < 3 || password.length < 8} onClick={_ => addUser(context)}>Submit</button>
          </div>
        );
      }}
    </GameContext.Consumer>
  );
};
