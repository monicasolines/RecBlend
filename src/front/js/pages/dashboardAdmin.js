import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { LeftMenuAdmin } from "../component/leftMenuAdmin";
import ChatComponent from "../component/chatComponent";

export const DashboardAdmin = () => {
    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col mt-5">
                    <LeftMenuAdmin />
                    <ChatComponent
                        userRole="Admin"
                        userName="Admin Nombre"
                        userAvatar={null}
                    />
                </div>
            </div>
        </div>
    );
};
