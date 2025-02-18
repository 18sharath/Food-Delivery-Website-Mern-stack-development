import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { Storecontext } from '../../context/Storecontext'
import { useNavigate } from 'react-router-dom'
const Navbar = ({ setShowLogin }) => {
const [menu, setMenu] = useState("home");
const { getTotalCartAmount, token, setToken } = useContext(Storecontext);
 

  const navigate=useNavigate(); //is a hook provided by the react-router-dom library in React. It is used to programmatically navigate to different routes in your application. 
  // logout user
  const logout=()=>{
      localStorage.removeItem("token");// Remove the token from localStorage
      setToken("");// Clear the token from the context
      navigate("/");
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt='' className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => { setMenu("home") }} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => { setMenu("menu") }} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => { setMenu("mobile-app") }} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => { setMenu("contact-us") }} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
          <Link to='/cart'><img src={assets.basket_icon} alt='' /></Link>
          {getTotalCartAmount() === 0 ? "" : <div className='dot'></div>}
        </div>

        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li> 

            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar



