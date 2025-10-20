import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pingResponse, setPingResponse] = useState('');
  const backendPort = process.env.REACT_APP_BACKEND_PORT || 5001;
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => {
        setToast({ message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handlePingClick = () => {
    fetch(`http://localhost:${backendPort}/ping`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPingResponse(data.message);
        setToast({ message: 'Successfully pinged the backend!', type: 'success' });
      })
      .catch(error => {
        console.error('Error:', error);
        setToast({ message: 'Failed to ping the backend.', type: 'error' });
      });
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
      {toast.message && (
        <div className="toast toast-end">
          <div className={`alert alert-${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
