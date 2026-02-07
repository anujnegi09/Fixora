import React, { useContext, useState } from 'react'

// import {AuthContext} from '../../context/AuthContext'


const LoginPage = () => {

  const [currState, setCurrState] = useState("sign up")
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  // const {login} = useContext(AuthContext)

  const onSubmitHandler = (event)=>{
    event.preventDefault();

  //   if(currState === "sign up" && !isDataSubmitted){
  //     setIsDataSubmitted(true)
  //   return;   
  // }


  login(currState === "sign up" ? 'signup' : 'login' ,{fullName,email,password})
}

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl h-screen' 
      // style={{ backgroundImage: `url(${bgImage})` }}
       >
     {/* ------------left------------- */}
      <img  alt="" className='w-[min(30vw,250px)]' />

      {/* --------------right---------------- */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-black border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
         <h2 className='font-medium text-2xl flex justify-between items-center'>{currState}
          {isDataSubmitted && <img onClick={()=>{
            setIsDataSubmitted(false)
          }}  alt="" className='w-5 cursor-pointer' />
          }
          
         </h2>
         {currState === "sign up" && !isDataSubmitted && (
          <input 
             onChange={(e) => setFullName(e.target.value)} 
             value={fullName}
             required 
             type="text" 
             name='Fullname'
             className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' 
             placeholder='Full Name'
/>

         )}
         {!isDataSubmitted && (
          <>
          <input onChange={(e) => setEmail(e.target.value)} value={email} name='email'
          required type="email" placeholder='Email Address' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />

          <input onChange={(e) => setPassword(e.target.value)} value={password} name='password'
          required type="password" placeholder='Password' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
          </>
         )}
         <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>{currState === "sign up" ? "Create Account" : "Login Now"}
         </button>
         <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" />
          <p>Agree to the term of use privacy policy.</p>
         </div>

         <div className='flex flex-col gap-2'>
          {currState === "sign up" ? (
            <p className='text-sm text-gray-600'>Already have an account ? <span onClick={()=>{
              setCurrState("Login")
              ; setIsDataSubmitted(false)}}
              className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
          ) :(
            <p className='text-sm text-gray-600'>Create an account <span onClick={()=>{
              setCurrState("sign up")}}
              className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
          )}
         </div>
         
      </form>
    </div>


  )
}

export default LoginPage