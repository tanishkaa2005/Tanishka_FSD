import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => setInput((prev) => prev + value);
  const handleClear = () => { setInput(""); setResult(""); };

  const handleCalculate = () => {
    try {
      const calculateResult = new Function('return ' + input)();
      setResult(calculateResult.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <div className="display">
          <div className="input-text">{input || "0"}</div>
          <div className="result-text">{result || "0"}</div>
        </div>

        <div className="buttons-grid">
          <button onClick={handleClear} className="btn-clear">Clear</button>
          
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => btn === "=" ? handleCalculate() : handleClick(btn)}
              className={['/', '*', '-', '+', '='].includes(btn) ? 'btn-operator' : 'btn-number'}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;