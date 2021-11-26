import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AuthorBar } from '../components/authorBar';
import { ProjectList } from '../components/projectList';
import { TypeBar } from '../components/typeBar'
import {Pages} from "../components/pages";

export const  Desk = () => {
    return (
        <Container >
            <h2 className="my-3  text-center">Проекты</h2>
            <Row>
                <Col xs={12} sm={4} md={3} xl={2}>
                    <TypeBar />
                </Col>
                <Col xs={12} sm={8} md={9}  xl={10}>
                    <Row xs={11} className={"my-2 d-flex justify-content-center justify-content-sm-start mx-0"}>
                        <AuthorBar />
                    </Row>
                    <Row className="d-flex mt-4">
                        <ProjectList />
                    </Row>
                    <Pages />
                </Col>
            </Row>

        </Container>
    );
}

