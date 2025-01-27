import React from 'react'
import Skillset from '../components/Skillset';

function Skills({myskills,myexperiences}) {
    return (
       
       
       <div>
           <div  className='pt-12' id='skills'> 
               <h1 className="text-3xl text-center font-extrabold py-4 px-5 sm:text-4xl text-transparent bg-clip-text bg-custom-blue"> Skills and Experiences</h1>
             <Skillset myskills={myskills} myexperiences={myexperiences} ></Skillset>
        </div>
       </div>

    )
}

export default Skills