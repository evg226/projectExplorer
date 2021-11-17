import React, { useState } from 'react'
import { Button,Container } from 'react-bootstrap'
import { ProjectCreate } from '../components/modals/project';
import { TypeAuthorCreate } from '../components/modals/typeAuthor'

export const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [authorVisible, setAuthorVisible] = useState(false);
    const [projectVisible, setProjectVisible] = useState(false);

    return (
        <Container>
            <h2>Панель управления</h2>
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
                <TypeAuthorCreate what="тип" show={typeVisible} onHide={()=>setTypeVisible(false)} />
                <TypeAuthorCreate what="автор" show={authorVisible} onHide={() => setAuthorVisible(false)} />
                <ProjectCreate show={projectVisible} onHide={() => setProjectVisible(false)} />

            </div>
            
        </Container>
    )
}
