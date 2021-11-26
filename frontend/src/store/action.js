import {check, signin, signup} from "../http/userApi";
import {
    createAuthor,
    createProject,
    createType,
    fetchAuthors,
    fetchProjectbyId,
    fetchProjects,
    fetchTypes
} from "../http/deviceApi";
import {shallowEqual, useSelector} from "react-redux";
import {getLimit} from "./selectors";
import {createBasketProject, fetchBasket} from "../http/basket";
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

export const SET_ACTIVE_PAGE="PROJECTS::SET_ACTIVE_PAGE"

export const setPage = (page) => {
    return {
        type: SET_ACTIVE_PAGE,
        payload:page
    }
}

export const LOAD_BASKET="BASKET::ADD_BASKET"

export const addBasket = (basket) => {
    return {
        type: LOAD_BASKET,
        payload:basket
    }
}

export const loadBasket = () => async(dispatch) => {
    const basket=await fetchBasket();
    dispatch(addBasket(basket));
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
        dispatch(loadBasket());
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
        if(response.id)  {
            const basket=await fetchBasket();
            dispatch(loadBasket());
        };
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

export const INSERT_TYPE="PROJECTS::INSERT_TYPE";

export const insertType = (type)=>{
    return {
        type:INSERT_TYPE,
        payload:type
    }
}


export const ADD_AUTHORS = "PROJECTS::ADD_AUTHORS";

export const addAuthors = (authors)=>{
    return {
        type:ADD_AUTHORS,
        payload:authors
    }
}

export const INSERT_AUTHOR="PROJECTS::INSERT_AUTHOR";

export const insertAuthor = (author)=>{
    return {
        type:INSERT_AUTHOR,
        payload:author
    }
}

export const ADD_PROJECTS = "PROJECTS::ADD_PROJECTS";

export const addProjects = (projects)=>{
    return {
        type:ADD_PROJECTS,
        payload:projects
    }
}

export const INSERT_PROJECT="PROJECTS::INSERT_PROJECT";

export const insertProject = (project) => {
    return {
        type:INSERT_PROJECT,
        payload:project
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

export const insertTypeToDB =(typeName)=>async(dispatch)=>{
    try {
        const type = await createType(typeName);
        dispatch(insertType(type));
    } catch (e){
        console.log(e.message);
        console.log (e.response.data.message);
    }
}

export const insertAuthorToDB =(authorName)=>async(dispatch)=>{
    try {
        const author = await createAuthor(authorName);
        dispatch(insertAuthor(author));
    } catch (e){
        console.log(e.message);
        console.log (e.response.data.message);
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

export const loadProjects = (page=1) => async(dispatch,getState)=>{
    let projects=[];
    const limit=getState().projects.limit;
    const selectedType=getState().projects.selectedType;
    const selectedAuthor=getState().projects.selectedAuthor;
    try {
        projects = await fetchProjects(selectedType.id,selectedAuthor.id,page,limit);
    } catch (e) {
        console.log(e);
        console.log(e.response.data.message);
    } finally {
        dispatch(addProjects(projects));
        dispatch(setPage(page));
    }
}

export const insertProjectToDB =(project) => async (dispatch) => {
    const formData=new FormData();
    const {
        name,
        description,
        start,
        finish,
        typeId,
        authorId,
        stack,
        img,
        imgs
    } = project;
    formData.append("name",name);
    formData.append("description",description);
    formData.append("start",start);
    formData.append("finish",finish);
    formData.append("typeId",typeId);
    formData.append("authorId",authorId);
    formData.append("stack",JSON.stringify(stack));
    formData.append("icon",img);
    for(let key in imgs){
        formData.append("image",imgs[key]);
    }
    let newProject;
    try{
        newProject = await createProject(formData);
    } catch (e) {
        console.log(e);
        console.log(e.response.data.message);
    } finally {
        console.log(newProject);
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

export const insertBasketProject= (projectId) =>async (dispatch)=>{
    try {
        const basketProject= await createBasketProject(projectId);
        dispatch(loadBasket());
        console.log(basketProject);
    } catch (e) {
        console.log(e);
        console.log(e.response.data.message);
    }
}

