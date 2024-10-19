import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";



const ListarVehiculos = () => {
    const { actions, store } = useContext(Context)
    useEffect(() => {
        actions.obtenerVehiculos()
    }, [])

    return (
        <div className="container mt-2">
            <h1> Vehiculos </h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">codigo_producto</th>
                        <th scope="col">matricula</th>
                        <th scope="col">transporte</th>
                        <th scope="col">kilometraje</th>
                        <th scope="col">oem</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                   {store.vehiculos.map((item) => (
                        <tr>
                            <th scope="row" key={item.id}>{item.id}</th>
                            <td>{item.codigo_producto}</td>
                            <td>{item.matricula}</td>
                            <td>{item.transporte}</td>
                            <td>{item.kilometraje}</td>
                            <td>{item.oem}</td>
                            <td><i className="fa fa-pen"></i></td>
                            <td><i className="fa fa-trash"></i></td>

                        </tr>
                    ))}

                </tbody>
            </table>
            <hr />
        </div>
    )
}

export default ListarVehiculos 