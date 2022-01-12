import {check, signin, signup} from "../http/userApi";
import {
    createAuthor,
    createProject,
    createType,
    fetchAuthors,
    fetchProjectbyId,
    fetchProjects,
    fetchTypes,
    deleteType, deleteAuthor, updType, updAuthor
} from "../http/deviceApi";
import {createBasketProject, deleteById, fetchBasket} from "../http/basket";
import {createRating} from "../http/ratingApi";
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


export const DELETE_FROM_BASKET="BASKET::DELETE_BY_ID";

export const deleteFromBasket=(projectId)=>{
    return {
        type: DELETE_FROM_BASKET,
        payload: projectId
    }
}

export const ADD_TO_BASKET="BASKET::ADD_TO_BASKET";

export const addToBasket=(project)=>{
    return {
        type:ADD_TO_BASKET,
        payload: project
    }
}

export const loadBasket = () => async(dispatch) => {
    const basket=await fetchBasket();
    console.log(basket);
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
        dispatch(setUser({name:user.email,isAuth:true,role:user.role}));
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
        user= { name: response.email, isAuth: true,loading:false,role:response.role};
        if(response.id)  {
            // const basket=await fetchBasket();
            dispatch(loadBasket());
        };
    } catch (e){
        console.log(e.message);
        console.log(e.response.data.message);
    }
    dispatch(setUser(user));
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

export const UPDATE_TYPE="PROJECTS_UPDATE_TYPE";
export const updateType = (type)=>{
    return {
        type:UPDATE_TYPE,
        payload:type
    }
}
export const updateTypeToDB =(id,typeName)=>async(dispatch)=>{
    try {
        const result = await updType(id,typeName);
        if (result[0]) dispatch(updateType({id,name:typeName}));
    } catch (e){
        console.log(e.message);
        console.log (e.response.data.message);
    }
}

export const REMOVE_TYPE="PROJECTS_REMOVE_TYPE";
export const removeType = (typeId)=>{
    return {
        type:REMOVE_TYPE,
        payload:typeId
    }
}
export const removeTypeToDB =(id)=>async(dispatch)=>{
    try {
        const result = await deleteType(id);
        if (result) dispatch(removeType(id));
    } catch (e){
        console.log(e.message);
        console.log (e.response.data.message);
    }
}

export const UPDATE_AUTHOR="PROJECTS_UPDATE_AUTHOR";
export const updateAuthor = (type)=>{
    return {
        type:UPDATE_AUTHOR,
        payload:type
    }
}
export const updateAuthorToDB =(id,authorName)=>async(dispatch)=>{
    try {
        const result = await updAuthor(id,authorName);
        console.log(result);
        if (result[0]) dispatch(updateAuthor({id,name:authorName}));
    } catch (e){
        console.log(e.message);
        console.log (e.response.data.message);
    }
}

export const REMOVE_AUTHOR="PROJECTS_REMOVE_AUTHOR";
export const removeAuthor = (authorId)=>{
    return {
        type:REMOVE_AUTHOR,
        payload:authorId
    }
}
export const removeAuthorToDB =(id)=>async(dispatch)=>{
    try {
        const result = await deleteAuthor(id);
        if (result) dispatch(removeAuthor(id));
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

export const loadProject=(id)=>async (dispatch,getState) =>{
    dispatch(setSeletedProject({loading: true, error: "", loaded: false, data:{}}));
    let project={};
    try {

        const currentProject=await fetchProjectbyId(id);
        const basket=getState().basket;
        const isInBasket=basket.projects && !!basket.projects.find(item=>item.id&&(item.id===parseInt(id)))?true:false;

        project={loading: false, error: "", loaded: true, data:currentProject?{...currentProject,isInBasket}:{id,name:"Не найдено"}};
    }catch (e) {
        console.log(e);
        e.response&&console.log(e.response.data.message);
        project = {loading: false, error: e.response.data.message, loaded: false, data: {}};
    } finally {
        dispatch(setSeletedProject(project));

    }
}



export const insertRateToDB= (rateItem) =>async (dispatch)=>{
    try {
        await createRating(rateItem);
        dispatch(loadProject(rateItem.projectId));
    } catch (e) {
        console.log(e);
        console.log(e.response.data.message);
    }
}

export const insertBasketProject= (projectId) =>async (dispatch,getState)=>{
    try {
        await createBasketProject(projectId);
        const projects=getState().projects.projects;
        const project=projects&&projects.find(item=>item.id===parseInt(projectId));
        dispatch(addToBasket(project));

    } catch (e) {
        console.log(e);
        console.log(e.response.data.message);
    }
}

export const deleteFromBasketDB = (projectId) => async (dispatch) => {
    try {
        const deleteResult = await deleteById(projectId);
        console.log(deleteResult===1?`Удален ${projectId}`:`Не найден ${projectId}`);
        if (deleteResult) dispatch (deleteFromBasket(projectId));

    } catch (e) {
        console.log(e);
        console.log(e.response.data.message);
    }
}


