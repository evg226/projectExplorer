import {$authHost} from "./index";
// import {Author} from "../../../backend/models/models";
const api="api/basket-project";

export const createBasketProject= async (projectId) =>{
    const responce = await $authHost.post(api,{projectId});
    return  responce.data;
};

export const fetchBasket = async () =>{
    const {data} = await $authHost.get(api);
    return data;
};

export  const deleteById = async (projectId)=>{
    const response=await  $authHost.delete(api,{data:{projectId}});
    return response.data;
}