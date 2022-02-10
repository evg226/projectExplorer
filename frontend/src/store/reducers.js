import {
    ADD_AUTHORS, ADD_IMAGE,
    ADD_PROJECTS,
    ADD_TO_BASKET,
    ADD_TYPES,
    DELETE_FROM_BASKET, DELETE_IMAGE,
    INSERT_AUTHOR,
    INSERT_PROJECT,
    INSERT_TYPE,
    LOAD_BASKET, LOAD_IMAGES, loadImages, REMOVE_AUTHOR,
    REMOVE_TYPE,
    SET_ACTIVE_PAGE,
    SET_SELECTED_AUTHOR,
    SET_SELECTED_PROJECT,
    SET_SELECTED_TYPE,
    SET_USER, UPDATE_AUTHOR,
    UPDATE_TYPE
} from "./action";

const initialUser = {
    name:"",
    isAuth: false,
    error:"",
    loading:true
};

export const reducerUser = (state = initialUser, action) => {
    switch (action.type) {
        case SET_USER:
            return action.payload
        default:
            return state
    }
};

export const initialProjects = {
    authors: [],
    types: [],
    projects: [],
    selectedType: {},
    selectedAuthor: {},
    selectedProject:{
        loading:false, error:"",loaded:false,data:{}
    },
    page:1,
    totalCount:0,
    limit:9
}

export const reducerBasket = (state={basket:{}},action) => {
    switch (action.type) {
        case LOAD_BASKET:
            return {
                basketId:action.payload.basketId,
                projects:action.payload.projects,
            }
        case DELETE_FROM_BASKET:
            const projects=state.projects.filter(item=>item.id!==parseInt(action.payload));
            return {
                ...state,
                projects
            }
        case ADD_TO_BASKET:
             return {
                ...state,
                projects:[
                    ...state.projects,
                    action.payload
                ]
            }
        default:
            return state
    }
}

export const reducerProjects=(state = initialProjects , action) => {
    switch (action.type) {
        case SET_SELECTED_TYPE:
            return {
                ...state,
                selectedType:action.payload
            };
        case SET_SELECTED_AUTHOR:
            return {
                ...state,
                selectedAuthor:action.payload
            };
        case SET_SELECTED_PROJECT:
            return {
                ...state,
                selectedProject:action.payload
            };
        case ADD_TYPES:
            return {
                ...state,
                types:action.payload
            };
        case INSERT_TYPE:
            return {
                ...state,
                types: [
                    ...state.types,
                    action.payload
                ]
            }
        case ADD_AUTHORS:
            return {
                ...state,
                authors:action.payload
            };
        case INSERT_AUTHOR:
            return {
                ...state,
                authors: [
                    ...state.authors,
                    action.payload
                ]
            };
        case ADD_PROJECTS:
            return {
                ...state,
                projects:action.payload.rows,
                totalCount: action.payload.count
            };
        case INSERT_PROJECT:
            return {
               ...state,
                projects: [
                    ...state.projects,
                    action.payload
                ]

            };
        case SET_ACTIVE_PAGE:
            return {
                ...state,
                activePage:action.payload
            }
        case UPDATE_TYPE:{
            const types=state.types.filter(item=>item.id!==parseInt(action.payload.id));
            return {
                ...state,
                types:[
                    ...types,
                    action.payload
                ]
            }
        }
        case REMOVE_TYPE:{
            const types=state.types.filter(item=>item.id!==parseInt(action.payload));
            return {
                ...state,
                types
            }
        }
        case UPDATE_AUTHOR:{
            const authors=state.authors.filter(item=>item.id!==parseInt(action.payload.id));
            return {
                ...state,
                authors:[
                    ...authors,
                    action.payload
                ]
            }
        }
        case REMOVE_AUTHOR:{
            const authors=state.authors.filter(item=>item.id!==parseInt(action.payload));
            return {
                ...state,
                authors
            }
        }
        default:
            return state;
    }
};

export const reducerImage=(state={},action)=>{
    switch (action.type){
        case LOAD_IMAGES:
            return action.payload
        case ADD_IMAGE:
            return [...state,action.payload]
        case DELETE_IMAGE:
            return state.filter(item=>item.id!==action.payload)
        default:
            return state
    }
}


