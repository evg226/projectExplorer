import { useState } from "react";
import { Button,Col,Dropdown,Form,  Modal, Row } from "react-bootstrap";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import { getAuthors, getTypes } from "../../store/selectors";
import { TypeAuthorCreate } from "./typeAuthor";
import {insertProjectToDB} from "../../store/action";

export const ProjectCreate = ({ show, onHide }) => {

    const types = useSelector(getTypes, shallowEqual);
    const authors = useSelector(getAuthors, shallowEqual);
    const dispatch=useDispatch();

    const [name,setName]=useState("");
    const [description,setDescription]=useState("");

    const [icon,setIcon]=useState();
    const handleSelectIcon=(e)=>{
        setIcon(e.target.files[0]);
    }
    const [images,setImages]=useState([]);
    const handleSelectImages=(e)=>{
        setImages(e.target.files);
    }

    const [selectedType,setSelectedType]=useState({});
    const [selectedAuthor,setSelectedAuthor]=useState({});

    const [startDate,setStartDate]=useState((new Date()).toISOString().split('T')[0]);
    const handleChangeStartDate=(e)=>{
        setStartDate(e.target.value);
    }
    const [endDate,setEndDate]=useState((new Date()).toISOString().split('T')[0]);
    const handleChangeEndDate=(e)=>{
        setEndDate(e.target.value);
    }

    const [stackVisible, setStackVisible] = useState(false);
    const [stacks, setStacks] = useState([]);
    const addStack = (name, desc) => {
        setStacks(prev => [...prev, { id: Date.now(), name, desc }]);
    };
    const removeStack = (id) => {
        setStacks(prev => prev.filter(item => item.id !== id));
    }

    const handleAddProject = ()=>{
        const newProject={
            name,
            description,
            start:startDate,
            finish:endDate,
            typeId:selectedType.id,
            authorId:selectedAuthor.id,
            stack:stacks,
            img:icon,
            imgs:images
        };
        dispatch(insertProjectToDB(newProject));
        onHide();
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
                  <Form.Control className="mb-2"
                                placeholder={`Введите название проекта`}
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                  />
                  <Form.Control
                      as="textarea"
                      rows={3}
                      className="mb-2"
                      placeholder={`Введите описание проекта`}
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                  />
                  <div className="d-flex my-2">
                      
                  <Dropdown>
                      <Dropdown.Toggle variant="secondary">{selectedAuthor.name || "Выберите автора"}</Dropdown.Toggle>
                      <Dropdown.Menu>
                          {authors.map(item =>
                              <Dropdown.Item key={item.id} onClick={()=>setSelectedAuthor(item)}>{item.name}</Dropdown.Item>
                              )}
                      </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown className="mx-3">
                      <Dropdown.Toggle variant="secondary">{selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                      <Dropdown.Menu>
                          {types.map(item =>
                              <Dropdown.Item key={item.id} onClick={()=>setSelectedType(item)}>{item.name}</Dropdown.Item>
                              )}
                      </Dropdown.Menu>
                  </Dropdown>

                  </div>
                  <div className="d-flex my-2 align-items-center">
                      <Form.Label className="my-0 text-secondary">Начало</Form.Label>
                      <Form.Control type="date" className="mx-2"
                                    value={startDate}
                                    onChange={handleChangeStartDate}
                      />
                      <Form.Label className="mx-1 text-secondary my-0">Конец</Form.Label>
                      <Form.Control type="date" className="mx-2"
                                    value={endDate}
                                    onChange={handleChangeEndDate}
                      />
                  </div>
                  <div className="d-flex my-2 align-items-center">
                      <Form.Label className="my-0 text-secondary me-2">Иконка</Form.Label>
                      <Form.Control className="ms-5"
                                    type="file"
                                    onChange={handleSelectIcon}
                      />
                  </div>
                  <div className="d-flex my-2 align-items-center">
                      <Form.Label className="my-0 text-secondary">Изображения</Form.Label>
                      <Form.Control className="ms-2"
                                    multiple
                                    type="file"
                                    onChange={handleSelectImages}
                      />
                  </div>
                  
                  <div className="d-flex my-2 align-items-center">
                      <Button variant="secondary" onClick={()=>setStackVisible(true)}>Добавить стек</Button>
                  </div>
                  {stacks.length>0 &&
                      <div className="my-2">
                          <Row className="d-flex p-1">
                              <Col sm={1}> </Col>
                              <Col sm={3}>Стек</Col>
                              <Col sm={6}>Описание</Col>
                          </Row>
                          {stacks.map(item =>
                              <Row key={item.id} className="d-flex align-items-center border-top p-1">
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
        <Button variant="outline-dark" onClick={handleAddProject}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
}
