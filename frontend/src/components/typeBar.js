import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setSeletedType } from '../store/action';
import { getSelectedType, getTypes } from '../store/selectors';

export const TypeBar=()=> {
    const types = useSelector(getTypes, shallowEqual);
    const selectedType = useSelector(getSelectedType);
    const dispatch = useDispatch();
                
    return (
        <div>
            
            <ListGroup className="pt-2">
                {
                    types.map(item =>
                        <ListGroup.Item
                            variant="secondary"
                            action
                            active={item.id === selectedType.id}
                            className="11"
                            key={item.id}
                            onClick={()=>dispatch(setSeletedType(item))}
                        >
                            {item.name}
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
        </div>  
    );
}


