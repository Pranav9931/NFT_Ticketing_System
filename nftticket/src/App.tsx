import React from 'react';
import './App.css';
import { NavbarComponent, Ticket, TicketComponent } from './components';
import { Routes, Route } from "react-router-dom";
import SuccessTransaction from './pages/success.transaction';
function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <div className='ticket-sale-detail'>Book your tickets and get 50%* flat discount now</div>
      <div className="wrapper">
        <TicketComponent />
        <Ticket />
      </div>
      <Routes>
        <Route path="/success" element={<SuccessTransaction />} />
      </Routes>

    </div>
  );
}

export default App;
