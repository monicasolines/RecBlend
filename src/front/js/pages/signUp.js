import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { Context } from "../store/appContext";
import "../../styles/signUp.css"; 

export const SignUp = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 

    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [visiblePassword, setVisiblePassword] = useState(false);  
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setVisiblePassword(!visiblePassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setVisibleConfirmPassword(!visibleConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.register(dataForm);
        if (success) {
            navigate('/login'); 
        } else {
            console.log("Error en el registro");
        }
        setDataForm({
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="divPrincipalLogin">
            <form className="container d-flex flex-column align-items-center mt-5 p-3" id="signUpBox" onSubmit={handleSubmit}>
                <h4 className="mt-2 mb-4"><b>Regístrate</b></h4>
                <label>Email
                    <input 
                        className="form-control" 
                        name="email" 
                        value={dataForm.email} 
                        placeholder="Correo electrónico" 
                        onChange={handleChange} 
                        type="email" 
                        id="emailForm"
                        required
                    />
                </label>
                <label>Contraseña
                    <div className="contenedor-password2">
                        <input 
                            className="form-control" 
                            name="password" 
                            value={dataForm.password} 
                            placeholder="Contraseña" 
                            onChange={handleChange} 
                            type={visiblePassword ? "text" : "password"} 
                            required
                        />
                        {visiblePassword ? 
                            <span className="fa-solid fa-eye-slash icon2" onClick={togglePasswordVisibility}></span>
                            :
                            <span className="fa-solid fa-eye icon" onClick={togglePasswordVisibility}></span>}
                    </div>
                </label>
                <label>Confirma contraseña
                    <div className="contenedor-password2">
                        <input 
                            className="form-control" 
                            name="confirmPassword" 
                            value={dataForm.confirmPassword} 
                            placeholder="Confirma Contraseña" 
                            onChange={handleChange} 
                            type={visibleConfirmPassword ? "text" : "password"} 
                            required
                        />
                        {visibleConfirmPassword ? 
                            <span className="fa-solid fa-eye-slash icon2" onClick={toggleConfirmPasswordVisibility}></span>
                            :
                            <span className="fa-solid fa-eye icon" onClick={toggleConfirmPasswordVisibility}></span>}
                    </div>
                </label>
                <input className="btn-custom mt-3" value="SignUp" type="submit" id="button4"/>
            </form>
        </div>
    );
};
