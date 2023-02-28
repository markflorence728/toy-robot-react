import React, { useState, useRef, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

function App() {
  const [output, setOutput] = useState("");
  const [botId, setBotId] = useState(null);
  const inputRef = useRef(null);
  
  useEffect(() => {
    setBotId(nanoid());
  }, [])
  

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const res = await fetch('http://localhost:4000/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: botId, input: event.target.input.value })
    });

    const data = await res.json();
    if (data?.output) {
      setOutput(data?.output);
    }

    inputRef.current.value = "";
  }, [botId]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input name="input" ref={inputRef} />
        <button type="submit">Submit</button>
      </form>
      <div className="output">
        {output}
      </div>
    </div>
  );
}

export default App;
