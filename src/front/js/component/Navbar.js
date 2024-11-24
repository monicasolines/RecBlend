import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../img/logo-blanco.png";
import styles from "../../styles/Navbar.module.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleScrollToSection = (section) => {
    navigate("/home", { state: { scrollTo: section } });
  };

  return (
    <Navbar expand="lg" className={`${styles['navbar-custom']} navbar-dark fixed-top`}>
      <Navbar.Brand as={Link} to="/home">
        <img
          src={logo}
          alt="logo"
          style={{ height: "50px" }}
          className='ms-5 ps-3'
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className={`${styles['navbar-toggler']}`} />
      <Navbar.Collapse id="basic-navbar-nav" className={`${styles.collapseCustom}`}>
        <Nav className="ms-auto text-center ml-4">
          <Nav.Link onClick={() => handleScrollToSection("bienvenida")} className={`${styles.NavButton} nav-link`}>Inicio</Nav.Link>
          <Nav.Link onClick={() => handleScrollToSection("profesorado")} className={`${styles.NavButton} nav-link`}>Profesorado</Nav.Link>
          <Nav.Link onClick={() => handleScrollToSection("caracteristicas")} className={`${styles.NavButton} nav-link`}>Características</Nav.Link>
          <Nav.Link as={Link} to="/login" className={`${styles.NavButton} nav-link`}>Iniciar Sesión</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;