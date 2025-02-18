import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Storecontext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartitems] = useState({});
    const [token,setToken]=useState("")
    const [food_list,setFoodList] =useState([]) 

    const url="http://localhost:4000" 
    const addToCart =  async(itemId) => {
        if (!cartItems[itemId]) {
            setCartitems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else{
            setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if(token){
            await axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}});
        }
    }
    const removeFromCart =  async(itemId) => {
        setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token)
        {
            await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}});
        }
    }
    // const getTotalCartAmount = () => {
    //     let totalamount = 0;
    //     for (const item in cartItems) {
    //         if (cartItems[item] > 0) {
    //             let iteminfo = food_list.find((product) => product._id === item);
    //             totalamount += iteminfo.price * cartItems[item];
    //         }
    //     }
    //     return totalamount;
    // }
    const getTotalCartAmount = () => {
        let totalamount = 0;
        console.log('cartItems:', cartItems);
        console.log('food_list:', food_list);
    
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let iteminfo = food_list.find((product) => product._id === item);
                if (iteminfo) {
                    totalamount += iteminfo.price * cartItems[item];
                } else {
                    console.error(`Item with id ${item} not found in food_list`);
                }
            }
        }
        console.log('Total amount:', totalamount);
        return totalamount;
    }  

    const fetchFoodList=async()=>{
        // const response=await axios.get(url+"/api/food/list")
        // const response = await axios.get(url+"api/food/list")
        const response = await axios.get(`${url}/api/food/list`);

        setFoodList(response.data.data)

    }
    
    const loadCartData=async(token)=>{
        const response=await axios.post(`${url}/api/cart/get`,{},{headers:{token}});
        setCartitems(response.data.cartData)

    }
    useEffect(()=>{
        
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
            
          
        }
        loadData();
    },[])
    // const fetchFoodList = async () => {
    //     try {
    //         const response = await axios.get(`${url}/api/food/list`);
    //         console.log('API Response:', response.data); // Debug log
            
    //         if (response.data && response.data.data) {
    //             setFoodList(response.data.data);
    //             console.log('Food list updated:', response.data.data); // Debug log
    //         } else {
    //             console.error('Invalid response format:', response.data);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching food list:', error);
    //         console.error('Error details:', error.response?.data || error.message);
    //     }
    // }
    
    // Also modify your useEffect to include error handling
    // useEffect(() => {
    //     async function loadData() {
    //         try {
    //             console.log('Starting data load...'); // Debug log
    //             await fetchFoodList();
    //             if (localStorage.getItem("token")) {
    //                 setToken(localStorage.getItem("token"));
    //             }
    //             console.log('Data load complete'); // Debug log
    //         } catch (error) {
    //             console.error('Error in loadData:', error);
    //         }
    //     }
    //     loadData();
    // }, [])
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
