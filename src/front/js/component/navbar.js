import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css"; // Asegúrate de tener este archivo CSS

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [logueado, setLogueado] = useState(localStorage.getItem('token')); 
    const [usuarioImage, setUsuarioImage] = useState(localStorage.getItem('usuarioImage')); 

    useEffect(() => {
        // Actualiza el estado cuando cambie el token o la imagen del usuario
        setLogueado(localStorage.getItem('token'));
        setUsuarioImage(localStorage.getItem('usuarioImage'));
    }, [localStorage.getItem('token'), localStorage.getItem('usuarioImage')]); 

    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout(); 
        localStorage.removeItem('token'); 
        localStorage.removeItem('usuarioImage'); 
        setLogueado(null); 
        navigate("/"); 
    };

    return (
        <nav className="navbar mb-0" id="navbar1">
            <div className="text-overlay-navbar" id="title">
                <h3>Authentication System</h3></div>
            {logueado ? ( 
                <div className="navbar-buttons"id="button3">

                    <button onClick={handleLogout} className="btn btn-secondary" id="button3">
                        Cerrar sesión
                    </button>
                </div>
            ) : ( 
                <div className="navbar-buttons">
                    <Link to="/login" className="btn btn-secondary" id="button3">
                        Iniciar sesión
                    </Link>
                    <Link to="/signUp" className="btn btn-secondary" id="button3">
                        Registrarse
                    </Link>
                </div>
            )}
        </nav>
    );
};