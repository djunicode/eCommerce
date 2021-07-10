/* eslint-disable no-unused-vars */

import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { DARK_BLUE_2, LIGHT_PEACH } from '../util/colors';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <header>
        <StyledNavbar expand="lg" collapseOnSelect variant="dark">
          <Container fluid>
            <LinkContainer to="/">
              <Navbar.Brand>
                <StyledH1>ProShop</StyledH1>
              </Navbar.Brand>
            </LinkContainer>
            {/* <StyledCartOnSmall
              className={'fas fa-shopping-cart'}
            /> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <StyledHideOnMd>
                <Route
                  render={({ history }) => (
                    <SearchBox history={history} />
                  )}
                />
              </StyledHideOnMd>
              <Nav className="ml-auto">
                <StyledNavLink
                  as={Link}
                  to={userInfo ? '/cart' : '/register'}
                >
                  <i
                    className={userInfo ? 'fas fa-shopping-cart' : ''}
                  />{' '}
                  {userInfo ? `CART` : `SIGN UP`}
                </StyledNavLink>
                {userInfo ? (
                  <StyledNavDropDown
                    title={userInfo.name}
                    id="username"
                  >
                    <StyledLinkContainer to="/profile">
                      <StyledNavDropDownItem>
                        Profile
                      </StyledNavDropDownItem>
                    </StyledLinkContainer>
                    <StyledNavDropDownItem onClick={logoutHandler}>
                      Logout
                    </StyledNavDropDownItem>
                  </StyledNavDropDown>
                ) : (
                  <>
                    <StyledNavLink as={Link} to="/login">
                      <i className="fas fa-user" /> Login
                    </StyledNavLink>
                  </>
                )}
                {userInfo && userInfo.isAdmin && (
                  <StyledNavDropDown title="Admin" id="adminmenu">
                    <StyledLinkContainer to="/admin/userlist">
                      <StyledNavDropDownItem>
                        Users
                      </StyledNavDropDownItem>
                    </StyledLinkContainer>
                    <StyledLinkContainer to="/admin/productlist">
                      <StyledNavDropDownItem>
                        Products
                      </StyledNavDropDownItem>
                    </StyledLinkContainer>
                    <StyledLinkContainer to="/admin/orderlist">
                      <StyledNavDropDownItem>
                        Orders
                      </StyledNavDropDownItem>
                    </StyledLinkContainer>
                  </StyledNavDropDown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
          <StyledSmallScreenSearchBox>
            <Route
              render={({ history }) => (
                <SearchBox history={history} />
              )}
            />
          </StyledSmallScreenSearchBox>
        </StyledNavbar>
      </header>
    </>
  );
};

export default Header;

const StyledNavbar = styled(Navbar)`
  background-color: ${DARK_BLUE_2};
  padding: 16px !important;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 7000 !important;
`;

const StyledH1 = styled.h1`
  color: ${LIGHT_PEACH};
  padding: 0;
  margin: 0;
  font-size: 20px;

  @media (max-width: 400px) {
    font-size: 16px;
  }
`;

const StyledNavLink = styled(Nav.Link)`
  color: ${LIGHT_PEACH};
  margin-right: 6;
  text-decoration: 'none';
  margin: 0 30px;
  border: 2px #ffdfc3 solid;
  font-size: 14px;
  padding: 10px 25px;

  &:hover {
    text-decoration: none;
    color: #30475e !important;
    background-color: #ffdfc3 !important;
  }
`;

const StyledNavDropDown = styled(NavDropdown)`
  background-color: ${DARK_BLUE_2} !important;
  font-size: 14px;
  border: none !important;
  margin-right: 6px !important;
`;

const StyledLinkContainer = styled(LinkContainer)`
  background-color: ${DARK_BLUE_2};
`;

const StyledNavDropDownItem = styled(NavDropdown.Item)`
  background-color: ${DARK_BLUE_2};
  color: ${LIGHT_PEACH};
  font-size: 14px;

  &:hover {
    background-color: ${LIGHT_PEACH};
    color: ${DARK_BLUE_2};
  }
`;

const StyledSmallScreenSearchBox = styled.div`
  width: 100%;
  margin-top: 12px;
  @media (min-width: 992px) {
    display: none;
  }
`;

const StyledHideOnMd = styled.div`
  width: 45%;
  text-align: center;
  margin: auto;
  @media (max-width: 992px) {
    display: none;
  }
`;

const StyledCartOnSmall = styled.i`
  justify-self: flex-end !important;
  color: ${LIGHT_PEACH};
  @media (min-width: 992px) {
    display: none;
  }
`;
