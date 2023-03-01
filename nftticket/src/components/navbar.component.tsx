import React from 'react'
import { FileCoinLogo, NIUMLogo, userAvatar } from '../assets'
import { useStateContext } from '../context'
import "./navbar.component.css"

const NavbarComponent = () => {

    const { address, contract, connect } = useStateContext();

    const ProfileArea = () => {
        return (
            (!address) ?
                <button className="btn-connect" onClick={() => connect()}>Connect</button>
                :
                <div className="profile-section">
                    <img src={userAvatar} />
                    <div className="profile-desc">
                        <span style={{ fontWeight: 700 }}>ADDRESS</span>
                        {`${address.slice(0, 3)}...${address.slice(-3,)}`}
                    </div>
                </div>
        )
    }
    return (
        <div className="navbar-container">
            <div className="logo">
                <img src={NIUMLogo} />
                <span className="nav-title">NFT TICKETS</span>
            </div>
            <div className="walletArea">
                {ProfileArea()}
            </div>
        </div>
    )
}

export default NavbarComponent