import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {loadProjects, setSeletedType} from '../store/action';
import { getSelectedType, getTypes } from '../store/selectors';

export const TypeBar=()=> {
    const types = useSelector(getTypes, shallowEqual);
    const selectedType = useSelector(getSelectedType);
    const dispatch = useDispatch();
    const handleClickItem = (item) => {
        if (!item) {
            dispatch(setSeletedType({}));
        } else if(selectedType.id === item.id) {
            return;
        } else {
            dispatch(setSeletedType(item));
        }
        dispatch(loadProjects(1));
    }
    
    return (
            <ListGroup  className="pt-2">
                <ListGroup.Item
                    variant="secondary"
                    action
                    active={!selectedType.id}
                    onClick={()=>handleClickItem()}
                >
                    Все проекты
                </ListGroup.Item>
                {
                    types.map(item =>
                        <ListGroup.Item

                            variant="secondary"
                            action
                            active={item.id === selectedType.id}
                            key={item.id}
                            onClick={()=>handleClickItem(item)}
                        >
                            {item.name}
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
     );
}


