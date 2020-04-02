import React, { Fragment, useState } from 'react';
import classes from './style.css';

export default () => {
  const [inputText, setInputText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  // eslint-disable-next-line
  const [wordIndex, setwordIndex] = useState(0);
  // eslint-disable-next-line
  const [startTime, setStartTime] = useState(Date.now());
  // eslint-disable-next-line
  const [wpm, setWpm] = useState(0);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [mistakes, setMistakes] = useState(0);
  const [completed, setCompleted] = useState([]);
  // eslint-disable-next-line
  let [
    originalText,
    // eslint-disable-next-line
    setOriginalText,
  ] = useState(`Lorem Ipsum is simply dummy text of the printing.`.split(' '));
  const keyPress = value => {
    // eslint-disable-next-line
    let arrValue = value.split(' ');
    let lastWord = arrValue[arrValue.length - 1];
    let prevWord = arrValue[arrValue.length - 2];
    setInputText(lastWord);
    if (value[value.length - 1] === ' ') {
      console.log(value, originalText[wordIndex], value.trim() === originalText[wordIndex].trim());
      if (value.trim() === originalText[wordIndex].trim()) {
        // setInputText('')
        setError(false);
        setCompleted(completed.concat(value));
        setOriginalText(originalText.slice(1, originalText.length));
        if(!isComplete){
          let timeDiff = (Date.now() - startTime) / (1000 * 60);
          setWpm(Math.round(completed.length / timeDiff));
        }
        if (originalText.length === 1) {
          setIsComplete(true)
        }
        // setwordIndex(wordIndex + 1)
      } else {
        console.log(true);
        setInputText(prevWord);
        setError(true);
        setMistakes(mistakes + 1);
      }
    }
    // if(!startTime){
    //   setStartTime(Date.now());
    // } else {
    //   let timeDiff = (Date.now() - startTime) / (1000 * 60);
    //   setWpm(Math.round(arrValue.length/timeDiff))
    // }
    // let arrText = originalText.split(' ');
    // let flag = false;
    // arrValue.map((v, i) => {
    //   if (i === arrValue.length - 1) {
    //     return;
    //   }
    //   if (v !== arrText[i]) {
    //     flag = true;
    //   }
    // });

    // if (flag) {
    //   setMistakes(mistakes + 1);
    // }
    // setError(flag);
  };
  return (
    <Fragment>
      <div>
        <div className="completed" dangerouslySetInnerHTML={{ __html: completed.join(' ') }}></div>&nbsp;
        <div className="originalText" dangerouslySetInnerHTML={{ __html: originalText.join(' ') }}></div>
        <div>
          <textarea
            rows="4"
            type="text"
            value={inputText}
            placeholder="Enter the text here..."
            onChange={e => keyPress(e.target.value)}
          ></textarea>
        </div>
      </div>
      {error && <div>Mismatch</div>}
      Mistakes: {mistakes} <br />
      WPM: {wpm}
    </Fragment>
  );
};
