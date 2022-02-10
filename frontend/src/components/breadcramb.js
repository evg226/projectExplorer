import {shallowEqual, useSelector} from "react-redux";
import {getMessage} from "../store/selectors";
import {Container, Alert, Spinner, Col, Row} from "react-bootstrap";
import React from "react";
import {useLocation} from "react-router";
import {HOME_ROUTE} from "../utils/constants";
import {NavLink} from "react-router-dom";

export const Breadcramb=()=>{
    const message=useSelector(getMessage,shallowEqual);
    const location=useLocation();

    const locs=location.pathname.split("/");


    return (
    <div className={"border-bottom border-silver "}>
        <Container className={"h-100"}>
            <Row className={"align-items-center "}>
                <Col className={"py-2"}><NavLink className={"text-secondary"} to={HOME_ROUTE}>Home</NavLink> {location.pathname}</Col>
                {message.isVisible &&
                    <Col xs={6} md={4} className={"justify-self-end align-items-center"}>
                        <Alert variant={message.type} className={"d-flex align-items-center py-1 h-100 m-0"}>
                            {message.loading && <Spinner className={"h-50"} animation={"border"} variant={"secondary"}/>}
                            <span className={"ms-2"}>{!message.loading && "V"} {message.text}</span>
                        </Alert>
                    </Col>
                }
            </Row>
        </Container>
    </div>
    )
}