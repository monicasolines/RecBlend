import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/components.css";
import Swal from 'sweetalert2';

const FormCommon = ({ type }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [photoPreview, setPhotoPreview] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        description: '',
        photo: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUploadPhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevState => ({ ...prevState, photo: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submitStudentTeacherCreation = (event) => {
        event.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        console.log('Form submitted', formDataToSend);
        Swal.fire({
            title: "Datos registrados correctamente",
            icon: "success"
        });

    };

    return (
        <div className="container ms-2">
            <h4 className="text-welcome">{`Registrar ${type === 'student' ? 'estudiante' : 'profesor'} nuevo`}</h4>
            <form onSubmit={submitStudentTeacherCreation}>
                <div className="mb-3">
                    <label className="form-label text-welcome">Nombre:</label>
                    <input type="text" name="name" className="form-control" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label text-welcome">Apellido:</label>
                    <input type="text" name="lastName" className="form-control" required value={formData.lastName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label text-welcome">Email:</label>
                    <input type="email" name="email" className="form-control" required value={formData.email} onChange={handleChange} />
                </div>
                {type === 'teacher' && (
                    <div className="mb-3">
                        <label className="form-label text-welcome">Contraseña:</label>
                        <input type="password" name="password" className="form-control" required value={formData.password} onChange={handleChange} />
                    </div>
                )}
                {type === 'teacher' && (
                    <div className="mb-3">
                        <label className="form-label text-welcome">Descripción:</label>
                        <textarea name="description" className="form-control" rows="3" required value={formData.description} onChange={handleChange}></textarea>
                    </div>
                )}
                {type === 'student' && <div className="mb-3">
                    <label className="form-label text-welcome">Fecha de nacimiento:</label> <br></br>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="yyyy/MM/dd" className="form-control" required />
                </div>}
                {type === 'teacher' && ( // Only show this input for teachers  
                    <div className="mb-3">
                        <label className="form-label text-welcome">Subir foto:</label>
                        <input type="file" accept="image/*" className="form-control select-image" onChange={handleUploadPhoto} required />
                        {photoPreview && (
                            <img src={photoPreview} alt="Preview" className="mt-2 teacher-photo" style={{ maxWidth: "30%", height: "auto" }} />
                        )}
                    </div>
                )}
                <button type="submit" className="btn btn-outline-register">Registrar</button>
            </form>
        </div>
    );
};

export const LeftMenuAdmin = () => {
    const [activeContent, setActiveContent] = useState(null);

    const handleStudentRegisterForm = () => {
        setActiveContent("estudiantes");
    };

    const handleTeacherRegisterForm = () => {
        setActiveContent("profesores");
    };

    const renderContent = () => {
        switch (activeContent) {
            case "estudiantes":
                return <FormCommon type="student" />;
            case "profesores":
                return <FormCommon type="teacher" />;
            default:
                return (
                    <div className="jumbotron jumbotron-fluid ">
                        <div className="container">
                            <h1 className="text-welcome display-4">¡Qué bueno verte de regreso!</h1>
                            <p className="lead text-welcome-content">Recuerda usar el menú de la izquierda para editar la información de los estudiantes y el profesorado.</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-info rounded-start">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline ">Menú</span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li>
                                <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-save2"></i>
                                    <span className="ms-1 d-none d-sm-inline">Registrar</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleStudentRegisterForm}>
                                            <span className="d-none d-sm-inline">Estudiantes</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleTeacherRegisterForm}>
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
                <div className="render-content col py-3 ">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

