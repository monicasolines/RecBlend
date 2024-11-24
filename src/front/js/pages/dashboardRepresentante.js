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
// import React, { useEffect, useState } from "react";

// const BACKEND_URL = process.env.BACKEND_URL; // Importa desde las variables de entorno

// export const DashboardRepresentative = () => {
//     const [student, setStudent] = useState(null);
//     const [materias, setMaterias] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             setError("");

//             try {
//                 Solicitud para obtener datos del estudiante
//                 const studentResponse = await fetch(`${BACKEND_URL}/api/students/<student_id>`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
//                 if (!studentResponse.ok) throw new Error("Error al obtener los datos del estudiante");
//                 const studentData = await studentResponse.json();
//                 setStudent(studentData);

//                 Solicitud para obtener materias
//                 const materiasResponse = await fetch(`${BACKEND_URL}/api/materias`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
//                 if (!materiasResponse.ok) throw new Error("Error al obtener las materias");
//                 const materiasData = await materiasResponse.json();
//                 setMaterias(materiasData);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return <div className="text-center mt-5">Cargando datos...</div>;
//     }

//     if (error) {
//         return <div className="alert alert-danger text-center mt-5">{error}</div>;
//     }

//     return (
//         <div className="container mt-5">
//             <h1 className="mb-4">Dashboard del Representante</h1>

//             {/* Datos del Representado */}
//             {student ? (
//                 <div className="mb-5">
//                     <h3>Datos del Representado</h3>
//                     <ul>
//                         <li><strong>Nombre:</strong> {student.nombre}</li>
//                         <li><strong>Apellido:</strong> {student.apellido}</li>
//                         <li><strong>Grado:</strong> {student.grado}</li>
//                         <li><strong>Fecha de Ingreso:</strong> {student.fecha_ingreso}</li>
//                     </ul>
//                 </div>
//             ) : (
//                 <p>No se encontraron datos del representado.</p>
//             )}

//             {/* Materias y Próximos Exámenes */}
//             <div>
//                 <h3>Próximos Exámenes</h3>
//                 {materias.length > 0 ? (
//                     <ul className="list-group">
//                         {materias.map((materia, index) => (
//                             <li key={index} className="list-group-item">
//                                 <strong>{materia.nombre}</strong> - {materia.fecha_examen}
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>No hay exámenes próximos.</p>
//                 )}
//             </div>
//         </div>
//     );
// };
