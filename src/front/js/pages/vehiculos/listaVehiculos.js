import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Swal from 'sweetalert2'


const ListarVehiculos = () => {
    const { actions, store } = useContext(Context)

    const borrar = (id) => {
        Swal.fire({
            title: "Deseas Borrar este Vehiculo",
            text: "No podras recuperar este vehiculo",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {
            actions.borrarVehiculos(id) 
              Swal.fire({
                title: "Borrado!",
                text: "El vehiculo se ha eliminado.",
                icon: "success"
              });
            }
          });
    }

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
                            <td><i className="fa fa-trash" onClick={() => borrar(item.id)}></i></td>

                        </tr>
                    ))}

                </tbody>
            </table>
            <hr />
        </div>
    )
}

export default ListarVehiculos 