
import React, {useState} from 'react'
import {Button, Card, Container, Form } from 'react-bootstrap'
import {useLocation, } from 'react-router'
import {NavLink, } from 'react-router-dom';
import { SIGNIN_ROUTE, SIGNUP_ROUTE} from '../utils/constants';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getAuth} from "../store/action";
import {getUser} from "../store/selectors";

export const  Auth = () => {
    const location = useLocation();
    const isSignin = location.pathname === SIGNIN_ROUTE;
    const dispatch=useDispatch();
    const user=useSelector(getUser,shallowEqual);

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleSignButton = () => {
        dispatch(getAuth(isSignin,email,password));
    }

    return (
            <Container className="d-flex justify-content-center align-items-center"
                                style={{height:window.innerHeight-50,minWidth:320}}>
                <Card style={{width:600,maxWidth:window.innerWidth}} className="p-5">
                    <h3>Страница {isSignin ? "авторизации" : "регистрации"}</h3>
                    <Form className="d-flex flex-column">
                        <Form.Control className="mt-3" placeholder="Введите Ваш e-mail"
                                      value={email} onChange={e=>setEmail(e.target.value)}/>
                        <Form.Control type="password" className="mt-3" placeholder="Введите Ваш пароль"
                                      value={password} onChange={e=>setPassword(e.target.value)} />
                        <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            {isSignin ?
                                <div>Нет аккаунта? <NavLink to={SIGNUP_ROUTE}>Регистрация {">>"}</NavLink></div>
                                : <div>Есть аккаунт? <NavLink to={SIGNIN_ROUTE}>Войти {">>"}</NavLink></div>}
                             <Button variant="outline-secondary" onClick={handleSignButton}>
                                {isSignin ? "Войти" : "Получить"}
                            </Button>
                        </div>
                        <div>{user.error}</div>
                    </Form>
                </Card>
            </Container>

    )
}

