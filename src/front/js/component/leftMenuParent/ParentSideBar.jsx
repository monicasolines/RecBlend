import React from "react";
import { Nav } from "react-bootstrap";
import styled from "styled-components";

const ListMenuItem = styled.span`
  color: #ffffff;
  font-size: 1.4vw;
  text-decoration: none;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin: 0 5px;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    background: #ffffff;
    transition: all 0.5s;
  }

  &::before {
    top: 0;
    left: 0;
  }

  &::after {
    bottom: 0;
    right: 0;
  }

  &:hover::before {
    width: 100%;
    transition: width 0.25s ease-in-out;
  }

  &:hover::after {
    width: 100%;
    transition: width 0.25s ease-in-out 0.25s;
  }
`;

const SidebarWrapper = styled.div`
  width: 21vw;
  background-color: #f8f9fa;

  @media (max-width: 786px) {
    width: 20vw;
  }
`;

const ResponsiveNavLink = styled(Nav.Link)`
  display: flex;
  align-items: center;

  @media (max-width: 786px) {
    justify-content: center;
    .list-menu-item-text {
      display: none; /* Oculta el texto en pantallas pequeñas */
    }
  }
`;

const StyledICon = styled.i`
  font-size: 150%;

  @media (max-width: 786px) {
    font-size: 5vw;

    &:hover {
      color: black;
    }
  }
`;

const ParentSideBar = ({ items, activeKey, onSelect }) => {
  return (
    <SidebarWrapper>
      <Nav
        variant="tab"
        className="flex-column gap-3 rounded-start"
        activeKey={activeKey}
        onSelect={onSelect}
        style={{
          backgroundColor: "#0DCAF0",
          minHeight: "100vh",
          margin: "12px 10px 0 12px",
        }}>
        {items.map((item, index) => (
          <Nav.Item key={index}>
            <ResponsiveNavLink
              eventKey={item.key}
              className="text-light fw-bold m-1">
              {item.icon && (
                <span className="me-2">
                  <StyledICon>{item.icon}</StyledICon>
                </span>
              )}
              <ListMenuItem className="list-menu-item-text">
                {item.label}
              </ListMenuItem>
            </ResponsiveNavLink>
          </Nav.Item>
        ))}
      </Nav>
    </SidebarWrapper>
  );
};

export default ParentSideBar;
