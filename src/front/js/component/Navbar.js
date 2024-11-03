import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../../img/logo-blanco.png";

const NavBar = () => {
  return (
    <Navbar expand="lg" className="navbar-custom p-y 30px fixed-top">
      <Navbar.Brand as={Link} to="/home">
        <img
          src={logo}
          alt="logo"
          style={{ width: '30%' }}
          className='ms-4'
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler">
        <span className="navbar-toggler-icon"></span>
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav" className="collapse-custom">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/home" className='NavButton nav-link'>Inicio</Nav.Link>
          <Nav.Link href="#profesorado" className='NavButton nav-link'>Profesorado</Nav.Link>
          <Nav.Link href="#caracteristicas" className='NavButton nav-link'>Características</Nav.Link>
          <Nav.Link as={Link} to="/login" className='NavButton nav-link'>Iniciar Sesión</Nav.Link> 
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;

