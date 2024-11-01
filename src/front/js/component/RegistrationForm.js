import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
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
            <h2 className="text-center mb-4">Formulario de Inscripción</h2>
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="apellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="direccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Dirección"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="celular">
                    <Form.Label>Celular</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Celular"
                        name="celular"
                        value={formData.celular}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="relacion">
                    <Form.Label>Relación con el alumno</Form.Label>
                    <Form.Control
                        as="select"
                        name="relacion"
                        value={formData.relacion}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="Padre">Padre/Madre</option>
                        <option value="Tutor">Tutor</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="motivo">
                    <Form.Label>¿Por qué inscribe a su hijo en la institución?</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Escribe el motivo de inscripción"
                        name="motivo"
                        value={formData.motivo}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Enviar Inscripción
                </Button>
            </Form>
        </Container>
    );
};

export default RegistrationForm;