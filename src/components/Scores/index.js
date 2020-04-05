import React from 'react';
import GameContext from '../../indexed-DB';
import style from './style.css';

const dateFormat = timestamp => {
  let dateObj = new Date(timestamp);
  return (
    dateObj.getDate() +
    '/' +
    (dateObj.getMonth() + 1) +
    '/' +
    dateObj.getFullYear() +
    ' ' +
    dateObj.getHours() +
    ':' +
    dateObj.getMinutes()
  );
};
export default () => (
  <GameContext.Consumer>
    {context => (
      <div className="scores">
        <h3>Scores</h3>
        <div>
          <div>
            <table>
              <tbody>
                {context.scores.map(s => (
                  <tr key={s.id}>
                    <td>Username: {s.username}</td>
                    <td>Game Ended At: {dateFormat(s.timestamp)}</td>
                    <td>WPM: {s.wpm}</td>
                    <td>Mistakes: {s.mistakes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}
  </GameContext.Consumer>
);
