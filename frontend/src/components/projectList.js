import React from 'react'
import { Row } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux'
import { getProjects } from '../store/selectors'
import { ProjectItem } from './projectItem';

export const ProjectList=()=> {
    const projects = useSelector(getProjects, shallowEqual);
    
    return (
        <Row className="d-flex mt-4">
            {
                projects.map(project => <ProjectItem item={project} key={ project.id}/>)
            }

        </Row>    
    )
}



