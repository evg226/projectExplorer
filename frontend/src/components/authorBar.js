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
        <>
            <Col xs={12} sm={5} md={"auto"}  className="text-center px-0 mx-sm-1 my-sm-2 ">
                <Card
                    text={(!selectedAuthor.id)?"light":"secondary"}
                    style={{ cursor: "pointer"}}
                    bg={(!selectedAuthor.id )?"secondary":"light"}
                    className="hover p-2"
                    onClick={()=>handleClickItem()}
                >
                    Все авторы
                </Card>
            </Col>
                 {
                    authors.map(item =>
                        <Col xs={12} sm={5} md={"auto"} key={item.id} className="text-center px-0 mx-sm-1 my-sm-2">
                            <Card
                                text={(item.id ===  selectedAuthor.id )?"light":"secondary"}
                                style={{ cursor: "pointer"}}
                                bg={(item.id ===  selectedAuthor.id )?"secondary":"light"}
                                className="hover p-2"
                                onClick={()=>handleClickItem(item)}
                            >
                                {item.name}
                            </Card>
                        </Col>
                    )
                }
        </>
    );
}


