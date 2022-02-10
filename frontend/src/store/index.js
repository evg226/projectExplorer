import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {reducerUser, reducerProjects, reducerBasket, reducerImage, reducerMessage} from "./reducers";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;;

export const store = createStore(
    combineReducers({
        user: reducerUser,
        projects: reducerProjects,
        basket:reducerBasket,
        images:reducerImage,
        message:reducerMessage
    }),
    composeEnhancers(applyMiddleware(thunk))
)
     