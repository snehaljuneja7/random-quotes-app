import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const colorList = [
  '336699',
  '2f4858',
  'e3170a',
  '6d326d',
  'ffba49',
  'ef5b5b',
  '221e22',
  '31263e',
  'eb5160',
  'ff5733',
  'ff8d33',
  'afff33',
  '33ff3f',
  '33ffe9',
  '3393ff',
  '5833ff',
  'b833ff',
  'ff33be',
  'ff335b',
  'd09c8f', 
  'b56c3f',
  '033f5b',
  '5d5c46',
  '71249b'
];

const url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const QuoteBox = (props) => {
  const quote = props.quote;
  return(
    <div className="quote-box">
      <div className="quote-text">{quote.quote}</div>
      <div className="quote-author">{quote.author}</div>
      <div className="box-control">
        <a className="box-control-btn" rel="noreferrer" href={`https://twitter.com/intent/tweet?text=${props.quote.quote} - ${props.quote.author}`} target="_blank">Tweet</a>
        <button className="box-control-btn" onClick={props.handleClick} >New Quote</button>
      </div>
    </div>
  );
}

const QuoteGenerator = () => {
  const [quoteArray, setQuoteArray] = useState([]);
  const [quote, setQuote] = useState({});
  const [color, setColor] = useState('ff335b');

  useEffect(() => {
    if(quoteArray.length === 0) {
      fetch(url).then(res => res.json()).then(res => setQuoteArray(res.quotes));
    }
    else{
      handleClick();
    }
  }, [quoteArray]);

  const generateRandomId = (num) => {
    return Math.floor(Math.random()*num);
  };

  const handleClick = () => {
    let randomQuoteId = generateRandomId(quoteArray.length);
    let randomColorId = generateRandomId(colorList.length);
    while(quoteArray[randomQuoteId].quote === quote.quote)
    {
      randomQuoteId = generateRandomId(quoteArray.length);
    }
    setQuote(quoteArray[randomQuoteId]);
    while(colorList[randomColorId] === color){
      randomColorId = generateRandomId(colorList.length);
    }
    setColor(colorList[randomColorId]);
  };

  return(
    <div className="page" style={{"--background" : `#${color}` }} >
      <QuoteBox quote={quote} handleClick={() => handleClick()} />
    </div>
  );

}

ReactDOM.render(<QuoteGenerator />, document.getElementById('root'));
