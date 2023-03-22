import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
<<<<<<< HEAD
import GameCard from "./GameCard.jsx";
//import logoImage from "./src/front/img/gameportal-removebg-preview.png"

=======
import { Context } from "../store/appContext.js";
>>>>>>> a947074375590d51d49b559444bfd778b6d48c64

const MyNavbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const { actions } = useContext(Context);

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Game Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/games">
              Games
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/news">
              News
            </Nav.Link>
            <Nav.Link as={Link} to="/support">
              Support
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Sign Up
            </Nav.Link>
            <NavDropdown title="Cart" id="basic-nav-dropdown">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <NavDropdown.Item key={index}>{item.title}</NavDropdown.Item>
                ))
              ) : (
                <NavDropdown.Item>No items in cart</NavDropdown.Item>
              )}

              {cartItems.length > 0 && <NavDropdown.Divider />}
              {cartItems.length > 0 && (
                <NavDropdown.Item onClick={clearCart}>
                  Clear Cart
                </NavDropdown.Item>
              )}
              <NavDropdown.Item as={Link} to="/checkout">Checkout</NavDropdown.Item>

            </NavDropdown>
