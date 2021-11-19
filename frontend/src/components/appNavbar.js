import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/selectors';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink,useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, DESK_ROUTE, SELECTED_DESK, SIGNIN_ROUTE, SIGNUP_ROUTE } from '../utils/constants';
import { setUser } from '../store/action';

export const AppNavbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser, shallowEqual);
    const isAuthed = user.isAuth;
    const navigate = useNavigate();

    const handleClickSignin = () => {
        if (!isAuthed) {
            navigate(SIGNIN_ROUTE);
        } else {
            dispatch(setUser({ name: "", isAuth: false }));
            navigate(DESK_ROUTE);
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
                                    <Nav.Link onClick={()=>navigate(DESK_ROUTE)}>Проекты</Nav.Link>
                                </Nav.Item>
                            {isAuthed &&
                                <Nav.Item>
                                    <Nav.Link onClick={()=>navigate(SELECTED_DESK)}>Избранное</Nav.Link>
                                </Nav.Item>}
                            <NavDropdown title={"User: "+user.name} id="collasible-nav-dropdown" align="end">
                                <NavDropdown.Item onClick={handleClickSignin}>{!isAuthed ? "Войти" : "Выйти"}</NavDropdown.Item>    
                                <NavDropdown.Item onClick={()=>navigate(SIGNUP_ROUTE)}>Регистрация</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item disabled={!isAuthed} onClick={()=>navigate(ADMIN_ROUTE)}>Админ панель</NavDropdown.Item>
                            </NavDropdown>
                            
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </>
    );
}
