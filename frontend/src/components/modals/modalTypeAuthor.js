import { useState } from "react";
import { Button,Form, Modal } from "react-bootstrap";
import {useDispatch} from "react-redux";
import {
    insertAuthorToDB,
    insertTypeToDB,
    updateTypeToDB,
    removeTypeToDB,
    updateAuthorToDB,
    removeAuthorToDB
} from "../../store/action";

export const ModalTypeAuthor=({show,onHide,currentTab,operation,selectedItem})=> {
    const [name, setName] = useState(operation==="Добавить"?"":selectedItem.name);
    const dispatch=useDispatch();
    const handleOkButton = () => {

        switch (operation){
            case "Добавить":
                if (currentTab.name==="Типы") {
                    dispatch(insertTypeToDB(name))
                } else if (currentTab.name==="Авторы"){
                    dispatch(insertAuthorToDB(name));
                };
                break;
            case "Изменить":
                if (currentTab.name==="Типы") {
                    dispatch(updateTypeToDB(selectedItem.id,name))
                } else if (currentTab.name==="Авторы"){
                    dispatch(updateAuthorToDB(selectedItem.id,name));
                };
                break;
            case "Удалить":
                if (currentTab.name==="Типы") {
                    dispatch(removeTypeToDB(selectedItem.id))
                } else if (currentTab.name==="Авторы"){
                    dispatch(removeAuthorToDB(selectedItem.id));
                };
                break;
                default:
        }
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
                    {operation} {currentTab.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder={`Название`}  value={name} onChange={e=>setName(e.target.value)}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>Отмена</Button>
                <Button variant="outline-dark" onClick={handleOkButton}>{operation}</Button>
            </Modal.Footer>
        </Modal>
    );
}
