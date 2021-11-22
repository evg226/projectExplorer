import React, {useEffect, useState} from 'react'
import {Col, Container, Image, Row, Spinner} from 'react-bootstrap'
import {useParams} from "react-router";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getSelectedProject} from "../store/selectors";
import { loadProject} from "../store/action";

export const Project = () => {


    const {id}=useParams();
    const dispatch=useDispatch();
    const project=useSelector(getSelectedProject,shallowEqual);
    // console.log(project);
    // console.log(id);
    useEffect(()=>{
        dispatch(loadProject(id));
    },[id]);

    const [currentImg, setCurrentImg] = useState(0);

    const handleImageChange = () => {
        if (currentImg < project.imgs.length - 1) {
            setCurrentImg(prev=>prev+1);
        } else {
            setCurrentImg(0);
        }
    }

    return (
        <div>
            {
                !project.loaded ?
                    <Container>
                        <h4>Загрузка данных...</h4>
                        {
                            project.loading?
                                <Spinner animation={"border"} variant={"secondary"} />
                                :
                                project.error
                        }
                    </Container>
                    :
                    <Container>
                        <Row>
                            <Col md={6} style={{cursor: "pointer"}} onClick={handleImageChange}>
                                <Image width={"100%"} src={project.data.imgs&&project.data.imgs[currentImg].path}
                                       alt={project.data.imgs?project.data.imgs[currentImg].path:"No images in this"}/>
                                <span>{">>"}</span>

                            </Col>
                            <Col md={6}>
                                <h2>{project.data.name}</h2>
                                <h5>Rating: <Image width={25} src="/star.png"/>{project.data.rating}</h5>
                                <h4>Stack</h4>
                                {project.data.stacks && project.data.stacks.map(item =>
                                    <Row key={item.id}>
                                        <Col sm={2}>{item.name}</Col>
                                        <Col sm={4}>{item.description}</Col>
                                    </Row>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <h4>Рецензии</h4>
                            {project.data.ratings && project.data.ratings.map(item =>
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

