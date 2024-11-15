import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/LoginForm.module.css";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Limpiar errores previos

        if (email === '' || password === '') {
            setError('Por favor, complete todos los campos');
            return;
        }

        try {
            const response = await fetch(`${process.env.Backend_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/home');
            } else {
                setError(data.message || 'Nombre de usuario o contraseña incorrectos');
            }
        } catch (error) {
            setError('Ocurrió un error al intentar iniciar sesión');
        }
    };

    return (
        <div className={`${styles.LoginForm} d-flex justify-content-center align-items-center`}>
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <h2 className="text-center mb-4"><strong>Iniciar Sesión</strong></h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit} className={`${styles.form} p-4 border rounded shadow`}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
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
                            className="w-100 mt-3 text-center"
                        >
                            <strong>¿No tienes cuenta? Regístrate</strong>
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default LoginForm;
