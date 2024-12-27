import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const Storecontext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartitems] = useState({});
    const [token,setToken]=useState("")
    const url="http://localhost:4000" 
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartitems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else
            setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    const removeFromCart = (itemId) => {
        setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
    const getTotalCartAmount = () => {
        let totalamount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let iteminfo = food_list.find((product) => product._id === item);
                totalamount += iteminfo.price * cartItems[item];
            }
        }
        return totalamount;
    }
    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])
    const contextValue = {
        food_list,
        cartItems,
        setCartitems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };
    return (
        <Storecontext.Provider value={contextValue}>
            {props.children}
        </Storecontext.Provider>
    );
};

export default StoreContextProvider;
