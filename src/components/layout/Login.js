import React, { useEffect, useState } from 'react'
import { useAccount, useConnect, useContract, useSigner } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { HiCheckCircle } from 'react-icons/hi'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contract/contract';

export const shortenAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-5, -1);
};


const Login = () => {
  const [isAdmin,setIsAdmin] = useState(false);
  const {data:account} = useAccount();
  const {data:signer} = useSigner();

  const {connect} = useConnect({
    connector: new InjectedConnector(),
    onError: () => alert("Install metamask wallet from www.metamask.io ")
  });
  
  const contract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: CONTRACT_ABI,
    signerOrProvider:signer
  })


  const checkIfAdmin = async () =>{
    console.log("Inside check admin")
    try{
      if(contract && signer){
        const _isAdmin = await contract.checkIfAdmin();
        console.log(_isAdmin);
        setIsAdmin(_isAdmin);         
      }
    } catch(err){
      console.log(err);
    }
  } 

  useEffect(() => {
    checkIfAdmin();    
  }, [signer])
  
  if(isAdmin){
    return (
      <div className='inline-flex items-center gap-1 px-4 py-2 font-medium text-green-500 rounded cursor-pointer bg-green-50'>{shortenAddress(account.address)} <span>{<HiCheckCircle className='w-5 h-5'/>}</span></div> 
    );
  }

  if(account) {
    return(
      <div className='px-4 py-2 font-medium text-blue-500 rounded cursor-pointer bg-blue-50'>{shortenAddress(account.address)}</div>
    )
  }
 
  return (
    <button onClick={connect} className='primary-btn'>Login</button>
  )
}

export default Login;