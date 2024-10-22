import React from "react";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";


const CrearReparacion = () => {
    const { actions, store } = useContext(Context)
    const [chofer, setChofer] = useState ("")
    const [tecnico, setTecnico] = useState ("")
    const [vehiculo, setVehiculo] = useState ("")
    const [falla, setFalla] = useState ("")
    const [ingreso, setIngreso] = useState ("")

    const agregarReparacion = async () => {
        let resp = await actions.guardarReparacion (chofer, vehiculo, falla, tecnico, ingreso)
    }

    useEffect(() => {
        actions.obtenerChoferes()
        actions.obtenerTecnicos()
        actions.obtenerVehiculos()
    }, [])



    return (
        <div className="container">
            <h1>Nueva reparacion</h1>
            <hr />

            <form>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Nombre del chofer
                            </label>
                            <select className="form-select" aria-label="Default select example"
                            value={chofer} onChange={(e) => setChofer(e.target.value)}
                            >
                                <option selected>Chofer</option>
                                {store.choferes.map((item) => (
                                    <option value={item.id}>{item.nombre} {item.apellido}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Vehiculo
                            </label>
                            <select className="form-select" aria-label="Default select example"
                            value={vehiculo} onChange={(e) => setVehiculo(e.target.value)}
                            >
                                <option selected>Vehiculos</option>
                                {store.vehiculos.map((item) => (
                                    <option value={item.id}>{item.matricula} - {item.codigo_producto}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Fallas
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={falla}
                                onChange={(e) => { setFalla(e.target.value) }}
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Tecnico
                            </label>
                            <select className="form-select" aria-label="Default select example"
                            value={tecnico} onChange={(e) => setTecnico(e.target.value)}
                            >
                                <option selected>Tecnicos</option>
                                {store.tecnicos.map((item) => (
                                    <option value={item.id}>{item.nombre} {item.apellido}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Fecha de Ingreso
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    value={ingreso}
                                    onChange={(e) => { setIngreso(e.target.value) }}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                        <div className="col">

                        </div>
                    </div>
                </div>
                <hr />
                <button type="button"
                    onClick={(e) => agregarReparacion(e)}
                    className="btn btn-outline-primary">
                    Nueva Repracion
                </button>
            </form>
        </div>
    )

}

export default CrearReparacion