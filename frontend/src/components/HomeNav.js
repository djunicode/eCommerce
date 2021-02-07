import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import styled from 'styled-components';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };


  // STYLED COMPONENTS
  const Navbars = styled(Navbar)`
    background: #30475E;
    padding: 1.5rem 80px;
  `
  const Icon = styled.i`
    color: #FFDFC3;
    margin-left: 5vw;
  `
  const Containers = styled.div`
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `


  return (
    <header>
      <Navbars collapseOnSelect>
        <Containers>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route
              render={({ history }) => (
                <SearchBox history={history} />
              )}
            />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <Icon className="fas fa-shopping-cart fa-2x" />
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <Icon className="fas fa-user fa-2x" />
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Containers>
      </Navbars>
    </header>
  );
};

export default Header;
