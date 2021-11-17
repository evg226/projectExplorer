import { useState } from "react";
import { Button,Col,Dropdown,Form, FormControl, Modal, Row } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { getAuthors, getTypes } from "../../store/selectors";
import { TypeAuthorCreate } from "./typeAuthor";

export const ProjectCreate = ({ show, onHide }) => {
    const types = useSelector(getTypes, shallowEqual);
    const authors = useSelector(getAuthors, shallowEqual);
    
    const [stackVisible, setStackVisible] = useState(false);

    const [stacks, setStacks] = useState([]);
    const addStack = (name, desc) => {
        setStacks(prev => [...prev, { id: Date.now(), name, desc }]);
    };
    const removeStack = (id) => {
        setStacks(prev => prev.filter(item => item.id !== id));
    }

  return (
      <Modal
        size="lg"
          centered
          show={show}
          onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Добавить проект
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
              <Form>
                <Form.Control className="mb-2" placeholder={`Введите название проекта`} />
                  <Form.Control
                      as="textarea"
                      rows={3}
                      className="mb-2"
                      placeholder={`Введите описание проекта`}
                  />
                  <div className="d-flex my-2">
                      
                  <Dropdown>
                      <Dropdown.Toggle variant="secondary">Выберите автора</Dropdown.Toggle>
                      <Dropdown.Menu>
                          {authors.map(item =>
                              <Dropdown.Item key={item.id}>{item.name}</Dropdown.Item>
                              )}
                      </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown className="mx-3">
                      <Dropdown.Toggle variant="secondary">Выберите тип</Dropdown.Toggle>
                      <Dropdown.Menu>
                          {types.map(item =>
                              <Dropdown.Item key={item.id}>{item.name}</Dropdown.Item>
                              )}
                      </Dropdown.Menu>
                  </Dropdown>

                  </div>
                  <div className="d-flex my-2 align-items-center">
                      <Form.Label className="my-0 text-secondary">Начало</Form.Label>
                      <Form.Control type="date" className="mx-2"/>
                      <Form.Label className="mx-1 text-secondary my-0">Конец</Form.Label>
                      <Form.Control type="date" className="mx-2" />
                  </div>
                  <div className="d-flex my-2 align-items-center">
                      <Form.Label className="my-0 text-secondary me-2">Иконка</Form.Label>
                      <Form.Control className="ms-5" type="file"/>
                  </div>
                  <div className="d-flex my-2 align-items-center">
                      <Form.Label className="my-0 text-secondary">Изображения</Form.Label>
                      <Form.Control className="ms-2" multiple type="file"/>
                  </div>
                  
                  <div className="d-flex my-2 align-items-center">
                      <Button variant="secondary" onClick={()=>setStackVisible(true)}>Добавить стек</Button>
                  </div>
                  {stacks.length>0 &&
                      <div className="my-2">
                          <Row className="d-flex">
                              <Col sm={1}> </Col>
                              <Col sm={3}>Стек</Col>
                              <Col sm={6}>Описание</Col>
                          </Row>
                          {stacks.map(item =>
                              <Row key={item.id} className="d-flex align-items-center">
                                  <Col sm={1}>
                                      <Button style={{ height: "90%" }} className="px-2 py-0" variant="outline-secondary"
                                          onClick={() => removeStack(item.id)}>
                                          x</Button>
                                  </Col>
                                  <Col className="text-secondary" sm={3}>{item.name}</Col>
                                  <Col className="text-secondary" sm={6}>{item.desc}</Col>
                              
                              </Row>
                          )}
                      </div>
                  }
                  <TypeAuthorCreate  what="стек" add={addStack} show={stackVisible} onHide={()=>setStackVisible(false)} />
                  
                  
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onHide}>Отмена</Button>
        <Button variant="outline-dark" onClick={onHide}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
}
