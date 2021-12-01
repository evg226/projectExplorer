import React from 'react'
import { Container, Row} from "react-bootstrap";
import {ProjectList} from "../components/projectList";

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
