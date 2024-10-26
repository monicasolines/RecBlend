import React from "react";
import { Login } from "../pages/roles/login"
import { Link } from "react-router-dom";

const IniciarSesion = () => {
    return (
        <div className="container">
            <div className="row mt-2">
                <div className="col"></div>
                <div className="col bg-light bg-opacity-75 mb-4 mt-3">
                    <Login />
                    <p className="text-center">¿Aún no tienes cuenta?  <Link to={"/Registro"}> Registrate</Link></p>
                </div>
            </div>
        </div>
    )
}

export default IniciarSesion