import React from 'react'
import ProjectCompentpage from './../components/ProjectCompentpage';


function Project({projects}) {
 
   return (
    <div  id='projects'>
       
        <ProjectCompentpage projects={projects} projectTitle="Projects"></ProjectCompentpage>

    </div>

  )
}

export default Project