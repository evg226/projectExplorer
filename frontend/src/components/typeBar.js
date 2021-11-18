import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setSeletedType } from '../store/action';
import { getSelectedType, getTypes } from '../store/selectors';

export const TypeBar=()=> {
    const types = useSelector(getTypes, shallowEqual);
    const selectedType = useSelector(getSelectedType);
    const dispatch = useDispatch();
    const handleClickItem = (item) => {
        if (selectedType.id !== item.id) {
            dispatch(setSeletedType(item));
        } else {
            dispatch(setSeletedType({}));
        }
    }
    
    return (
        <div>
            
            <ListGroup className="pt-2">
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
        </div>  
    );
}


