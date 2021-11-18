
import React from 'react'
import {Button, Card, Container, Form } from 'react-bootstrap'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom';
import { SIGNIN_ROUTE, SIGNUP_ROUTE } from '../utils/constants';

export const  Auth = () => {
    const location = useLocation();
    const isSignin = location.pathname === SIGNIN_ROUTE;
   
    return (
        <div>
            <Container className="d-flex justify-content-center align-items-center"
                                style={{height:window.innerHeight-50,minWidth:320}}>
                <Card style={{width:600,maxWidth:window.innerWidth}} className="p-5">
                    <h3>Страница {isSignin ? "авторизации" : "регистрации"}</h3>
                    <Form className="d-flex flex-column">
                        <Form.Control className="mt-3" placeholder="Введите Ваш e-mail"/>
                        <Form.Control type="password" className="mt-3" placeholder="Введите Ваш пароль"/>
                        <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            {isSignin ?
                                <div>Нет аккаунта? <NavLink to={SIGNUP_ROUTE}>Регистрация {">>"}</NavLink></div>
                                : <div>Есть аккаунт? <NavLink to={SIGNIN_ROUTE}>Войти {">>"}</NavLink></div>}
                             <Button variant="outline-secondary">
                                {isSignin ? "Войти" : "Получить"}
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    )
}

