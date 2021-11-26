import React from 'react'
import { Row } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux'
import {getBasket, getProjects} from '../store/selectors'
import { ProjectItem } from './projectItem';

export const ProjectList=({isBasket})=> {

    const basket= useSelector(getBasket,shallowEqual);
    let projects = useSelector(getProjects, shallowEqual);
    if (isBasket) projects=basket.projects;

    return (
        <>
            {
                projects.map(project => <ProjectItem isBasket={isBasket} item={project} key={ project.id}/>)
            }
        </>
    )
}



