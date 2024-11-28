import React, { useContext } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../component/leftMenuParent/Avatar.jsx";
import logo from "../../img/logo-blanco.png";
import defaultAvatar from "../../img/avatar-de-perfil.png"; // Imagen predeterminada del avatar
import styles from "../../styles/Navbar.module.css";
import { Context } from "../store/appContext";

const NavBar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { token, userAvatar } = store;

  const handleLogout = () => {
    actions.handleLogout();
    navigate("/home");
  };
  

  return (
    <Navbar expand="lg" className={`${styles["navbar-custom"]} navbar-dark fixed-top`}>
      <Navbar.Brand as={Link} to="/home">
        <img
          src={logo}
          alt="logo"
          style={{ height: "50px" }}
          className="ms-5 ps-3"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className={`${styles["navbar-toggler"]}`} />
      <Navbar.Collapse id="basic-navbar-nav" className={`${styles.collapseCustom}`}>
        {token ? (
          <Nav className="ms-auto text-center">
            <Nav.Link>
              <i className="fas fa-bell" style={{ fontSize: "1.5rem" }}></i>
            </Nav.Link>
            <Dropdown align="end">
              <Dropdown.Toggle as="div">
                <Avatar
                  src={userAvatar || defaultAvatar}
                  alt="User Avatar"
                  size={40}
                  onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic en el avatar
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className={`${styles.ItemAvatar}`}>
                <Dropdown.Item as={Link} to="/preferences" className={`${styles.ItemAvatarButtom}`}>
                  Preferencias
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className={`${styles.ItemAvatarButtom}`}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        ) : (
          <Nav className="ms-auto text-center">
            <Nav.Link
              onClick={() => navigate("/home", { state: { scrollTo: "bienvenida" } })}
              className={`${styles.NavButton} nav-link`}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/home", { state: { scrollTo: "profesorado" } })}
              className={`${styles.NavButton} nav-link`}
            >
              Profesorado
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/home", { state: { scrollTo: "caracteristicas" } })}
              className={`${styles.NavButton} nav-link`}
            >
              Características
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className={`${styles.NavButton} nav-link`}>
              Iniciar Sesión
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

