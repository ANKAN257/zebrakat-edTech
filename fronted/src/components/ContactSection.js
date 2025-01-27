import React from 'react'
import EmailForm from './EmailForm';

function ContactSection(props) {
 
  return (
    <div className=' h-screen w-full '>
      <div className='h-12 w-full flex justify-center items-center '>
        </div>
         <div className='pt-8 h-auto bg-white'> 
            <h1 class="text-black font-semibold text-center  text-3xl  "> {props.contactTitle} </h1>   
              <EmailForm></EmailForm>
         </div>

    </div>
  )
}

export default ContactSection