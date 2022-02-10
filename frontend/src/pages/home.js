import {Container, ListGroup} from "react-bootstrap";
import {ADMIN_ROUTE, DESK_ROUTE, SELECTED_DESK, SIGNIN_ROUTE, SIGNUP_ROUTE} from "../utils/constants";
import {NavLink} from "react-router-dom";
export const Home=()=>{
    return (
        <Container>
            <h1>Добро пожаловать в Project Explorer</h1>
            <ListGroup>

                <NavLink to={DESK_ROUTE} >
                     <ListGroup.Item>
                         Перейти к каталогу проектов  >>
                            </ListGroup.Item>
                    </NavLink>

                <NavLink to={SELECTED_DESK} >
                     <ListGroup.Item>
                         Посмотреть избранные  >>
                        </ListGroup.Item>
                    </NavLink>

                <NavLink to={SIGNIN_ROUTE} >
                     <ListGroup.Item>
                         Авторизация  >>
                </ListGroup.Item>
                    </NavLink>

                <NavLink to={SIGNUP_ROUTE} >
                     <ListGroup.Item>
                         Регистрация  >>
                </ListGroup.Item>
                    </NavLink>

                <NavLink to={ADMIN_ROUTE} >
                     <ListGroup.Item>
                         Страница администратора  >>
                </ListGroup.Item>
                    </NavLink>
            </ListGroup>
        </Container>
    )
}