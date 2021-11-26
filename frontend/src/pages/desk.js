import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AuthorBar } from '../components/authorBar';
import { ProjectList } from '../components/projectList';
import { TypeBar } from '../components/typeBar'
import {Pages} from "../components/pages";

export const  Desk = () => {
    return (
        <Container>
            <h2>Проекты</h2>
            <Row>
                <Col sm={3}>
                    <TypeBar />
                </Col>
                <Col sm={9}>
                    <AuthorBar />
                    <ProjectList />
                    <Pages />
                </Col>
            </Row>

        </Container>
    );
}

