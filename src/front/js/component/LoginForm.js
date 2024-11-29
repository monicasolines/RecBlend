import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/LoginForm.module.css";
import { Context } from '../store/appContext';

const LoginForm = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {

        if (store.role) {
            navigate(redirect(store.role))
        }

    }, [])

    const redirect = (role) => {
        let route = "/dashboard/"
        switch (role) {
            case "admin":
                route += "admin"
                break
            case "docente":
                route += "teacher"
                break
            case "representante":
                route += "parent"
                break
            default:
                route = null
        }
        return route
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (email === '' || password === '') {
            setError('Por favor, complete todos los campos');
            return;
        }

        const response = await actions.handleLogin({ email, password });

        if (response.success) {
            const route = redirect(store.role)
            route ? navigate(route) : setError("Rol no reconocido.");
        } else {
            setError(response.message);
        }

    };

    return (
        <div className={`${styles.LoginForm} d-flex justify-content-center align-items-center`}>
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <h2 className="text-center mb-4"><strong>Iniciar Sesión</strong></h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit} className={`${styles.formLog} p-4 border shadow`}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingrese su correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mt-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-4">
                            Iniciar Sesión
                        </Button>
                        <Button
                            variant="link"
                            onClick={() => navigate('/register')}
                            className="w-100 mt-3 text-center" style={{ 'text-decoration': 'none' }}
                        >
                            <span className={`${styles.spanLog}`}>¿No tienes cuenta? Regístrate</span>
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default LoginForm;
