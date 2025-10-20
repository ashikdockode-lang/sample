import React, { useState } from "react";
import "./App.css";

function App() {
  const [pingResponse, setPingResponse] = useState("");
  const backendPort = process.env.REACT_APP_BACKEND_PORT || 5001;

  const handlePingClick = () => {
    fetch(`http://localhost:${backendPort}/ping`)
      .then((response) => response.json())
      .then((data) => setPingResponse(data.message))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="App">
      <div className="card w-96 bg-base-100 card-xs shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Ping Reponse</h2>
          <p>{pingResponse ? pingResponse : "No response yet"}</p>
          <div className="justify-end card-actions">
            <button
              onClick={handlePingClick}
              className="btn btn-dash btn-success"
            >
              Ping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
