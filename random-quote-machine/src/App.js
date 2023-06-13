import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function NewQuoteButton({ handleClick }) {
  return (
    <>
      <button onClick={handleClick}>New Quote</button>
    </>
  );
}

function Quote({ quote }) {
  return (
    <>
      <div className="quote-text">
        <em>{quote.content}</em>
      </div>
      <div className="quote-author">
        <em>{quote.author}</em>
      </div>
    </>
  );
}

function QuoteBox() {
  const [quote, setQuote] = useState({});

  const update = () => {
    axios
      .get("https://api.quotable.io/quotes/random")
      .then((data) => {
        console.log(data.data[0]);
        setQuote(data.data[0]);
      })
      .catch((error) => {
        console.log(error);
        setQuote({ content: "Error with API!", author: "Contact David :)" });
      });
  };

  useEffect(update, []);

  return (
    <div
      className="quote-box"
      style={{ border: "4px solid black", height: "40vh" }}
    >
      <Quote quote={quote} />
      <NewQuoteButton handleClick={update} />
    </div>
  );
}

function App() {
  return (
    <>
      <QuoteBox />
    </>
  );
}

export default App;

// HIERARCY
// Quote Box
//  - Quote
//  - quote author
//  - new quote button
