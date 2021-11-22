import {$host,$authHost} from "./index";

export const createType= async (type) =>{
    const responce = await $authHost.post("api/type",type);
    return  responce.data;
};

export const fetchTypes = async () =>{
    const {data} = await $host.get("api/type");
    return data;
};

export const createAuthor= async (author) =>{
    const responce = await $authHost.post("api/author",author);
    return  responce.data;
};

export const fetchAuthors = async () =>{
    const {data} = await $host.get("api/author");
    return data;
};

export const createProject= async (project) =>{
    const responce = await $authHost.post("api/project",project);
    return  responce.data;
};

export const fetchProjects = async () =>{
    const {data} = await $host.get("api/project");
    return data;
};

export const fetchProjectbyId = async (id) =>{
    const {data} = await $host.get("api/project/"+id);
    return data;
};

