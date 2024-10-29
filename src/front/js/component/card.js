import React from "react";
import { Link } from "react-router-dom";

const Card = ({ img, titulo, linkListado, linkAgregar, modificarRepraciones }) => {

    return (

        <div className="col">
            <div className="card" style={{ width: "18rem" }}>
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{titulo}</h5>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <Link to={linkListado} className="btn btn-outline-primary">Listado</Link>
                        <Link to={linkAgregar} className="btn btn-outline-primary">Agregar</Link>
                        <Link to={modificarRepraciones} className="btn btn-outline-primary">Editar Reparaciones</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Card 