import React, {useEffect} from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import {getBasket, getProjects} from '../store/selectors'
import { ProjectItem } from './projectItem';

export const ProjectList=({isBasket})=> {

    const basket= useSelector(getBasket,shallowEqual);
    const projects = useSelector(getProjects, shallowEqual);
    let selectedProject=projects;
    useEffect(()=>{

    },);
    selectedProject=isBasket?basket.projects:projects;
    console.log(selectedProject);

    return (
        <>
            {
                !!selectedProject&&!!selectedProject.length&&selectedProject.map(project => <ProjectItem isBasket={isBasket} item={project} key={ project.id}/>)
            }
        </>
    )
}



