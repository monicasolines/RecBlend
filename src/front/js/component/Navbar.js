import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from "../../img/logo-blanco.png";

const NavBar = () => {
  return (
    <Navbar expand="lg" className="navbar-custom p-y 30px fixed-top">
      <Navbar.Brand href="#home">
        <img
          src={logo}
          alt="logo"
          style={{ width: '30%'}}
          className='ms-4'
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#home" style={{ color: 'white' }}>Inicio</Nav.Link>
          <Nav.Link href="#profesorado" style={{ color: 'white' }}>Profesorado</Nav.Link>
          <Nav.Link href="#caracteristicas" style={{ color: 'white' }}>Características</Nav.Link>
          <Nav.Link href="#registro" style={{ color: 'white' }}>Iniciar Sesión</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
