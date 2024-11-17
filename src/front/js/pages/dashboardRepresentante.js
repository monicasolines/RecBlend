import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

export const DashboardRepresentative = () => {
    const { store, actions } = useContext(Context);

    const [student, setStudent] = useState(null); // Datos del estudiante
    const [materias, setMaterias] = useState([]); // Materias/exámenes del representado
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(""); // Estado de error

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError("");

            try {
                // Obtener datos del estudiante
                const studentData = await actions.fetchStudent(); // Acción en el store
                setStudent(studentData);

                // Obtener materias relacionadas (exámenes)
                const materiasData = await actions.fetchMaterias(); // Acción en el store
                setMaterias(materiasData);
            } catch (err) {
                setError("Hubo un error al cargar los datos");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [actions]);

    if (loading) {
        return <div className="text-center mt-5">Cargando datos...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center mt-5">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Dashboard del Representante</h1>

            {/* Datos del Representado */}
            {student ? (
                <div className="mb-5">
                    <h3>Datos del Representado</h3>
                    <ul>
                        <li><strong>Nombre:</strong> {student.nombre}</li>
                        <li><strong>Apellido:</strong> {student.apellido}</li>
                        <li><strong>Grado:</strong> {student.grado}</li>
                        <li><strong>Fecha de Ingreso:</strong> {student.fecha_ingreso}</li>
                    </ul>
                </div>
            ) : (
                <p>No se encontraron datos del representado.</p>
            )}

            {/* Materias y Próximos Exámenes */}
            <div>
                <h3>Próximos Exámenes</h3>
                {materias.length > 0 ? (
                    <ul className="list-group">
                        {materias.map((materia, index) => (
                            <li key={index} className="list-group-item">
                                <strong>{materia.nombre}</strong> - {materia.fecha_examen}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay exámenes próximos.</p>
                )}
            </div>
        </div>
    );
};
