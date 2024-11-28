import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/components.css";
import { Context } from "../store/appContext";
import { LeftMenuTeacher } from "../component/leftMenuTeacher";
import ChatComponent from "../component/chatComponent";

export const DashboardTeacher = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid mt-5">
            <div className="row" >
                <div className="col mt-5" >
                    <LeftMenuTeacher />
                    {/* <ChatComponent
                        userRole="Docente"
                        userName="Docente Nombre"
                        userAvatar={null}
                    /> */}
                </div>
            </div>
        </div>
    );
};