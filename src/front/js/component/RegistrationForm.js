import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import styles from "../../styles/RegistrationForm.module.css";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        direccion: '',
        celular: '',
        motivo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos

        try {
            const response = await fetch(`${process.env.REACT_APP_Backend_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Registro exitoso, redirigir o mostrar mensaje de éxito
                navigate('/login');
            } else {
                setError(data.message || 'Error al registrarse');
            }
        } catch (error) {
            setError('Ocurrió un error al intentar registrarse');
        }
    };

    return (
        <div className={`${styles.ContainerF}`}>
            <Container className="mt-4">
                <h2 className="text-center mb-4"><strong>Formulario de Inscripción</strong></h2>
                <Form onSubmit={handleSubmit} className={`${styles.ContainerForm}`}>

                    <Form.Group controlId="nombre">
                        <Form.Label><strong>Nombre</strong></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Juan"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="apellido">
                        <Form.Label><strong>Apellido</strong></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Perez"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label><strong>Email</strong></Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="usuario@mail.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="direccion">
                        <Form.Label><strong>Dirección</strong></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="FakeStreet 123"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="celular">
                        <Form.Label><strong>Celular</strong></Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="XXXX-XX-XXXX"
                            name="celular"
                            value={formData.celular}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="motivo">
                        <Form.Label id='textarea'><strong>¿Por qué inscribe a su hijo en la institución?</strong></Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Escribe el motivo de inscripción"
                            name="motivo"
                            value={formData.motivo}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-center mt-3">
                        <button
                            type="submit"
                            className={`${styles.buttonRegForm} button nav-link`}
                        >
                            Enviar Inscripción
                        </button>
                    </div>

                </Form>
            </Container>
        </div>
    );
};

export default RegistrationForm;