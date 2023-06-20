import React, {useEffect, useState} from 'react'
import { useStateContext } from '../context'

import Barcode from 'react-barcode';

const YourTicket = () => {
    const {setActivePage, connect, ticketNumber, address, nftAsset, getTickets} = useStateContext();
    useEffect(() => {
        setActivePage("yourtickets");
    }, [])
    const [ticket, setTicket] = useState([]);
    // useEffect(() => {
    //     const data: any = [];
    //     const getTicket = async () => {
    //         data = await getTickets();
    //     }
    //     setTicket(() => data);
    // }, [connect, address])


    const [value, setValue] = useState('');

    useEffect(() => {
        const data = String(Math.random())
        const price = ticketNumber === 0 ? 1 + `${data.slice(1, 7)}` : 3 + `${data.slice(1, 7)}`;

        const val = `${address ? address.slice(1, 5) : "0x00000"}${price}${address ? address.slice(5, 10) : "00000"}${price}`
        setValue(() => val);
    }, [address, ticketNumber])
    let img;
    const getImageURL = () => {

        img = Math.round(Math.random() * 10) % 4;
        console.log(img);
        if (nftAsset.images.length > 0)
            return nftAsset.images[img].imgUrl;
        else
            return "abc"
    }
  return (
    
    <div className="tct-details">
    <div className="tct">
            <span className='page-title'>
                Your Ticket
            </span>
            <br />
            {/* <div style={{ margin: '15px 0', opacity: '0.5' }}>
                Ticket is getting generated on the basis of your selection. You'll be able to use this ticket post payment.
            </div> */}

            <div className="ticket" style={{ padding: '10px' }}>
                <img src={getImageURL()} style={{ margin: '5px 0 15px 0', borderRadius: '10px' }} className="tct-img" />
                <div className='page-title'>
                    New Zealand vs Australia | World T20
                </div>
                <div className='primary'>
                    Dubai International Stadium
                </div>
                <div style={{ opacity: '0.3' }}>
                    Witness two rivals facing each other on 14th Nov. 2021
                </div>
                <div className="wrapper">
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500 }}>Address</div>
                        <div className="box-details">
                            {address ? address.slice(0, 3) + "..." + address.slice(-5,) : "0x0"}
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500 }}>Price</div>
                        <div className="box-details">
                            {ticketNumber === 0 ? "1.0" : "3.0"} FTM
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", margin: '-30px 0 0 0' }}>
                    <Barcode value={value} />
                </div>
            </div>

        </div>
        </div>
  )
}

export default YourTicket