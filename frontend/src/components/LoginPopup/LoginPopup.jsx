import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
const LoginPopup = ({setShowLogin}) => {
     const [currState, setCurrstate]=useState("Login")
  return (
    <div className='login-popup'>
        <form action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img  onClick={()=>setShowLogin(false)}  src={assets.cross_icon} alt=''/>
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input type='text' placeholder='Your name' required />
                }
                <input type='email' placeholder=' Yourr Gmail' required/>
                <input type='password'  placeholder='Password' required/>

            </div>
            <button>{currState==="Sign Up"?"create account":"Login"}</button>
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
