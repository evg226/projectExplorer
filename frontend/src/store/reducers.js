import {
    ADD_AUTHORS,
    ADD_PROJECTS,
    ADD_TYPES, INSERT_AUTHOR, INSERT_PROJECT, INSERT_TYPE, SET_ACTIVE_PAGE,
    SET_SELECTED_AUTHOR,
    SET_SELECTED_PROJECT,
    SET_SELECTED_TYPE,
    SET_USER
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
    limit:2

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
        default:
            return state;

    }
};


