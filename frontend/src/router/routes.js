import { Admin } from "../pages/admin";
import { Auth } from "../pages/auth";
import { Desk } from "../pages/desk";
import { Project } from "../pages/project";
import { SelectedDesk } from "../pages/selectedDesk";
import {
    ADMIN_ROUTE,
    DESK_ROUTE,
    HOME_ROUTE,
    PROJECT_ROUTE,
    SELECTED_DESK,
    SIGNIN_ROUTE,
    SIGNUP_ROUTE
} from "../utils/constants";
import {Home} from "../pages/home";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component:<Admin />
    },
    {
        path: SELECTED_DESK,
        Component:<SelectedDesk />
    }
];

export const publicRoutes = [
    {
        path: SIGNIN_ROUTE,
        Component: <Auth />
    },
    {
        path: SIGNUP_ROUTE,
        Component:<Auth />
    },
    {
        path: DESK_ROUTE,
        Component: <Desk />
    },
    {
        path: PROJECT_ROUTE+"/:id",
        Component:<Project />
    },
    {
        path: HOME_ROUTE,
        Component:<Home />
    }

];