import React from "react";
import Card from "../../component/card"

const MenuTecnico = () => {
    let menu = [

        
        {
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDAbHn4t7HjcIFwE4hYyB7GgNufV5ABwL_UlA-McsQX1YzPZH0yraICw-Ze5JYlCsZl4&usqp=CAU",
            "titulo": "Vehiculos",
            "linkListado": "/Vehiculos",
            "linkAgregar": "/CrearVehiculos",
            
        },

        {
            "img": "https://www.mppt.gob.ve/wp-content/uploads/2019/02/DSC6406.jpg",
            "titulo": "Reparaciones",
            "linkListado": "/ListarReparaciones",
            "linkAgregar": "/CrearReparacion",
        },
        {
            "img": "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png",
            "titulo": "Reporte",
            "linkListado": "/ListarReparaciones",
            "linkAgregar": "/CrearReparacion",
            "modificarReparaciones": "/ModificarReparacion/:id",
        },

        

    ]

    return (
        <div className="container">
            <h1>Menu Tecnico</h1>
            <hr />
            <div className="row"> 
                {menu.map((item, index) =>( 
                    <Card
                    key={index}
                    img={item.img}
                    titulo={item.titulo}
                    linkListado={item.linkListado}
                    linkAgregar={item.linkAgregar}
                    modificarRepraciones={item.modificarRepraciones} 
                    />
                ) )}
            </div>
        </div>

    )
}

export default MenuTecnico
