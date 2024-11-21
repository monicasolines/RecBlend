import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ProtectedRoute = ({ children, roles }) => {
    const { store } = useContext(Context);

    const userRole = store.role?.toLowerCase(); // Normaliza a minúsculas

    console.log("Rol del usuario:", userRole);
    console.log("Roles permitidos:", roles);

    if (!roles.includes(userRole)) {
        return <Navigate to="/unauthorized" />; // Redirige si no tiene permisos
    }

    return children; // Renderiza el contenido si está autorizado
};

export default ProtectedRoute;

