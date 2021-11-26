import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import {TypeBar} from "../components/typeBar";
import {AuthorBar} from "../components/authorBar";
import {ProjectList} from "../components/projectList";
import {Pages} from "../components/pages";

export const  SelectedDesk = () => {
    return (
            <Container>
                <h2 className="my-3  text-center">Избранные проекты</h2>
                <Row className="d-flex mt-4">
                    {/*<Col  >*/}
                        {/*<AuthorBar />*/}
                        <ProjectList isBasket={true} />
                        {/*<Pages />*/}
                    {/*</Col>*/}
                </Row>

            </Container>

    )
}
