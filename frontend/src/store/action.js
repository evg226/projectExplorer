import {check, signin, signup} from "../http/userApi";
import {fetchAuthors, fetchProjectbyId, fetchProjects, fetchTypes} from "../http/deviceApi";
export const SET_USER = "USER::SET_USER";

export const setUser = (user) => {
    user.isAuth||localStorage.setItem("token","");
    return {
        type: SET_USER,
        payload:user
    }
}

export const SET_SELECTED_TYPE = "PROJECT::SET_SELECTED_TYPE";

export const setSeletedType = (type) => {
    return {
        type: SET_SELECTED_TYPE,
        payload:type
    }
}

export const SET_SELECTED_AUTHOR = "PROJECT::SET_SELECTED_AUTHOR";

export const setSeletedAuthor = (author) => {
    return {
        type: SET_SELECTED_AUTHOR,
        payload:author
    }
}

export const SET_SELECTED_PROJECT = "PROJECT::SET_SELECTED_PROJECT";

export const setSeletedProject = (project) => {
    return {
        type: SET_SELECTED_PROJECT,
        payload:project
    }
}

export const getAuth = (isSignin,email,password)=>async(dispatch)=>{
    let user;
    try{
        if (isSignin){
            user = await signin(email,password);
        } else {
            user = await signup(email,password);
        };
        dispatch(setUser({name:user.email,isAuth:true}));
    }catch (e) {
        console.log(e.message);
        console.log(e.response.data.message);
        dispatch(setUser({name:"",isAuth:false,error:e.response.data.message}));
    }
}

export const checkAuth = ()=>async(dispatch)=>{
    let user = {name: "", isAuth: false,loading:false};
    try{
        const response=await check();
        user= { name: response.email, isAuth: true,loading:false};
    } catch (e){
        console.log(e.message);
        console.log(e.response.data.message);
    }
    setTimeout(() => {
        dispatch(setUser(user));
    }, 1000);
}

export const ADD_TYPES = "PROJECTS::ADD_TYPES";

export const addTypes = (types)=>{
    return {
        type:ADD_TYPES,
        payload:types
    }
}

export const ADD_AUTHORS = "PROJECTS::ADD_AUTHORS";

export const addAuthors = (authors)=>{
    return {
        type:ADD_AUTHORS,
        payload:authors
    }
}

export const ADD_PROJECTS = "PROJECTS::ADD_PROJECTS";

export const addProjects = (projects)=>{
    return {
        type:ADD_PROJECTS,
        payload:projects
    }
}

export const loadTypes = () => async(dispatch)=>{
    let types=[];
    try {
        types = await fetchTypes();
    } catch (e) {
        console.log(e);
        console.log(e.response.data.message);
    } finally {
        dispatch(addTypes(types));
    }
}

export const loadAuthors = () => async(dispatch)=>{
    let authors=[];
    try {
        authors = await fetchAuthors();
    } catch (e) {
        console.log(e);
        console.log(e.response.data.message);
    } finally {
        dispatch(addAuthors(authors));
    }
}

export const loadProjects = () => async(dispatch)=>{
    let projects=[];
    try {
        projects = await fetchProjects();
    } catch (e) {
        console.log(e);
        console.log(e.response.data.message);
    } finally {
        dispatch(addProjects(projects.rows));
    }
}

export const appLoading = ()=>dispatch=>{
    dispatch(checkAuth());
    dispatch(loadTypes());
    dispatch(loadAuthors());
    dispatch(loadProjects());
}

export const loadProject=(id)=>async (dispatch) =>{
    dispatch(setSeletedProject({loading: true, error: "", loaded: false, data:{}}));
    let project={};
    try {
        const currentProject=await fetchProjectbyId(id);
        project={loading: false, error: "", loaded: true, data:currentProject?currentProject:{id,name:"Не найдено"}};
    }catch (e) {
        console.log(e);
        console.log(e.response.data.message);
        project={loading: false, error: e.response.data.message, loaded: false, data:{}};
    } finally {
        dispatch(setSeletedProject(project));
    }



}