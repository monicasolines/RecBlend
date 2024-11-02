import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Footer } from "./footer";

const EstudiantesForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted");
    };

    return (
        <div className="container ms-3">
            <h4>Registrar estudiante nuevo</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellido:</label>
                    <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha de nacimiento:</label>
                    <br></br>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy/MM/dd" // This line will format the display  
                        className="form-control"
                        required
                    />


                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    );
}

//nombre
//apellido
//Email
//foto
//Descripción
//generar contraseña
const ProfesoresForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted");
    };

    return (
        <div className="container ms-3">
            <h4>Registrar estudiante nuevo</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellido:</label>
                    <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha de nacimiento:</label>
                    <br></br>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy/MM/dd" // This line will format the display  
                        className="form-control"
                        required
                    />


                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    );
}


export const LeftMenuAdmin = () => {
    const [activeContent, setActiveContent] = useState(null);

    const handleStudentRegisterForm = () => {
        setActiveContent("estudiantes");
    }

    const renderContent = () => {
        switch (activeContent) {
            case "estudiantes":
                return <EstudiantesForm />;
            default:
                return <p className="lead">Bienvenido</p>;
        }
    }

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Menú</span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li>
                                <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-save2"></i>
                                    <span className="ms-1 d-none d-sm-inline">Registrar</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link
                                            to="#"
                                            className="nav-link px-0 text-white"
                                            onClick={handleStudentRegisterForm}
                                        >
                                            <span className="d-none d-sm-inline">Estudiantes</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="d-none d-sm-inline">Profesores</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="#submenuEditar" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-pen"></i>
                                    <span className="ms-1 d-none d-sm-inline">Editar</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenuEditar" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="d-none d-sm-inline">Estudiantes</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="d-none d-sm-inline">Profesores</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-book"></i>
                                    <span className="ms-1 d-none d-sm-inline">Materias</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="d-none d-sm-inline">Item</span> 1
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="d-none d-sm-inline">Item</span> 2
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-door-open"></i>
                                    <span className="ms-1 d-none d-sm-inline">Permisos</span>
                                </Link>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
                <div className="col py-3">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}; 