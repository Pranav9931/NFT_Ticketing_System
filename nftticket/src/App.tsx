import React, { useEffect } from 'react';
import './App.css';
import { NavbarComponent, Ticket, TicketComponent } from './components';
import { Routes, Route } from "react-router-dom";
import SuccessTransaction from './pages/success.transaction';
import YourTicket from './pages/yourTickets.component';
import { useStateContext } from './context';
function App() {
  const { setActivePage } = useStateContext();
  useEffect(() => {
    setActivePage("home");
  }, [])
  return (
    <div className="App">
      <NavbarComponent />
      <div className='ticket-sale-detail'>Book your tickets and get 50%* flat discount now.</div>
      
      <Routes>
        <Route path="/" element={
          <div className="wrapper">
            <TicketComponent />
            <Ticket />
          </div>
        }/>
        <Route path="/success" element={<SuccessTransaction />} />
        <Route path="/tickets" element={<YourTicket />} />
      </Routes>

    </div>
  );
}

export default App;
