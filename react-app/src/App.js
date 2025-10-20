import React, { useState } from 'react';
import './App.css';

function App() {
  const [pingResponse, setPingResponse] = useState('');
  const backendPort = process.env.REACT_APP_BACKEND_PORT || 5001;

  const handlePingClick = () => {
    fetch(`http://localhost:${backendPort}/ping`)
      .then(response => response.json())
      .then(data => setPingResponse(data.message))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handlePingClick}>Ping</button>
        {pingResponse && <div style={{ marginLeft: '10px' }}>{pingResponse}</div>}
      </header>
    </div>
  );
}

export default App;
