import {useEffect, useRef, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import { loadImageToDB,addImageToDB,deleteImageToDB} from "../store/action";
import {getImages} from "../store/selectors";
import {Image} from "react-bootstrap";
import {baseURL} from "../utils/constants";


export const ImageGallery=({projectId})=>{
    const dispatch=useDispatch();
    const inputRef=useRef(null);
    useEffect(()=>{
        dispatch(loadImageToDB(projectId));
    },[projectId,dispatch])
    const images=useSelector(getImages,shallowEqual);
    return (
        <div className={"imageGallery"}>
            <div className={"gallery__add"} onClick={()=>inputRef.current.click()}> Add </div>
            <input type={"file"} ref={inputRef} hidden accept={"image/*"}
                   onChange={(e)=>e.target.files[0]&&dispatch(addImageToDB(projectId,e.target.files[0]))}/>
            {!!images&&images.length&&images.map(item=>
                <div key={item.id} className={"gallery__img"}>
                    <Image src={baseURL+item.path} />
                    <div className={"gallery__del"} onClick={()=>dispatch(deleteImageToDB(projectId,item.id))}>X</div>
                </div>

            )}
        </div>
    )
}