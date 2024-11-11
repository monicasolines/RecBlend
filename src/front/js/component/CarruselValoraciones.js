import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import styles from "../../styles/CarruselValoraciones.module.css";

const CarruselValoraciones = () => {
    const valoraciones = [
        { id: 1, user: 'Pedro González', rating: 5, comment: 'Excelente plataforma educativa, muy fácil de usar.' },
        { id: 2, user: 'Ana López', rating: 4, comment: 'Gran herramienta para el seguimiento de mis hijos.' },
        { id: 3, user: 'Roberto Martínez', rating: 5, comment: 'Muy útil y completa para los docentes.' }
    ];

    return (
        <Container className={styles.container}>
            <Carousel>
                {valoraciones.map((valoracion) => (
                    <Carousel.Item key={valoracion.id}>
                        <div className={styles.carouselItem}>
                            <h5 className={styles.userName}>{valoracion.user}</h5>
                            <p className={styles.rating}>
                                {'★'.repeat(valoracion.rating)}
                                {'☆'.repeat(5 - valoracion.rating)}
                            </p>
                            <p className={styles.comment}>&quot;{valoracion.comment}&quot;</p>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};

export default CarruselValoraciones;

