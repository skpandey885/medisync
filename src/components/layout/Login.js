import React, { useEffect, useState } from 'react'
import { useAccount, useConnect, useContract, useSigner } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { HiCheckCircle } from 'react-icons/hi'

export const shortenAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-5, -1);
};


const Login = () => {
  const [isAdmin,setIsAdmin] = useState(false);
  const {data:account} = useAccount();
  const {data:signer} = useSigner();

const connect = ()=>{
   alert("Feature in Progress!")
};
  
  
  return (
    <button onClick={connect} className='primary-btn'>Login</button>
  )
}

export default Login;