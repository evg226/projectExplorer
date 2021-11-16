import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AuthorBar } from '../components/authorBar';
import { TypeBar } from '../components/typeBar'

export const  Desk = () => {
    return (
        <Container>
                
            <Row>
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <AuthorBar />
                </Col>
            </Row>

        </Container>
    );
}

