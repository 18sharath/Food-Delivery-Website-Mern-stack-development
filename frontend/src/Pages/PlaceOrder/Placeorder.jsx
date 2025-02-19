import React, { useContext, useState } from 'react';
import './Placeorder.css';
import { Storecontext } from '../../context/Storecontext';
const Placeorder = () => {
  const { getTotalCartAmount, url, token, food_list, cartItems } = useContext(Storecontext)
  const [data, setData] = useState({

    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""

  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    //  8:08
    setData(data => ({ ...data, [name]: value }));
  }

  // useEffect(()=>{
  //     console.log(data)
  // },[data])
// 8:12

  const placeorder=async (event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0)
      {
        let itemInfo = item;
        itemInfo["quantity"]=cartItems[item._id] ;
        orderItems.push(itemInfo);

      }
    })
    let orderData ={
       address:data,
       items:orderItems,
       amount:getTotalCartAmount()+2 


    }
    let response=await axios.post(`${url}/api/order/place`, orderData); 
    
  } 

  return (
    <form onSubmit={placeorder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstname' onChange={onChangeHandler} value={data.firstname} type="text" placeholder='First Name' />
          <input required  name='lastname' onChange={onChangeHandler} value={data.lastname} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='city' />
          <input required name='state'onChange={onChangeHandler} value={data.state} type="text" placeholder='state' />
        </div>
        <div className="multi-fields">  
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Pin Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
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
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)}</b>
            </div>

          </div>
          <button type='submit'>Proceed To payment</button>
        </div>
      </div>

    </form>
  )
}

export default Placeorder
