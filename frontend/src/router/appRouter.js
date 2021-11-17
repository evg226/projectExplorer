import React from 'react';
import { authRoutes, publicRoutes } from './routes';
import { Routes, Route,Navigate } from "react-router-dom";
import { DESK_ROUTE } from '../utils/constants';
import { shallowEqual, useSelector } from 'react-redux';
import { getUser } from '../store/selectors';
import { Project } from '../pages/project';


export const AppRouter = () => {
    const user = useSelector(getUser, shallowEqual);
    const isAuth = user.isAuth;

    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component()} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component()} exact />
            )}
            <Route element={<Navigate replace to={DESK_ROUTE} />} />
              
        </Routes>
    )
}

