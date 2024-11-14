import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/components.css";
import { Context } from "../store/appContext";
import { LeftMenuTeacher } from "../component/leftMenuTeacher";

export const DashboardTeacher = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid mt-5">
            <div className="row" >
                <div className="col" >
                    <LeftMenuTeacher />
                </div>
            </div>
        </div>
    );
};