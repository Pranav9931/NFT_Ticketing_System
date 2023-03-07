import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SuccessTransaction = () => {
    const navigate = useNavigate();

    const [sec, setSec] = useState(5);
    useEffect(() => {
        setTimeout(() => {
            navigate(-1);
        }, 5000);
        setTimeout(() => {
            setSec(sec - 1);
        }, 1000)
    }, [sec])


    return (
        <div className="successTrans">
            <div className="success-card">
                <span className='page-title'>Your transaction was successful.</span>
                <span>You will be redirected to the home page in {sec} second(s).</span>
                <button className='btn-connect' onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </div>
    )
}

export default SuccessTransaction