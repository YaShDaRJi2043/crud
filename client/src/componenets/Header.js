import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <NavLink
              to="/"
              className="me-5"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "26px",
              }}
            >
              Navbar
            </NavLink>
            <Nav>
              <NavLink
                to="/"
                className="mx-3"
                style={{ textDecoration: "none", color: "white" }}
              >
                Home
              </NavLink>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
