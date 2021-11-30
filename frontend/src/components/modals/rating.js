import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

export const Rating = ({show, onHide,onOk}) => {
    const [desc,setDesc]=useState("");
    const [rate,setRate]=useState(5);

    const handleClickOk=()=>{
        onOk(rate,desc);
        setDesc("");
        setRate(5);
        onHide();
    }
    return (
        <Modal
            size={"md"}
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить отзыв
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Оценка : {rate}</Form.Label>
                    <Form.Range max={5} value={rate} onChange={(e)=>setRate(e.target.value)}/>
                    <Form.Control as="textarea" rows={3} className={"mt-2"}
                                  value={desc}
                                  onChange={(e)=>setDesc(e.target.value)}
                                  placeholder={`Текст отзыва`} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>Отмена</Button>
                <Button variant="outline-dark" onClick={handleClickOk}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}

