import { useState} from "react";
import { Button,Col,Form,  Modal, Row } from "react-bootstrap";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getAuthors, getSelectedProject, getTypes} from "../../store/selectors";
import { TypeAuthorCreate } from "./typeAuthor";
import {createStackToDB, deleteStackToDB, insertProjectToDB} from "../../store/action";

export const ModalProject = ({ show, onHide,operation }) => {
    const dispatch=useDispatch();
    const project=useSelector(getSelectedProject,shallowEqual).data;

    const types = useSelector(getTypes, shallowEqual);
    const authors = useSelector(getAuthors, shallowEqual);

    const [name,setName]=useState(project.name||"");
    const [description,setDescription]=useState(project.description);

    const [icon,setIcon]=useState(project.icon);
    const handleSelectIcon=(e)=>{
        setIcon(e.target.files[0]);
    }
    const [images,setImages]=useState([]);
    const handleSelectImages=(e)=>{
        setImages(e.target.files);
    }

    const [selectedType,setSelectedType]=useState(project.typeId);
    const [selectedAuthor,setSelectedAuthor]=useState(project.authorId);

    const [startDate,setStartDate]=useState((project.start?project.start:new Date().toISOString()).split('T')[0]);
    const handleChangeStartDate=(e)=>{
        setStartDate(e.target.value);
    }
    const [endDate,setEndDate]=useState((project.finish?project.finish:new Date().toISOString()).split('T')[0]);
    const handleChangeEndDate=(e)=>{
        setEndDate(e.target.value);
    }

    const [stackVisible, setStackVisible] = useState(false);
    const [stacks, setStacks] = useState(   project.stack||[]);

    const stackView=(operation==="Добавить")?stacks:(project.stack||[]);
    const addStack = (name, desc) => {
        if (operation==="Изменить")
            dispatch(createStackToDB(name,desc,project.id));
        else
            setStacks(prev => [...prev, { id: Date.now(), name, description:desc }]);
    };
    const removeStack = (id) => {
        if (operation==="Изменить")
            dispatch(deleteStackToDB(id,project.id));
        else
            setStacks(prev => prev.filter(item => item.id !== id));
    }

    const handleAddProject = ()=>{
        const newProject={
            name,
            description,
            start:startDate,
            finish:endDate,
            typeId:selectedType,
            authorId:selectedAuthor,
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
            {operation} проект
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
                      <Form.Select variant={"secondary"} value={selectedAuthor} onChange={e => setSelectedAuthor(e.target.value)}>
                          <option value={0}>Автор</option>
                          {authors.map(item =>
                              <option key={item.id} value={item.id}>{item.name}</option>
                          )}
                      </Form.Select>
                      <Form.Select variant={"secondary"} value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                          <option value={0}>Тип</option>
                          {types.map(item =>
                              <option key={item.id} value={item.id}>{item.name}</option>
                          )}
                      </Form.Select>
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
                  {stackView.length>0 &&
                      <div className="my-2">
                          <Row className="d-flex p-1">
                              <Col sm={1}> </Col>
                              <Col sm={3}>Стек</Col>
                              <Col sm={6}>Описание</Col>
                          </Row>
                          {stackView.map(item =>
                              <Row key={item.id} className="d-flex align-items-center border-top p-1">
                                  <Col sm={1}>
                                      <Button style={{ height: "90%" }} className="px-2 py-0" variant="outline-secondary"
                                          onClick={() => removeStack(item.id)}>
                                          x</Button>
                                  </Col>
                                  <Col className="text-secondary" sm={3}>{item.name}</Col>
                                  <Col className="text-secondary" sm={6}>{item.description}</Col>
                              
                              </Row>
                          )}
                      </div>
                  }
                  <TypeAuthorCreate  what="стек" add={addStack} show={stackVisible} onHide={()=>setStackVisible(false)} />
                  
                  
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onHide}>Отмена</Button>
        <Button variant="outline-dark" onClick={handleAddProject}>{operation}</Button>
      </Modal.Footer>
    </Modal>
  );
}
