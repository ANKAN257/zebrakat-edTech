import React from 'react';
import SocialMediaComponent from './SocialMediaComponent';

function Footer() {
  return (
    <div className='bg-custom-blue py-8'>
      <div className='h-[1px] w-full bg-gray-300'>

        <SocialMediaComponent />
      </div>
      <div className='flex items-center justify-center flex-col mt-10 pb-10 opacity-90'>
        <h1 className='text-gray-200 text-sm my-10'>
          Copyright © 2024 : Ankan Kumar
        </h1>
      </div>
    </div>
  );
}

export default Footer;
