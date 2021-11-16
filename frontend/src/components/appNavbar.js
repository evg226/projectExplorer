import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/selectors';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, DESK_ROUTE, SELECTED_DESK, SIGNIN_ROUTE, SIGNUP_ROUTE } from '../utils/constants';
import { setUser } from '../store/action';

export const AppNavbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser, shallowEqual);
    const isAuthed = user.isAuth;
    
    const handleClickSignin = () => {
        if (isAuthed) {
            dispatch(setUser({ name: "", isAuth: false }));
        } else {
            dispatch(setUser({ name: "default", isAuth: true }));
        }
    }
    return (
        <>
            
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Container>
                    <NavLink to={DESK_ROUTE}>
                        <Navbar.Brand>Project Explorer</Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className="ml-auto">
                            <Nav.Item>
                                    <Nav.Link href={DESK_ROUTE}>Проекты</Nav.Link>
                                </Nav.Item>
                            {isAuthed &&
                                <Nav.Item>
                                    <Nav.Link href={SELECTED_DESK}>Избранное</Nav.Link>
                                </Nav.Item>}
                            <NavDropdown title="USER" id="collasible-nav-dropdown" align="end">
                                <NavDropdown.Item /*</NavDropdown>*href={SIGNIN_ROUTE}*/ onClick={handleClickSignin}>{!isAuthed ? "Войти" : "Выйти"}</NavDropdown.Item>    
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
