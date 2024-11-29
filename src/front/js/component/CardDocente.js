import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import styles from '../../styles/CardDocente.module.css';
import docente4 from "../../img/docente4.jpg";
import docente3 from "../../img/docente3.jpg";
import docente2 from "../../img/docente2.jpg";
import docente1 from "../../img/Docente1.jpg";

const CardDocente = () => {
    const [docentes, setDocentes] = useState([]);
    const fakeDocentes = [
        { id: 'f1', name: 'María Pérez', description: 'Docente de Matemáticas', img: docente4 },
        { id: 'f2', name: 'Juan López', description: 'Docente de Historia', img: docente2 },
        { id: 'f3', name: 'Laura García', description: 'Docente de Ciencias', img: docente3 },
        { id: 'f4', name: 'Carlos Díaz', description: 'Docente de Lengua', img: docente1 },
    ];

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}api/teachers`, {
            "method": "GET",
            "headers": {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos');
                }
                return response.json();
            })
            .then(data => {
                // Prioriza los datos de la API y complementa con los ficticios si es necesario
                const combinedDocentes = [...data, ...fakeDocentes.slice(data.length)];
                setDocentes(combinedDocentes);
            })
            .catch(error => {
                console.error('Error:', error);
                // Si hay un error o no hay docentes cargados, usa solo los docentes ficticios
                setDocentes(fakeDocentes);
            });
    }, []);

    return (
        <Container className={styles.container}>
            <Row>
                {docentes.map(docente => (
                    <Col key={docente.id} md={6} lg={3} className="mb-4">
                        <Card className={styles.card}>
                            <Card.Img
                                variant="top"
                                src={docente.img}
                                alt={`Foto de ${docente.name}`}
                                className={styles.cardImg}
                            />
                            <Card.Body className={styles.cardBody}>
                                <Card.Title className={styles.cardTitle}>{docente.name}</Card.Title>
                                <Card.Text className={styles.cardText}>{docente.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CardDocente;
