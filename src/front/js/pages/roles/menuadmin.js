import React from "react";
import Card from "../../component/card";


const MenuAdmin = () => {
    let menu = [

        {
            "img": "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png",
            "titulo": "Usuarios",
            "linkListado": "/Usuarios",
            "linkAgregar": "/Registro",
        },
        {
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDAbHn4t7HjcIFwE4hYyB7GgNufV5ABwL_UlA-McsQX1YzPZH0yraICw-Ze5JYlCsZl4&usqp=CAU",
            "titulo": "Vehiculos",
            "linkListado": "/Vehiculos",
            "linkAgregar": "/CrearVehiculos",
            
        },

        {
            "img": "https://laotraversion.com/wp-content/uploads/2022/10/Miguel-Ramirez-Gonzalez-supervisa-trabajos-de-reparacion-de-unidades-Yutong-del-Metro-de-Maracaibo.jpeg",
            "titulo": "Reparaciones",
            "linkListado": "/ListarReparaciones",
            "linkAgregar": "/CrearReparacion",
        },

        

    ]

    return (
        <div className="container">
            <h1>Menu Administrador</h1>
            <hr />
            <div className="row"> 
                {menu.map((item, index) =>( 
                    <Card
                    key={index}
                    img={item.img}
                    titulo={item.titulo}
                    linkListado={item.linkListado}
                    linkAgregar={item.linkAgregar}
                    />
                ) )}
            </div>
        </div>

    )
}

export default MenuAdmin
