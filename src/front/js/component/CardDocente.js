import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import styles from '../../styles/CardDocente.module.css';
import docente4 from "../../img/docente4.jpg"
import docente3 from "../../img/docente3.jpg"
import docente2 from "../../img/docente2.jpg"
import docente1 from "../../img/Docente1.jpg"


const CardDocente = () => {
    const docentes = [
        { id: 1, name: 'María Pérez', description: 'Docente de Matemáticas', img: docente4 },
        { id: 2, name: 'Juan López', description: 'Docente de Historia', img: docente2 },
        { id: 3, name: 'Laura García', description: 'Docente de Ciencias', img: docente3 },
        { id: 4, name: 'Carlos Díaz', description: 'Docente de Lengua', img: docente1 }
    ];

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

// import React, { useEffect, useState } from 'react';
// import { Card, Container, Row, Col } from 'react-bootstrap';
// import styles from '../../styles/CardDocente.module.css';

// const CardDocente = () => {
//     const [docentes, setDocentes] = useState([]);

//     // useEffect para cargar datos de la API al montar el componente
//     useEffect(() => {
//         // URL de ejemplo, reemplázala con la URL de tu API
//         fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/teachers`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Error al cargar los datos');
//                 }
//                 return response.json();
//             })
//             .then(data => setDocentes(data))
//             .catch(error => console.error('Error:', error));
//     }, []);

//     return (
//         <Container className={styles.container}>
//             <Row>
//                 {docentes.map(docente => (
//                     <Col key={docente.id} md={6} lg={3} className="mb-4">
//                         <Card className={styles.card}>
//                             <Card.Img
//                                 variant="top"
//                                 src={docente.img} // Asegúrate de que la propiedad img tenga la URL correcta en tu API
//                                 alt={`Foto de ${docente.name}`}
//                                 className={styles.cardImg}
//                             />
//                             <Card.Body className={styles.cardBody}>
//                                 <Card.Title className={styles.cardTitle}>{docente.name}</Card.Title>
//                                 <Card.Text className={styles.cardText}>{docente.description}</Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// };

// export default CardDocente;