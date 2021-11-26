import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import {TypeBar} from "../components/typeBar";
import {AuthorBar} from "../components/authorBar";
import {ProjectList} from "../components/projectList";
import {Pages} from "../components/pages";

export const  SelectedDesk = () => {
    return (
            <Container>
                <h2>Избранные проекты</h2>
                <Row>
                    {/*<Col sm={3}>*/}
                    {/*    <TypeBar />*/}
                    {/*</Col>*/}
                    <Col sm={12}>
                        {/*<AuthorBar />*/}
                        <ProjectList isBasket={true} />
                        {/*<Pages />*/}
                    </Col>
                </Row>
            </Container>

    )
}
