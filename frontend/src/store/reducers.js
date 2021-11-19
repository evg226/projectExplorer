import {ADD_AUTHORS, ADD_PROJECTS, ADD_TYPES, SET_SELECTED_AUTHOR, SET_SELECTED_TYPE, SET_USER} from "./action";

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
        case ADD_TYPES:
            return {
                ...state,
                types:action.payload
            };
        case ADD_AUTHORS:
            return {
                ...state,
                authors:action.payload
            };
        case ADD_PROJECTS:
            return {
                ...state,
                projects:action.payload
            };
        default:
            return state;

    }
};


