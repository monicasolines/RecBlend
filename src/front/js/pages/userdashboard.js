import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { OverallHoldings } from "../component/overallHoldings";
import { Wallet } from "../component/Wallet";
import { Favorites } from "../component/Favorites";


export const Userdashboard = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(
        () => { actions.setShowOverallHoldings() }, []
    );

    return (
        <div id="dashboardWhole">
            <div id="togglePages">
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <a className="toggleButton nav-link active" data-bs-toggle="tab" aria-current="page" href="#" onClick={()=>{ actions.setShowOverallHoldings()}}>Overall Holdings</a>
                    </li>
                    <li className="nav-item">
                        <a className="toggleButton nav-link" data-bs-toggle="tab" href="#" onClick={()=>{ actions.setShowWallet()}}>Wallet</a>
                    </li>
                    <li className="nav-item">
                        <a className="toggleButton nav-link" data-bs-toggle="tab" href="#favorite" onClick={()=>{ actions.setShowFavorites()}}>Favorites</a>
                    </li>
                </ul>
            </div>
            <div id="dashboardContent">
                {store.showOverallHoldings ? <OverallHoldings/> :
                    store.showWallet ? <Wallet/> : 
                        store.showFavorites ? <Favorites/> : null }
            </div>
        </div>
    )

}