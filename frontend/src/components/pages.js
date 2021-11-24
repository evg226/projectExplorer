import React, {Component, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getLimit, getPage, getProjects, getTotalCount} from "../store/selectors";
import {Pagination} from "react-bootstrap";
import {loadProjects} from "../store/action";


export const Pages = ()=>{
    const dispatch=useDispatch();
    const activePage=useSelector(getPage,shallowEqual);
    const limit=useSelector(getLimit ,shallowEqual);
    const totalCount=useSelector(getTotalCount ,shallowEqual);
    const pageCount=Math.ceil(totalCount/limit);
    const pages=[];

    for (let i=1;i<=pageCount;i++) pages.push(i);

    return (
        <Pagination className={"mt-5 "} >
            { pages && pages.map (page =>
                <Pagination.Item
                    key={page}
                    active={activePage===page}
                    onClick={()=>dispatch(loadProjects(page))}
                >{page}</Pagination.Item>
            )}
        </Pagination>
        )
}
