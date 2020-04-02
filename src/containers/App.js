import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Game from '../components/Game';
import DBContext, { createDB, addItem, getItems } from '../indexed-DB';

function App() {
  const [init, setInit] = useState(false);
  // eslint-disable-next-line
  const [scores, setScores] = useState([]);
  // eslint-disable-next-line
  // let addItemCustom;
  if (!init) {
    setInit(true);
    createDB()
      .then(async _ => {
        let resp = await getItems('scores');
        setScores(resp);
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DBContext.Provider value={{ scores, getItems, addItem: addItemCustom }}>
      <div className="App">
        <Game></Game>
      </div>
    </DBContext.Provider>
  );
}

export default App;
