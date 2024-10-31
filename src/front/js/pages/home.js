import React, { useContext } from "react";
import { Context } from "../store/appContext";
import RegistrationForm from '../component/RegistrationForm';
import "../../styles/home.css";
import img1 from "../../img/niñosylibros.jpg"
import img2 from "../../img/padres-comprometidos-alumnos-destacados.jpg"
import img3 from "../../img/un-aula-de-un-colegio.jpeg"

export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="allSection">
			<section id="bienvenida" className="section alternate">
				<div className="container">
					<div className="text-content">
						<h1>Bienvenidos a SchoolHub</h1>
						<p>Esta es la introducción a nuestra página, donde encontrarás toda la información relevante.</p>
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
						<p>Conoce a los expertos que forman parte de nuestro equipo.</p>
					</div>
				</div>
			</section>

			<section id="caracteristicas" className="section alternate">
				<div className="container">
					<div className="text-content">
						<h2>Características</h2>
						<p>Descubre todas las funcionalidades y beneficios de nuestra plataforma.</p>
					</div>
					<div className="image-content">
						<img src={img1} alt="Niños y libros" className="section-image" />
					</div>
				</div>
			</section>

			<section id="registro" className="section">
				<div className="container d-none">
					<RegistrationForm />
				</div>
			</section>
		</div>
	);
};
