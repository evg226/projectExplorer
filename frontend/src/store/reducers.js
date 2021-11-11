import { SET_USER } from "./action";

const initialUser = {
    name:"default",
    isAuth: true
};

export const reducerUser = (state = initialUser, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                name: action.payload.name,
                isAuth: true
            }
        default:
            return state
    }
};

export const initialProjects = {
    authors: [
        { id: 1, name: "author1" },
        { id: 2, name:"author2" }
    ],
    types: [
        { id: 1, name: "type1" },
        { id: 2, name: "type2" },
    ],
    projects: [
        { id: 1, name: "project1", description: "Описание 1", rating: 5, authorId:1, typeId:1, imgs:[], stacks:[] },
        { id: 2, name: "project2", description: "Описание 2", rating: 5, authorId: 1, typeId: 2, imgs: [], stacks: [] },
        { id: 1, name: "project3", description: "Описание 3", rating: 5, authorId:2, typeId:2, imgs:[], stacks:[] },
        { id: 2, name: "project4", description: "Описание 4", rating: 5, authorId:3, typeId:1, imgs:[], stacks:[] },
    ]
}

export const reducerProjects=(state = initialProjects , action) => {
    switch (action.type) {
        // case :
            
        default:
            return state;
    }
};