import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { LeftMenuAdmin } from "../component/leftMenuAdmin";

export const DashboardAdmin = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col mt-5">
                    <LeftMenuAdmin />
                </div>
            </div>
        </div>
    );
};