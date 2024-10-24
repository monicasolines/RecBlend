import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import IniciarSesion from "./IniciarSesion";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="homePage">
            <div className="container">
                <h1 className="pt-4 text-white">Bienvenidos</h1>
                <hr />
            </div>
            <IniciarSesion />
        </div>
    );
};
