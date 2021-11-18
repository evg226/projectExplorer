import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setSeletedAuthor } from '../store/action';
import { getAuthors, getSelectedAuthor } from '../store/selectors';

export const AuthorBar=()=> {
    const authors = useSelector(getAuthors, shallowEqual);
    const selectedAuthor = useSelector(getSelectedAuthor,shallowEqual);
    const dispatch = useDispatch();
    const handleClickItem = (item) => {
        if (selectedAuthor.id !== item.id) {
            dispatch(setSeletedAuthor(item));
        } else {
            dispatch(setSeletedAuthor({}));
        }
    }
    return (
        <Row className="d-flex justify-content-start mt-2">
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


