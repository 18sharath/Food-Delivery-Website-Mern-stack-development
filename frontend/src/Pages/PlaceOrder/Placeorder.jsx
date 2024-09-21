import React, { useContext } from 'react';
import './Placeorder.css';
import { Storecontext } from '../../context/Storecontext';
const Placeorder = () => {
  const {getTotalCartAmount}=useContext(Storecontext)
  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='Pin Code' />
          <input type="text" placeholder='Country'/>
        </div>
        <input type="text"  placeholder='Phone'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()+(getTotalCartAmount()===0?0:2)}</b>
            </div>

          </div>
          <button >Proceed To payment</button>
        </div>
      </div>

    </form>
  )
}

export default Placeorder
