import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Image, Row, Spinner} from 'react-bootstrap'
import {useParams} from "react-router";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getBasket, getSelectedProject, getUser} from "../store/selectors";
import {insertBasketProject, loadProject} from "../store/action";
import {baseURL} from "../utils/constants";

export const Project = () => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const projectItem=useSelector(getSelectedProject,shallowEqual);
    const project=projectItem.data;
    const basket= useSelector(getBasket,shallowEqual);
    const [isInBasket,setIsInBasket]=useState(false);
    const user=useSelector(getUser,shallowEqual);


    useEffect(()=>{
        dispatch(loadProject(id));
        if (user.isAuth) {
    const inBasket = !!(basket.projects.find(item => parseInt(id) === item.id));
            inBasket && setIsInBasket(true);
        }
    },[id,dispatch]);

    const [currentImg, setCurrentImg] = useState(0);

    const handleImageChange = () => {
        if (currentImg < project.img.length - 1) {
            setCurrentImg(prev=>prev+1);
        } else {
            setCurrentImg(0);
        }
    }

    const handleClickBasket=()=>{
        if(!isInBasket) {
            dispatch(insertBasketProject(id));
            setIsInBasket(user.isAuth);
        }
    }

    return (
        <div>
            {
                !projectItem.loaded ?
                    <Container>
                        <h4>Загрузка данных...</h4>
                        {
                            projectItem.loading?
                                <Spinner animation={"border"} variant={"secondary"} />
                                :
                                projectItem.error
                        }
                    </Container>
                    :
                    <Container>
                        <h2 className="my-3  text-center">{project.name}</h2>
                        <Row>
                            <Col md={6} style={{cursor: "pointer"}} onClick={handleImageChange}>
                                <Image width={"100%"}
                                       src={project.img && baseURL+project.img[currentImg].path}
                                       alt={project.img?project.img[currentImg].name:"No images in this"}/>
                                <span>{">>"}</span>
                            </Col>
                            <Col md={6}>
                                <h5>{project.description}</h5>
                                <h5>Rating: <Image width={25} src="/star.png"/>{project.rating}</h5>
                                <Button
                                    variant={"secondary"}
                                    className={"my-3"}
                                    onClick={handleClickBasket}
                                    >{isInBasket?"Удалить из избранных":"Добавить в избранное"}</Button>
                                <h4>Stack</h4>
                                {project.stack && project.stack.map(item =>
                                    <Row key={item.id}>
                                        <Col sm={2}>{item.name}</Col>
                                        <Col sm={4}>{item.description}</Col>
                                    </Row>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <h4>Рецензии</h4>
                            {project.rating && project.rating.map(item =>
                                <Row key={item.id} className="my-2">
                                    <Col sm={2}>{item.name} <Image width={40} src="/star.png"/></Col>
                                    <Col className="d-flex align-items-center" sm={4}>{item.description}</Col>
                                </Row>
                            )}

                        </Row>
                    </Container>
            }
        </div>
    );
}

