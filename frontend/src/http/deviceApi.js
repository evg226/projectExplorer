import {$host,$authHost} from "./index";
// import {Author} from "../../../backend/models/models";

export const createType= async (typeName) =>{
    const responce = await $authHost.post("api/type",{name:typeName});
    return  responce.data;
};

export const fetchTypes = async () =>{
    const {data} = await $host.get("api/type");
    return data;
};

export const createAuthor= async (authorName) =>{
    const responce = await $authHost.post("api/author",{name:authorName});
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

export const fetchProjects = async (typeId,authorId,page,limit=5) =>{
    const {data} = await $host.get("api/project",{params:{
           typeId,authorId,page,limit
        }});
    return data;
};

export const fetchProjectbyId = async (id) =>{
    const {data} = await $host.get("api/project/"+id);
    return data;
};

