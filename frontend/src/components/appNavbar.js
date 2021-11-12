import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { getUser } from '../store/selectors';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, DESK_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from '../utils/constants';

export const AppNavbar=()=> {
    const user = useSelector(getUser, shallowEqual);
    const isAuthed = user.isAuth;
    return (
        <>
            
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Container>
                    <NavLink to={DESK_ROUTE}>
                        <Navbar.Brand>Project Explorer</Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">О нас</Nav.Link>
                            {/* <Nav.Link href="#pricing">Pricing</Nav.Link>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        <Nav className="ml-auto">
                            {isAuthed && <Navbar.Text><NavLink to={DESK_ROUTE}>Избранное</NavLink></Navbar.Text>}
                            <NavDropdown title="USER" id="collasible-nav-dropdown" align="end">
                                <NavDropdown.Item href={SIGNIN_ROUTE}>{!isAuthed ? "Войти" : "Выйти"}</NavDropdown.Item>
                                <NavDropdown.Item href={SIGNUP_ROUTE}>Регистрация</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={ADMIN_ROUTE} disabled={!isAuthed}>Админ панель</NavDropdown.Item>
                            </NavDropdown>
                            
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </>
    );
}
