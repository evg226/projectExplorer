import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducerUser,reducerProjects } from "./reducers";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;;

export const store = createStore(
    combineReducers({
        user: reducerUser,
        projects: reducerProjects
    }),
    composeEnhancers(applyMiddleware(thunk))
)
     