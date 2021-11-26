import React, { useState } from 'react'
import { Button,Container } from 'react-bootstrap'
import { ProjectCreate } from '../components/modals/project';
import { TypeAuthorCreate } from '../components/modals/typeAuthor'
import {useDispatch} from "react-redux";
import {insertAuthorToDB, insertTypeToDB} from "../store/action";

export const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [authorVisible, setAuthorVisible] = useState(false);
    const [projectVisible, setProjectVisible] = useState(false);
    const dispatch=useDispatch();

    const handleAddType= (typeName) => {
        dispatch(insertTypeToDB(typeName));
    }

    const handleAddAuthor= (authorName) => {
        dispatch(insertAuthorToDB(authorName));
    }

    return (
        <Container>
            <h2 className="my-3  text-center">Административная панель</h2>
            <div className="d-flex">
                <Button variant={"outline-dark"} onClick={()=>setTypeVisible(true)}>
                    Добавить тип проекта
                </Button>
                <Button variant={"outline-dark"} className="mx-2" onClick={()=>setAuthorVisible(true)}>
                    Добавить Автора
                </Button>
                <Button variant={"outline-dark"} onClick={()=>setProjectVisible(true)}>
                    Добавить проект
                </Button>
                <TypeAuthorCreate what="тип" add={handleAddType} show={typeVisible} onHide={()=>setTypeVisible(false)} />
                <TypeAuthorCreate what="автор" add={handleAddAuthor} show={authorVisible} onHide={() => setAuthorVisible(false)} />
                <ProjectCreate show={projectVisible} onHide={() => setProjectVisible(false)} />

            </div>
            
        </Container>
    )
}
