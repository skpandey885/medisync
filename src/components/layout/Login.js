import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAccount, useSigner } from 'wagmi'
import { useAuth } from '../../contexts/authContext'

export const shortenAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-5, -1);
};

 const shortenMail = (mail) => {
  return mail.slice(0, 3) + "..." + mail.slice(-5);
};

const Login = () => {
  const { userLoggedIn } = useAuth()
  const {currentUser} = useAuth()
  // const [isAdmin,setIsAdmin] = useState(false);
  // const {data:account} = useAccount();
  // const {data:signer} = useSigner();

const connect = ()=>{
   alert("Feature in Progress!")
};
  
console.log(currentUser )
  return (
    <Link to="/login"> <button className='primary-btn'> 
    {userLoggedIn ? shortenMail(currentUser.email): "Log In"}
    </button></Link>
  )
}

export default Login;