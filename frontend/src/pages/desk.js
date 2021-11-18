import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AuthorBar } from '../components/authorBar';
import { ProjectList } from '../components/projectList';
import { TypeBar } from '../components/typeBar'

export const  Desk = () => {
    return (
        <Container>
                
            <Row>
                <Col sm={3}>
                    <TypeBar />
                </Col>
                <Col sm={9}>
                    <AuthorBar />
                    <ProjectList />
                </Col>
            </Row>

        </Container>
    );
}

