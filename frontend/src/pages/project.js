import React, { useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

export const Project = () => {

    const project = {
        id: 1, name: "project1", description: "Описание dfdf;l dfkldkfl dfkldkfld dfkldfkld", start: "2021-04-01", finish: "2021-04-30", rating: 5,
        authorId: 1, typeId: 1, img: "",
        imgs: [{id:1,path:"1.png"},{id:2,path:"2.png"},{id:3,path:"3.png"},],
        stacks: [{ id: 1, name: "React", description: "dfdfd dfdfd dfddf" }, { id: 2, name: "Redux", description: "dfdfd dfdfd dfddf" }, { id: 3, name: "Express", description: "dfdfd dfdfd dfddf" }],
        ratings:  [{ id: 1, name: 5, description: "dfdfd dfdfd dfddf" }, { id: 2, name: 4, description: "dfdfd dfdfd dfddf" }, { id: 3, name: 3, description: "dfdfd dfdfd dfddf" }],
    };
    
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
            <Container>
                 
                
                <Row>
                    <Col md={6} style={{ cursor: "pointer" }} onClick={handleImageChange}>
                    <Image  width={"100%"} src={project.imgs[currentImg].path} alt={project.imgs[currentImg].path} />
                        <span >{">>"}</span>
                    
                    </Col>
                    <Col md={6}>
                        <h2>{project.name}</h2>
                        <h5>Rating: <Image width={25} src="/star.png" />{project.rating}</h5>
                        <h4>Stack</h4>
                        {project.stacks.map(item =>
                            <Row key={item.id}>
                                <Col sm={2}>{item.name}</Col>
                                <Col sm={4}>{item.description}</Col>
                            </Row>
                        )}
                    </Col>
                </Row>
                <Row>
                    <h4>Рецензии</h4>
                    {project.ratings.map(item =>
                        <Row key={item.id} className="my-2">
                            <Col sm={2}>{item.name} <Image width={40} src="/star.png" /></Col>
                            <Col className="d-flex align-items-center" sm={4}>{item.description}</Col>
                        </Row>
                    )}

                </Row>
            </Container>
        </div>
    );
}

