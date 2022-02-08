import { useState } from "react";
import { Button,Form, Modal } from "react-bootstrap";

export const TypeAuthorCreate=({what,show,onHide,add})=> {
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  
  const handleAddButton = () => {
    if (!!description) {
      add(name, description);
    }  else {
      add(name);
    }
    setName("");
    setDesc("");
    onHide();
  }
    
  return (
    <Modal 
      size={what === "стек" ? "sm": "md"}
           centered
          show={show}
      onHide={onHide}
      
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">
            Добавить {what} проекта
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
              <Form>
          <Form.Control placeholder={`Название ${what}а`} value={name} onChange={e=>setName(e.target.value)}/>
          {what === "стек" && <Form.Control as="textarea" rows={3} className={"mt-2"}
                                value={description} onChange={(e)=>setDesc(e.target.value)} placeholder={`Описание ${what}а`} />}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onHide}>Отмена</Button>
        <Button variant="outline-dark" onClick={handleAddButton}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
}
