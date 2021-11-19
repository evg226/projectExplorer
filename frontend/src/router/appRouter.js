import React from 'react';
import { authRoutes, publicRoutes } from './routes';
import { Routes, Route,Navigate } from "react-router-dom";
import {DESK_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE} from '../utils/constants';
import { shallowEqual, useSelector } from 'react-redux';
import { getUser } from '../store/selectors';



export const AppRouter = () => {
    const user = useSelector(getUser, shallowEqual);
    const isAuth = user.isAuth;

    return (
        <Routes>
            {  authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path}
                       element={
                           isAuth ?
                               Component
                               :
                               <Navigate replace to={DESK_ROUTE}/>
                       }
                       exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path}
                       element={
                           (isAuth && (path===SIGNIN_ROUTE))?
                               <Navigate replace to={DESK_ROUTE}/>
                               :
                           Component
                       } exact />
            )}
            <Route path={"*"} element={<Navigate replace to={DESK_ROUTE} />} />
              
        </Routes>
    )
}

