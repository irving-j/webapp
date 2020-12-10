import './App.css';
import React, { useState } from 'react'
import DepartureBoard from './DepartureBoard'

function App() {
  const [station, setStation] = useState('North Station')
  return (
    <div className="App">
        <DepartureBoard/>
    </div>
  );
}

export default App;
