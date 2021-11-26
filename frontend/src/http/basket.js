import {$authHost} from "./index";
// import {Author} from "../../../backend/models/models";

export const createBasketProject= async (projectId) =>{
    const responce = await $authHost.post("api/basket-project",{projectId});
    return  responce.data;
};

export const fetchBasket = async () =>{
    const {data} = await $authHost.get("api/basket-project");
    return data;
};