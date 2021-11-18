import { useState } from "react";
import { Button,Form, Modal } from "react-bootstrap";

export const TypeAuthorCreate=({what,show,onHide,add})=> {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  
  const handleAddButton = () => {
    if (!!desc) {
      add(name, desc);
      setName("");
      setDesc("");
    };
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
        {name}
        {desc}
              <Form>  
          <Form.Control placeholder={`Введите название ${what}а проекта`} value={name} onChange={e=>setName(e.target.value)}/>
          {what === "стек" && <Form.Control as="textarea" rows={3}
                                value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder={`Введите описание ${what}а проекта`} />}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onHide}>Отмена</Button>
        <Button variant="outline-dark" onClick={handleAddButton}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
}
