import React, { useState } from 'react'
import {Button, ButtonGroup, Container, Tab, Table, Tabs} from 'react-bootstrap'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getAuthors, getProjects, getTypes, getUser} from "../store/selectors";
import {ModalTypeAuthor} from "../components/modals/modalTypeAuthor";
import {ModalProject} from "../components/modals/ModalProject";
import {loadProject, setSeletedProject} from "../store/action";
import {Pages} from "../components/pages";

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
    const [modalProjectOptions,setModalProjectOptions]=useState({isVisible:false});

    const handleClick=(handleType)=>{
        if(currentTab.id===3) {
            if(handleType==="Добавить"){
                setSelectedItem(false);
                dispatch(setSeletedProject({loading: false, error: false, loaded: true, data: {}}));
            }
            setModalProjectOptions({operation: handleType, isVisible: true});
        }
        else
            setModalTypeAuthorOptions({operation:handleType,isVisible:true});
    }

    const handleClickItem =(item)=>{
        setSelectedItem(item);
        if(currentTab.id===3) dispatch(loadProject(item.id));
    }

    // const handleAddType= (typeName) => {
    //     dispatch(insertTypeToDB(typeName));
    // }
    //
    // const handleAddAuthor= (authorName) => {
    //     dispatch(insertAuthorToDB(authorName));
    // }

    return (
        user.role==="ADMIN"&&
        <Container>
            <h2 className="my-3  text-center">Административная панель</h2>
            {modalTypeAuthorOptions.isVisible &&
                <ModalTypeAuthor currentTab={currentTab} operation={modalTypeAuthorOptions.operation} selectedItem={selectedItem}
                                 show={modalTypeAuthorOptions.isVisible}
                                 onHide={() => setModalTypeAuthorOptions({isVisible: false})}/>}
            {modalProjectOptions.isVisible &&
                <ModalProject operation={modalProjectOptions.operation}
                    show={modalProjectOptions.isVisible}
                    onHide={() => setModalProjectOptions({isVisible: false})}/>
            }

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
                                            onClick={()=>handleClickItem(item)}
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
            {currentTab.id===3 && <Pages />}
            {/*</div>*/}
            
        </Container>
    )
}
