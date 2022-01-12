import React, {useEffect, useState} from 'react'
import {Button, Carousel, Col, Container, Image, Row, Spinner} from 'react-bootstrap'
import {useNavigate, useParams} from "react-router";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getBasket, getSelectedProject} from "../store/selectors";
import {deleteFromBasketDB, insertBasketProject, insertRateToDB, loadProject} from "../store/action";
import {baseURL, SELECTED_DESK} from "../utils/constants";
import {Rating} from "../components/modals/rating";

export const Project = () => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const projectItem=useSelector(getSelectedProject,shallowEqual);
    const project=projectItem.data;
    const basket=useSelector(getBasket,shallowEqual);
    const [isRatingVisible,setRatingVisible]=useState(false);
    useEffect(()=>{
        dispatch(loadProject(id));
    },[id,dispatch,basket]);

    const navigate=useNavigate();

    const handleClickBasket=()=>{
        if(!project.isInBasket) {
            dispatch(insertBasketProject(id));
            // setIsInBasket(user.isAuth);
        } else {
            dispatch(deleteFromBasketDB(id));
            navigate(SELECTED_DESK);
        }
    }

    const handleInsertRate =(rate,description)=>{
        dispatch(insertRateToDB({rate,description,projectId:id}));
    }

    return (
        <div>
            {
                !projectItem.loaded||!project||!project.id?
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
                            <Col md={6} >
                                <Carousel>
                                    {
                                        project.img && project.img.map(imageItem=>
                                        <Carousel.Item key={imageItem.id}>
                                            <img
                                                className="d-block w-100"
                                                src={baseURL+imageItem.path}
                                                alt={baseURL+imageItem.name}
                                            />
                                            <Carousel.Caption >
                                                <h4>{imageItem.name}</h4>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        )}
                                </Carousel>
                            </Col>
                            <Col md={6} className={"p-4 d-flex flex-column justify-content-between"}>
                                <div>
                                <h5>{project.description}</h5>
                                <h4>Stack</h4>
                                {project.stack && project.stack.map(item =>
                                    <Row key={item.id}>
                                        <Col sm={2}>{item.name}</Col>
                                        <Col sm={4}>{item.description}</Col>
                                    </Row>
                                )}
                                    <h5 className={"my-2"}>Rating: <Image width={25} src="/star.png"/>{project.rating}</h5>
                                </div>
                                <div className={"d-flex flex-column align-items-start"}>
                                <Button
                                variant={"secondary"}
                                className={"mt-3"}
                                onClick={handleClickBasket}
                            >{project.isInBasket?"Удалить из избранных":"Добавить в избранное"}</Button>
                                <Button
                                    variant={"secondary"}
                                    className={"mt-2 mb-3"}
                                    onClick={()=>setRatingVisible(true)}
                                >Оставить отзыв</Button>
                                <Rating show={isRatingVisible} onOk={handleInsertRate} onHide={()=>setRatingVisible(false)}/>
                                </div>
                            </Col>
                        </Row>
                        <Row className={"m-2"}>
                            <h4 className={"text-center"}>Рецензии</h4>
                            {project.rates && project.rates.map(item =>
                                <Row key={item.id} className="mt-2 text-secondary">
                                    <Col xs={4}  sm={3} className={"d-flex align-items-center"}>Автор {item.user.email} </Col>
                                    <Col xs={4} sm={3} className={"d-flex align-items-center"}>Оценка {item.rate} <Image width={40} src="/star.png"/></Col>
                                    <Row>
                                        <Col className="d-flex align-items-center" xs={12}>{item.description}</Col>
                                    </Row>
                                </Row>
                            )}

                        </Row>
                    </Container>
            }
        </div>
    );
}


