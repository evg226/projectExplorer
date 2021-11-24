import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {loadProjects, setSeletedAuthor, setSeletedType} from '../store/action';
import { getAuthors, getSelectedAuthor } from '../store/selectors';

export const AuthorBar=()=> {
    const authors = useSelector(getAuthors, shallowEqual);
    const selectedAuthor = useSelector(getSelectedAuthor,shallowEqual);
    const dispatch = useDispatch();
    const handleClickItem = (item) => {
        if (!item) {
            dispatch(setSeletedAuthor({}));
        } else if(selectedAuthor.id === item.id) {
            return;
        } else {
            dispatch(setSeletedAuthor(item));
        }

        // if (selectedAuthor.id !== item.id) {
        //     dispatch(setSeletedAuthor(item));
        // } else {
        //     dispatch(setSeletedAuthor({}));
        // }

        dispatch(loadProjects(1));
    }
    return (
        <Row className="d-flex justify-content-start mt-2">
            <Col className="px-1 text-center">
                <Card
                    text={(!selectedAuthor.id)?"dark":"secondary"}
                    style={{ cursor: "pointer"}}
                    border={(!selectedAuthor.id )?"dark":"light"}
                    className="p-3 hover"
                    onClick={()=>handleClickItem()}
                >
                    Все авторы
                </Card>
            </Col>
                 {
                    authors.map(item =>
                        <Col key={item.id} className="px-1 text-center">
                            <Card
                                text={(item.id ===  selectedAuthor.id )?"dark":"secondary"}
                                style={{ cursor: "pointer"}}
                                border={(item.id ===  selectedAuthor.id )?"dark":"light"}
                                className="p-3 hover"
                                onClick={()=>handleClickItem(item)}
                            >
                                {item.name}
                            </Card>
                        </Col>
                    )
                }
        </Row>  
    );
}


