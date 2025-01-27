import React from 'react'

import SectionTitle from './../components/SectionTitle';

function About({abouts}) {
  return (
    <div className='' id="about">
       
       
            <SectionTitle  abouts={abouts} titleText="About Me"></SectionTitle>
      
    </div>
  )
}

export default About