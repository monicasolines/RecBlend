import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Swal from 'sweetalert2'

const ListarUsuarios = () => {
    const { actions, store } = useContext(Context)

    const borrar = (id) => {
        Swal.fire({
            title: "Deseas Borrar este Usuario",
            text: "No podras recuperar este Usuario",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                actions.borrarUsuarios(id)
                Swal.fire({
                    title: "Borrado!",
                    text: "El Usuario se ha eliminado.",
                    icon: "success"
                });
            }
        });
    }

    useEffect(() => {
        actions.obtenerUsuarios()
    }, [])

    return (
        <div className="container mt-2">
            <h1>Lista de usuarios</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Mail</th>
                        <th scope="col">Rol</th>
                        <th scope="col">telefono</th>
                    </tr>
                </thead>
                <tbody>

                    {store.usuarios.map((item) => (
                        <tr>
                            <th scope="row" key={item.id}>{item.id}</th>
                            <td>{item.nombre}</td>
                            <td>{item.apellido}</td>
                            <td>{item.email}</td>
                            <td>{item.rol}</td>
                            <td>{item.telefono}</td>
                            <td><i className="fa fa-pen"></i></td>
                            <td><i className="fa fa-trash" onClick={() => borrar(item.id)}></i></td>

                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default ListarUsuarios