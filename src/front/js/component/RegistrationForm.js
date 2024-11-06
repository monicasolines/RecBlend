import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import styles from "../../styles/RegistrationForm.module.css";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        username: '',
        direccion: '',
        celular: '',
        relacion: '',
        motivo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // manejar datos
        console.log(formData);
    };

    return (
        <Container className="mt-5" id='ContainerForm'>
            <h2 className="text-center mb-4"><strong>Formulario de Inscripción</strong></h2>
            <Form onSubmit={handleSubmit}>

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
                <Form.Group controlId="username">
                    <Form.Label><strong>Username</strong></Form.Label>
                    <Form.Control
                        type="username"
                        placeholder="username"
                        name="username"
                        value={formData.username}
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

                <Form.Group controlId="relacion">
                    <Form.Label><strong>Relación con el alumno</strong></Form.Label>
                    <Form.Control
                        as="select"
                        name="relacion"
                        value={formData.relacion}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="Padre">Padre/Madre</option>
                        <option value="Tutor">Tutor</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="motivo">
                    <Form.Label><strong>¿Por qué inscribe a su hijo en la institución?</strong></Form.Label>
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
    );
};

export default RegistrationForm;