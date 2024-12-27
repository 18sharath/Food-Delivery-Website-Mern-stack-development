import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { Storecontext } from '../../context/StoreContext'
import axios from 'axios'
const LoginPopup = ({setShowLogin}) => {
    const {url,token,setToken}=useContext(Storecontext)
     const [currState, setCurrstate]=useState("Login")
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler=(event)=>{
        const value=event.target.value
        const name=event.target.name
        setData(data=>({...data,[name]:value}))

    }
    // 6:41 minutes
    const onlogin=async(event)=>{
        event.preventDefault() // to avoid reload the page
        let Newurl=url;
        if(currState=="Login")
        {
            Newurl+="/api/user/login"
        }
        else
        {
            Newurl+="/api/user/register"
        }
        const response=await  axios.post(Newurl,data)
        if(response.data.success)
        {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token) // storing the token
            setShowLogin(false) //This line is used to hide the login popup after a successful login or registration. 

        }
        else{
            alert(response.data.message)
        }


    }
   
  return (
    <div className='login-popup'>
        <form onSubmit={onlogin} action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img  onClick={()=>setShowLogin(false)}  src={assets.cross_icon} alt=''/>
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your name' required />
                }
                <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder=' Your Gmail' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type='password'  placeholder='Password' required/>

            </div>
            <button type='submit' >{currState==="Sign Up"?"create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type='checkbox' required/>
                <p> By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login"
            ?<p>Create a New account? <span onClick={()=>setCurrstate("Sign Up")}>Click Here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrstate("Login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup
