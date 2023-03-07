import React from 'react'
import "./ticket.component.css";

import { useStateContext } from '../context';

const TicketComponent = () => {

    const {
        address,
        contract,
        connect,
        nftAsset,
        setNftAsset,
        ticketNumber,
        setTicketNumber
    } = useStateContext();

    return (
        <div className="ticket-container">
            <div>
                <span className='page-title'>
                    Select Tickets
                </span>
                <br />
                <div style={{ margin: '15px 0', color: '#0090ff' }}>
                    Select your preferred ticket and enjoy the concert.
                </div>
                <div className="ticketsWrapper">
                    <div className={`${ticketNumber === 0 ? "ticket border-round" : "ticket"}`}>
                        <div>
                            <span className="ticket-type-title">Standard</span>
                            <div className="price-details">
                                <span className='price-stroke'>
                                    1.0 FTM
                                </span>
                                &nbsp;/ <span style={{ fontWeight: 500 }}>Ticket</span>
                            </div>
                            <div style={{ fontWeight: 500, fontSize: '15px', margin: '10px 0' }}>Description</div>
                            <div className='ticket-desc'>
                                This ticket provides general admission to the concert and allows you to see the artist(s) live with access to concessions and merchandise.
                            </div>


                            <div style={{ fontWeight: 500, fontSize: '15px', margin: '10px 0' }}>Benefits</div>
                            <div className="list-items">
                                <li>Admission to the concert</li>
                                <li>General access to the venue</li>
                                <li>Standing room or assigned seating based on ticket type</li>
                                <li>Access to available concessions and merchandise</li>
                                <li>Opportunity to see the artist(s).</li>
                            </div>
                        </div>
                        <div>
                            <button className='btn-connect' style={{ margin: '15px 0', width: '100%' }} onClick={() => setTicketNumber(0)}>Select Ticket</button>
                        </div>
                    </div>
                    <div className={`${ticketNumber === 1 ? "ticket border-round" : "ticket"}`}>
                        <div>
                            <span className="ticket-type-title">Premium</span>
                            <div className="price-details">
                                <span className='price-stroke'>
                                    3.0 FTM
                                </span>
                                &nbsp;/ <span style={{ fontWeight: 500 }}>Ticket</span>
                            </div>
                            <div style={{ fontWeight: 500, fontSize: '15px', margin: '10px 0' }}>Description</div>
                            <div className='ticket-desc'>
                                This ticket provides exclusive access to premium seating, a VIP lounge area, a meet and greet with the artist(s), and additional perks such as complimentary food and beverages.
                            </div>
                            <div style={{ fontWeight: 500, fontSize: '15px', margin: '10px 0' }}>Benefits</div>
                            <div className="list-items">
                                <li>Priority admission to the concert</li>
                                <li>Exclusive access to a VIP lounge area</li>
                                <li>Meet and greet with the artist(s).</li>
                                <li>Access to limited edition merchandise</li>
                                <li>Early access to venue before regular ticket holders</li>
                            </div>
                        </div>
                        <div>
                            <button className='btn-connect' style={{ margin: '15px 0', width: '100%' }} onClick={() => setTicketNumber(1)}>Select Ticket</button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default TicketComponent