import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { Context } from "../store/appContext";
import { LeftMenuAdmin } from "../component/leftMenuAdmin";

const AdminPanel = () => {
    const { actions } = useContext(Context);

    if (!actions.isAuthorized("admin")) {
        return <div className="alert alert-danger">No tienes permisos para ver esto.</div>;
    }

    return (
        <div className="card mt-3">
            <div className="card-header">
                <h3>Panel de Administración</h3>
            </div>
            <div className="card-body">
                <p>Aquí puedes gestionar configuraciones específicas del administrador.</p>
                <div>
                    <h3>Panel de Administración</h3>
                    {/* Gestión de Usuarios */}
                    <div>
                        <h5>Gestión de Usuarios</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Datos simulados */}
                                <tr>
                                    <td>1</td>
                                    <td>Juan Pérez</td>
                                    <td>juan@mail.com</td>
                                    <td>Docente</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm">Editar</button>
                                        <button className="btn btn-danger btn-sm">Eliminar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Estadísticas */}
                    <div className="mt-4">
                        <h5>Estadísticas</h5>
                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <h6>Usuarios Registrados</h6>
                                        <p>150</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <h6>Clases Creadas</h6>
                                        <p>45</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const DashboardAdmin = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-3">
                    <LeftMenuAdmin />
                </div>
                <div className="col-9">
                    <h1>Dashboard del Administrador</h1>
                    <AdminPanel />
                </div>
            </div>
        </div>
    );
};
