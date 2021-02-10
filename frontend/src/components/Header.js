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
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Route
                render={({ history }) => (
                  <SearchBox history={history} />
                )}
              />
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
        </StyledNavbar>
      </header>
    </>
  );
};

export default Header;

const StyledNavbar = styled(Navbar)`
  background-color: ${DARK_BLUE_2};
  padding: 16px !important;
`;

const StyledH1 = styled.h1`
  color: ${LIGHT_PEACH};
  padding: 0;
  margin: 0;
  font-size: 20px;
`;

const StyledNavLink = styled(Nav.Link)`
  color: ${LIGHT_PEACH};
  marginright: 6;
  textdecoration: 'none';
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
