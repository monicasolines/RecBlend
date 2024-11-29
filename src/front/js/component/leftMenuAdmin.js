import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundForViews from "../../img/background.jpg";
import imgWelcome from "../../img/wellcomeicon.png"
import "../../styles/components.css";
import Swal from 'sweetalert2';

const FormCommon = ({ type }) => {
    const { store, actions } = useContext(Context)
    const [startDate, setStartDate] = useState(new Date());
    const [photoPreview, setPhotoPreview] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        birthDate: '',
        email: '',
        password: '',
        address: '',
        description: '',
        photo: null,
        classroomName: '',
        subjectName: ''
    });

    useEffect(() => {
        if (type === 'addSubject') {
            actions.getCourses();
        }
    }, [type]);

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

    const submitFormData = async (event) => {
        event.preventDefault();

        try {
            if (type === 'teacher') {
                await actions.postTeacher({
                    "nombre": formData.name,
                    "apellido": formData.lastName,
                    "email": formData.email,
                    "password": formData.password,
                    "descripcion": formData.description,
                    "direccion": formData.address,
                    "foto": "abc"
                });

            }
            if (type === 'addClassroom') {
                let classroom = formData.classroomName
                await actions.postCourse({ "nombre": classroom });
            }
            if (type === 'addSubject') {
                await actions.createSubject({ "nombre": formData.subjectName });
            }
            Swal.fire({
                title: "Datos registrados correctamente",
                icon: "success"
            });
            setFormData({
                name: '',
                lastName: '',
                birthDate: '',
                email: '',
                password: '',
                address: '',
                description: '',
                photo: null,
                classroomName: '',
                subjectName: ''
            });
            setPhotoPreview(null);

        } catch (error) {
            console.error("Error submitting data", error)
            Swal.fire({
                title: "Error al registrar los datos",
                icon: "error"
            });
        }
    };

    return (
        <div className="container ms-2">

            <form onSubmit={(e) => submitFormData(e)} className="container-welcome-teacher">
                <h4 className="text-title d-flex justify-content-center">{`Registrar ${type === 'student' ? 'estudiante nuevo' : type === 'teacher' ? 'profesor nuevo' : type === 'addClassroom' ? 'grado nuevo' : type === 'addSubject' ? 'materia nueva' : ''}`}</h4>
                {/* Formulario con elementos comunes para crear profesor y estudiante */}

                {(type === 'student' || type === 'teacher') && <div className="mb-3">
                    <label className="form-label text-form">Nombre:</label>
                    <input type="text" name="name" className="form-control rounded-pill" required value={formData.name} onChange={handleChange} />
                </div>}
                {(type === 'student' || type === 'teacher') && <div className="mb-3">
                    <label className="form-label text-form">Apellido:</label>
                    <input type="text" name="lastName" className="form-control rounded-pill" required value={formData.lastName} onChange={handleChange} />
                </div>}
                {(type === 'student' || type === 'teacher') && <div className="mb-3">
                    <label className="form-label text-form">Email:</label>
                    <input type="email" name="email" className="form-control rounded-pill" required value={formData.email} onChange={handleChange} />
                </div>}
                {type === 'student' && <div className="mb-3">
                    <label className="form-label text-form">Fecha de nacimiento:</label> <br></br>
                    <DatePicker selected={startDate} name="birthDate" onChange={date => setStartDate(date)} dateFormat="yyyy/MM/dd" className="form-control rounded-pill" required />
                </div>}
                {(type === 'student' || type === 'teacher') && <div className="mb-3">
                    <label className="form-label text-form">Dirección:</label>
                    <input type="text" name="address" className="form-control rounded-pill" required value={formData.address} onChange={handleChange} />
                </div>}

                {/* Elementos específicos del formuario para crear profesor */}

                {type === 'teacher' && (
                    <div className="mb-3">
                        <label className="form-label text-form">Contraseña:</label>
                        <input type="password" name="password" className="form-control rounded-pill" required value={formData.password} onChange={handleChange} />
                    </div>
                )}
                {type === 'teacher' && (
                    <div className="mb-3">
                        <label className="form-label text-form">Descripción:</label>
                        <textarea name="description" className="form-control teacher-description" rows="3" required value={formData.description} onChange={handleChange}></textarea>
                    </div>
                )}
                {type === 'teacher' && (
                    <div className="mb-3">
                        <label className="form-label text-form">Subir foto:</label>
                        <input type="file" accept="image/*" className="form-control select-image rounded-pill" onChange={handleUploadPhoto} required />
                        {photoPreview && (
                            <img src={photoPreview} alt="Preview" className="mt-2 teacher-photo" style={{ maxWidth: "30%", height: "auto" }} />
                        )}
                    </div>
                )}

                {/* Vista para editar estudiantes */}

                {type === 'updateStudents' && (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Fecha de nacimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" name="name" className="form-control" required value={formData.name} onChange={(e) => handleChange(e)} />
                                </td>
                                <td>
                                    <input type="text" name="lastName" className="form-control" required value={formData.lastName} onChange={(e) => handleChange(e)} />
                                </td>
                                <td>
                                    <input type="text" name="email" className="form-control" required value={formData.email} onChange={(e) => handleChange(e)} />
                                </td>
                                <td>
                                    <input type="date" name="date" className="form-control" required value={formData.date} onChange={(e) => handleChange(e)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}


                {/* Vista para editar profesores */}

                {type === 'updateTeachers' && (
                    <table className="table table-hover ">
                        <thead className="table-design">
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Descripción</th>
                                <th>Foto</th>
                            </tr>
                        </thead>
                        <tbody className="table-design">
                            <tr>
                                <td>
                                    <input type="text" name="name" className="form-control" required value={formData.name} onChange={(e) => handleChange(e)} />
                                </td>
                                <td>
                                    <input type="text" name="lastName" className="form-control" required value={formData.lastName} onChange={(e) => handleChange(e)} />
                                </td>
                                <td>
                                    <input type="text" name="email" className="form-control" required value={formData.email} onChange={(e) => handleChange(e)} />
                                </td>
                                <td>
                                    <textarea name="description" className="form-control" rows="3" required value={formData.description} onChange={(e) => handleChange(e)}></textarea>
                                </td>
                                <td>
                                    <input type="file" accept="image/*" className="form-control select-image" onChange={handleUploadPhoto} required />
                                    {photoPreview && (
                                        <img src={photoPreview} alt="Preview" className="mt-2 teacher-photo" style={{ maxWidth: "30%", height: "auto" }} />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}

                {/* Formulario para añadir grados */}

                {type === "addClassroom" && (
                    <div className="mb-3">
                        <label className="form-label text-title">Ingresa un nombre para crear un nuevo grado:</label>
                        <input type="text" name="classroomName" className="form-control rounded-pill" required value={formData.classroomName} placeholder="1er Grado..." onChange={(e) => handleChange(e)} />
                    </div>
                )}

                {/* Formulario para añadir materias */}

                {type === "addSubject" && (



                    < div className="mb-3">
                        <label className="form-label text-title">Selecciona el grado al que vas a asignar la materia:</label>
                        <div className="input-group" required>
                            <select className="custom-select rounded-pill" id="inputGroupSelect04" onChange={handleChange}>
                                <option value="" disabled selected>Opciones...</option>
                                {store.grados.map(grado =>
                                    <option key={grado.id} value="grado.id">{grado.nombre}</option>

                                )}
                            </select>
                        </div>
                    </div>
                )
                }

                {
                    type === "addSubject" && (
                        <div className="mb-3">
                            <label className="form-label text-title">Ingresa un nombre para crear una nueva materia:</label>
                            <input type="text" name="subjectName" className="form-control rounded-pill" required value={formData.subjectName} onChange={handleChange} />
                        </div>
                    )
                }

                <button type="submit" className="btn btn-outline-register">Registrar</button>
            </form >
        </div >
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

    const handleUpdateStudentForm = () => {
        setActiveContent("updateStudents");
    }

    const handleUpdateTeacherForm = () => {
        setActiveContent("updateTeachers");
    }

    const handleAddClassroomForm = () => {
        setActiveContent("addClassroom");
    };

    const handleAddSubjectForm = () => {
        setActiveContent("addSubject");
    };

    const renderContent = () => {
        switch (activeContent) {
            case "estudiantes":
                return <FormCommon type="student" />;
            case "profesores":
                return <FormCommon type="teacher" />;
            case "updateStudents":
                return <FormCommon type="updateStudents" />;
            case "updateTeachers":
                return <FormCommon type="updateTeachers" />;
            case "addClassroom":
                return <FormCommon type="addClassroom" />;
            case "addSubject":
                return <FormCommon type="addSubject" />;
            default:
                return (
                    <div className="container-fluid container-welcome-parent mt-3">
                        <div className="container-welcome-teacher py-5 d-flex">
                            <img src={imgWelcome} alt="welcome image" className="welcome-icon" />
                            <div>
                                <h1 className="text-title display-4">¡Qué bueno verte de regreso!</h1>
                                <p className="lead text-content">Recuerda usar el menú de la izquierda para editar la información de los estudiantes y el profesorado.</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="container-fluid mt-3">
            <div className="row flex-nowrap" >
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark rounded-start">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline ">Menú</span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li>
                                <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-save2"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Crear</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleStudentRegisterForm}>
                                            <i className="fs-4 bi-mortarboard"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2">Estudiantes</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleTeacherRegisterForm}>
                                            <i className="fs-4 bi-person-add"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2">Profesores</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="#submenuEditar" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-pen"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Editar</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenuEditar" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <i className="fs-4 bi-mortarboard"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2" onClick={handleUpdateStudentForm}>Estudiantes</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <i className="fs-4 bi-person-add"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2" onClick={handleUpdateTeacherForm}>Profesores</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-book"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Grados</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <i className="fs-4 bi-plus-square"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2" onClick={handleAddClassroomForm}>Añadir</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <i className="fs-4 bi-journal-plus"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2" onClick={handleAddSubjectForm}>Materias</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
                <div className="d-flex justify-content-center render-content col py-3 "
                    style={{ backgroundImage: `url(${backgroundForViews})`, backgroundSize: "cover" }}>
                    <div className="welcome-message">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

