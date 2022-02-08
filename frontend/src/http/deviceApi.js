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

export const updateProjectQuery= async (project) =>{
    const responce = await $authHost.put("api/project/"+project.id,project);
    return  responce.data;
};

export const deleteProjectQuery= async (id) =>{
    const responce = await $authHost.delete("api/project/"+id);
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

export const deleteType = async (id) =>{
    const responce = await $authHost.delete("api/type",{data:{id}});
    return  responce.data;
};

export const updType = async (id,name) =>{
    const responce = await $authHost.put  ("api/type",{id,name});
    return  responce.data;
};

export const deleteAuthor = async (id) =>{
    const responce = await $authHost.delete("api/author",{data:{id}});
    return  responce.data;
};

export const updAuthor = async (id,name) =>{
    const responce = await $authHost.put  ("api/author",{id,name});
    return  responce.data;
};

export const createStackQuery= async (name,description,projectId) =>{
    const responce = await $authHost.post(`api/project/${projectId}/stack/`,{name,description});
    return  responce.data;
};

export const deleteStackQuery = async (id,projectId) =>{
    const responce = await $authHost.delete(`api/project/${projectId}/stack/${id}`);
    return  responce.data;
};