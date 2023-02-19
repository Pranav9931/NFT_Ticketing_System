import React from 'react';
import './App.css';
import { NavbarComponent, TicketComponent } from './components';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <div className='ticket-sale-detail'>Book your tickets and get 50%* flat discount now</div>

      <TicketComponent />
    </div>
  );
}

export default App;
