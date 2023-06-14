import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function NewQuoteButton({ handleClick, color }) {
  console.log(color);
  color === "#f2f2f2" ? (color = "#5A5A5A") : (color = color);
  return (
    <div className="text-center mt-auto">
      <button
        className="btn btn-primary btn-lg btn-block"
        onClick={handleClick}
        style={{ backgroundColor: color }}
      >
        New Quote
      </button>
    </div>
  );
}

function Quote({ quote }) {
  return (
    <>
      <div className="quote-text text-center m-2">❝ {quote.content} ❞</div>
      <div className="quote-author text-end mb-4">
        <em>~ {quote.author}</em>
      </div>
    </>
  );
}

function QuoteBox({ changeBackgroundColor, backgroundColor }) {
  const [quote, setQuote] = useState({});
  const updateQuote = () => {
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

  useEffect(updateQuote, []);

  return (
    <div
      className="quote-box d-flex border m-4 flex-column justify-content-between"
      style={{
        minHeight: "40vh",
        width: "600px",
      }}
    >
      <div className="container m-auto">
        <Quote quote={quote} color={backgroundColor} />
        <NewQuoteButton
          color={backgroundColor}
          handleClick={() => {
            updateQuote();
            changeBackgroundColor();
          }}
        />
      </div>
    </div>
  );
}

function App() {
  const [backgroundColor, setBackgroundColor] = useState("#f2f2f2");

  const changeBackgroundColor = () => {
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    const color = COLORS[colorIndex];
    setBackgroundColor(color);
  };

  return (
    <div
      className="page-container d-flex align-items-center justify-content-center"
      style={{ height: "100vh", backgroundColor: backgroundColor }}
    >
      <QuoteBox
        changeBackgroundColor={changeBackgroundColor}
        backgroundColor={backgroundColor}
      />
    </div>
  );
}

const COLORS = [
  "#ff7f50",
  "#c2b97f",
  "#2f2f2f",
  "#29ab87",
  "#114b5f",
  "#e0b0ff",
  "#5d2f27",
];

export default App;

// HIERARCY
// Quote Box
//  - Quote
//  - quote author
//  - new quote button
