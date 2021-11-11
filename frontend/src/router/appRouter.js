import React from 'react';
import { authRoutes, publicRoutes } from './routes';
import { Routes, Route,Navigate } from "react-router-dom";
import { DESK_ROUTE } from '../utils/constants';


export const AppRouter = () => {
    const isAuth = true;
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

