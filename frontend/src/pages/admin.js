import React, { useState } from 'react'
import {Button, ButtonGroup, Container, Tab, Table, Tabs} from 'react-bootstrap'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {insertAuthorToDB, insertTypeToDB} from "../store/action";
import {getAuthors, getProjects, getTypes, getUser} from "../store/selectors";
import {ModalTypeAuthor} from "../components/modals/modalTypeAuthor";

export const Admin = () => {
    const dispatch=useDispatch();
    const types=useSelector(getTypes,shallowEqual);
    const authors=useSelector(getAuthors,shallowEqual);
    const projects=useSelector(getProjects,shallowEqual);
    const user = useSelector(getUser, shallowEqual);

    const tabs=[
        {id:1,name:"Типы",data:types},
        {id:2,name:"Авторы",data:authors},
        {id:3,name:"Проекты",data:projects,}
    ]

    const [currentTab,setCurrentTab]=useState(tabs[0]);
    const [selectedItem,setSelectedItem]=useState(false);
    const [modalTypeAuthorOptions,setModalTypeAuthorOptions]=useState({isVisible:false});

    const handleClick=(handleType)=>{
        setModalTypeAuthorOptions({operation:handleType,isVisible:true});
    }

    const handleAddType= (typeName) => {
        dispatch(insertTypeToDB(typeName));
    }

    const handleAddAuthor= (authorName) => {
        dispatch(insertAuthorToDB(authorName));
    }

    return (
        user.role==="ADMIN"&&
        <Container>
            <h2 className="my-3  text-center">Административная панель</h2>
            {
                modalTypeAuthorOptions.isVisible &&
                <ModalTypeAuthor currentTab={currentTab} operation={modalTypeAuthorOptions.operation} selectedItem={selectedItem}
                             show={modalTypeAuthorOptions.isVisible}
                             onHide={() => setModalTypeAuthorOptions({isVisible: false})}/>
            }
            {/*<TypeAuthorCreate what="тип" add={handleAddType} show={typeVisible} onHide={()=>setTypeVisible(false)} />*/}
                {/*<TypeAuthorCreate what="автор" add={handleAddAuthor} show={authorVisible} onHide={() => setAuthorVisible(false)} />*/}
                {/*<ProjectCreate show={projectVisible} onHide={() => setProjectVisible(false)} />*/}
            <Tabs
                id="controlled-tab-example"
                activeKey={currentTab.id}
                onSelect={ item=> setCurrentTab(tabs.find(tab=>tab.id===parseInt(item)))}
                onClick={()=>setSelectedItem(false)}
                className="mb-3"
            >
                {
                    tabs.map(tab=>
                        <Tab key={tab.id} eventKey={tab.id} title={tab.name} >
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    tab.data.map (item=>
                                        <tr className={ item===selectedItem ? "bg-secondary":""}
                                            key={item.id}
                                            onClick={()=>setSelectedItem(item)}
                                        >
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                            <ButtonGroup>
                                <Button variant={"outline-secondary"} onClick={()=>handleClick("Добавить")}>Добавить</Button>
                                { selectedItem && <>
                                    <Button variant={"outline-secondary" } onClick={()=>handleClick("Изменить")} >Изменить</Button>
                                    <Button variant={"outline-secondary" } onClick={()=>handleClick("Удалить")} >Удалить</Button>
                                </>}
                            </ButtonGroup>
                        </Tab>
                    )
                }
            </Tabs>

            {/*</div>*/}
            
        </Container>
    )
}
