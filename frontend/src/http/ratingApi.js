import {$authHost} from "./index";

export const createRating = async ({projectId,rate,description}) =>{
    const responce = await $authHost.post("api/rating",{projectId,rate,description});
    return  responce.data;
};

// export const fetchBasket = async () =>{
//     const {data} = await $authHost.get("api/basket-project");
//     return data;
// };