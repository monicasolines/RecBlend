import React, { useState, useContext, useRef, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [dataForm, setDataForm] = useState({ email: '', password: '' });
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submitButtonRef = useRef(null);

    useEffect(() => {
        if (submitButtonRef.current) {
            submitButtonRef.current.focus();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleClick = () => {
        setVisible(!visible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const result = await actions.loginUser(dataForm);
            if (result) {
                navigate('/vistaPrivada'); 
            } else {
                setMessage(result.message || 'Inicio de sesión fallido. Verifica tus credenciales.');
            }
        } catch (error) {
            setMessage('Error en la solicitud de inicio de sesión. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="divPrincipalLogin">
            <form className="container d-flex flex-column align-items-center mt-5 p-3" id="formularioLogin" onSubmit={handleSubmit} autoComplete="off">
            <h4 className="mt-2 mb-4"><b>Inicia sesión</b></h4>
            <label id="email2">Email<br />
                    <input
                    className="form-control"
                    name="email"
                    value={dataForm.email}
                    placeholder="Correo electrónico"
                    onChange={handleChange}
                    type="email"
                    required
                    autoComplete="off"
                />
            </label>
                <label>Contraseña
                    <div className="contenedor-password">
                        <input
                            className="form-control"
                            name="password"
                            value={dataForm.password}
                            placeholder="Contraseña"
                            onChange={handleChange}
                            type={visible ? "text" : "password"}
                            required
                            autoComplete="off"
                        />
                        {visible ? 
                            <span className="fa-solid fa-eye-slash icon" onClick={handleClick}></span> 
                            : 
                            <span className="fa-solid fa-eye icon" onClick={handleClick}></span>
                        }
                    </div>
                </label>
                <input
                    className="btn-custom mt-3"
                    value="Iniciar sesión"
                    type="submit"
                    id="button4"
                    disabled={loading}
                    ref={submitButtonRef}
                />
                <p>{message}</p>
            </form>
        </div>
    );
};
