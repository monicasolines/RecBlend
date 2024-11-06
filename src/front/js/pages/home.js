import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import img1 from "../../img/niñosylibros.jpg"
import img2 from "../../img/padres-comprometidos-alumnos-destacados.jpg"
import img3 from "../../img/un-aula-de-un-colegio.jpeg"

export const Home = () => {
	const location = useLocation();

	useEffect(() => {
		if (location.state?.scrollTo) {
			const section = document.getElementById(location.state.scrollTo);
			if (section) {
				section.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [location.state]);

	return (
		<div className="allSection">
			<section id="bienvenida" className="section alternate">
				<div className="container">
					<div className="text-content">
						<h1>Bienvenidos a SchoolHub</h1>
						<p>
							Una plataforma de uso múltiple donde cada usuario podrá aprovecharla de diferente manera.
							Como Directivo podrás distribuir carga horaria, validar usuarios y supervisar todo a detalle.
							Como Docente, serás capaz de ver tus horarios, asignar notas al alumnado e interactuar con los "responsables" de los niños.
							El Responsable del alumno podrá divisar las notas, anotarlo a actividades extracurriculares y más.
						</p>
					</div>
					<div className="image-content">
						<img src={img3} alt="Aula de colegio" className="section-image" />
					</div>
				</div>
			</section>

			<section id="profesorado" className="section">
				<div className="container">
					<div className="image-content">
						<img src={img2} alt="Padres e hijos" className="section-image" />
					</div>
					<div className="text-content">
						<h2>Nuestro Profesorado</h2>
						<p>
							Conoce a los expertos que forman parte de nuestro equipo.
							Cada Docente es elegido con cautela y múltiple evaluaciones para demostrar
							que es apto para el cargo.
						</p>
					</div>
				</div>
			</section>

			<section id="caracteristicas" className="section alternate">
				<div className="container">
					<div className="text-content">
						<h2>Características</h2>
						<p>
							Descubre todas las funcionalidades y beneficios de nuestra plataforma.
							Facilidad de uso e interactividad es uno de los beneficios más importante de nuestra plataforma.
							Por otro lado, se podrá llevar de manera exhaustiva el control por parte de cada rol, de lo que a éste se le permita.
							Los feriados no se te pasarán, podrás saber qué días la Institución permanecerá cerrada a causa de fechas patrias, para poder proyectar con antelación cualquier inconveniente.
						</p>
					</div>
					<div className="image-content">
						<img src={img1} alt="Niños y libros" className="section-image" />
					</div>
				</div>
			</section>

			<section id="registro" className="section">
				<div className="container-Form">
					<h2>Regístrese!</h2>
					<p>No dudes en registrarte y obtener los beneficios de un Sistema ideado para su comodidad, tranquilidad y supervisión de desempeño Escolar.</p>
					<Link to="/register">
						<button className="button" id="btn-reg">Regístrese aquí!</button>
					</Link>
				</div>
			</section>
		</div>
	);
};
