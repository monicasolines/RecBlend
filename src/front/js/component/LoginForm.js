import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/LoginForm.module.css"; // Importa los estilos

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const validUsername = "usuarioPrueba";
        const validPassword = "contraseña123";

        if (username === '' || password === '') {
            setError('Por favor, complete todos los campos');
            return;
        }

        if (username === validUsername && password === validPassword) {
            setError('');
            navigate('/home');
        } else {
            setError('Nombre de usuario o contraseña incorrectos');
        }
    };

    return (
        <div className={`${styles.LoginForm} d-flex justify-content-center align-items-center`}>
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                        <Form.Group controlId="username">
                            <Form.Label>Nombre de Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
