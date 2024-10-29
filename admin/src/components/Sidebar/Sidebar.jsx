import React from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
const sidebar = () => {
  return (
    <div>
      <div className="sidbar">
        <div className="sidebar-options">
            <div className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add items</p>
            </div>
            <div className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List items</p>
            </div>
            <div className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default sidebar
