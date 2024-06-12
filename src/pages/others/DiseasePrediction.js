import React, { useState } from 'react'
import { useAuth } from '../../contexts/authContext';

import MultiSelect from '../../components/reusable/MultiSelect';

const DiseasePrediction = () => {
    const { userLoggedIn, currentUser } =
    useAuth();


    
  return (
    <>
     <div className='h-[100px]'></div>
    <div> <span
     className="text-[50px] ml-[50px]"
    >Hey  
    </span>
    <span className=' text-[50px]  bg-300% 
bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient'>   {userLoggedIn ? currentUser.email : "there"}!</span>
</div>
<div className='text-[30px] mx-[50px] font-rubik
mb-[70px]


'>
Worried about your symptoms? Let's figure out what might be going on with a quick and easy health check!
</div>
   
<div className="mb-6 w-[60%] mx-auto">
<MultiSelect/>
</div>

    </>
  )
}

export default DiseasePrediction