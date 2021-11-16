import { SET_SELECTED_AUTHOR, SET_SELECTED_TYPE, SET_USER } from "./action";

const initialUser = {
    name:"default",
    isAuth: true
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
    authors: [
        { id: 1, name: "author1" },
        { id: 2, name: "author2" },
        { id: 3, name: "author3" },
        { id: 4, name: "author4" }
    ],
    types: [
        { id: 1, name: "type1" },
        { id: 2, name: "type2" },
        { id: 3, name: "type3" },
        { id: 4, name: "type4" },
    ],
    projects: [
        { id: 1, name: "project1", description: "Описание 1", start:"2021-04-01", finish: "2021-04-30", rating: 5, authorId:1, typeId:1, imgs:[], stacks:[] },
        { id: 2, name: "project2", description: "Описание 2", start:"2021-04-01", finish: "2021-04-30", rating: 5, authorId: 1, typeId: 3, imgs: [], stacks: [] },
        { id: 1, name: "project3", description: "Описание 3", start:"2021-04-01", finish: "2021-04-30", rating: 5, authorId:2, typeId:4, imgs:[], stacks:[] },
        { id: 2, name: "project4", description: "Описание 4", start:"2021-04-01", finish: "2021-04-30", rating: 5, authorId:3, typeId:2, imgs:[], stacks:[] },
    ],
    selectedType: {},
    selectedAuthor:{},

}

export const reducerProjects=(state = initialProjects , action) => {
    switch (action.type) {
        case SET_SELECTED_TYPE:
            return {
                ...state,
                selectedType:action.payload
            }
        case SET_SELECTED_AUTHOR:
            return {
                ...state,
                selectedAuthor:action.payload
            }
        default:
            return state;
    }
};


