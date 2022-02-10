import {$authHost,$host} from "./index";


export const addImageQuery= async (projectId,image) =>{
    const responce = await $authHost.post(`api/project/${projectId}/image`,image);
    return  responce.data;
};

export const fetchImageQuery = async (projectId) =>{
    const {data} = await $host.get(`api/project/${projectId}/image`);
    return data;
};

export  const deleteImageQuery = async (projectId,id)=>{
    const response=await  $authHost.delete(`api/project/${projectId}/image/${id}`);
    return response.data;
}