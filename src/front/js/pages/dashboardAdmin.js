import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { LeftMenuAdmin } from "../component/leftMenuAdmin";

export const DashboardAdmin = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <LeftMenuAdmin />
                </div>

                {/*<div className="col-9">
                    <div>
                        <h3>Selected menu item content</h3>
                    </div>
                </div>*/}

            </div>
        </div>
    );
};