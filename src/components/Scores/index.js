import React from 'react';
import GameContext from '../../indexed-DB';
import style from './style.css';

export default () => (
  <GameContext.Consumer>
    {context => (
      <div className="scores">
        <h3>Scores</h3>
        <div>
          <div>
            <table>
              {context.scores.map(s => (
                <tr>
                  <td>WPM: {s.wpm}</td>
                  <td>Mistakes: {s.mistakes}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    )}
  </GameContext.Consumer>
);
