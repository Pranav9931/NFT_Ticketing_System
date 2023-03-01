import React, { useEffect, useState } from 'react'
import "./tct.component.css";

import { useNavigate } from 'react-router-dom';

import Barcode from 'react-barcode';

import { useStateContext } from '../context';

const Ticket = () => {

    const {
        address,
        contract,
        connect,
        nftAsset,
        setNftAsset,
        ticketNumber,
        setTicketNumber,
        addTicket
    } = useStateContext();

    // const [form, setForm] = useState([])

    const navigate = useNavigate();

    const handlePayment = async () => {
        const _type = ticketNumber === 0 ? "STANDARD" : "PREMIUM";
        const _amount = ticketNumber === 0 ? "1" : "3";
        const _imgUrl = nftAsset.images[img].imgUrl;
        if (address) {
            const data = await addTicket(_amount, _type, _imgUrl);
            console.log("Transaction Successful", data);
            navigate("../success");
        } else {
            alert("Connect your wallet first")
        }
    }

    useEffect(() => {


    }, [ticketNumber, address])

    const [value, setValue] = useState('');

    useEffect(() => {
        const price = ticketNumber === 0 ? 0.3 : 0.8;

        const val = `${address ? address.slice(1, 5) : "0x00000"}${price}${address ? address.slice(5, 10) : "00000"}${price}`
        setValue(() => val);
    }, [address, ticketNumber])

    let img = 0;

    const getImageURL = () => {

        img = Math.round(Math.random() * 10) % 4;
        console.log(img);
        if (nftAsset.images.length > 0)
            return nftAsset.images[img].imgUrl;
        else
            return "abc"
    }

    return (
        <div className="tct">
            <span className='page-title'>
                Your Ticket
            </span>
            <br />
            {/* <div style={{ margin: '15px 0', opacity: '0.5' }}>
                Ticket is getting generated on the basis of your selection. You'll be able to use this ticket post payment.
            </div> */}

            <div className="ticket" style={{ padding: '10px' }}>
                <img src={getImageURL()} style={{ margin: '10px 0', borderRadius: '10px' }} className="tct-img" />
                <div className='page-title'>
                    India Vs Pakistan
                </div>
                <div style={{ margin: '15px 0', opacity: '0.3' }}>
                    The biggest rivals are again on the battle field.
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
                            {ticketNumber === 0 ? "1.0" : "3.0"} BIT
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", margin: '-10px 0 0 0' }}>
                    <Barcode value={value} />
                </div>
                <div>
                    <button className='btn-connect' style={{ margin: '15px 0', width: '100%' }} onClick={() => handlePayment()}>Book Ticket</button>
                </div>
            </div>

        </div>
    )
}

export default Ticket