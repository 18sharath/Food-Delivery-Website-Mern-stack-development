import React, { useEffect, useState } from 'react'
import './Add.css'
import axios from "axios";
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify';

const Add = () => {
    const url = "http://localhost:4000";
    const [image, setimage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"

    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value; // what is there in this value
        setData(prevdata => ({ ...prevdata, [name]: value }));
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault(); // to prevent reload
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", data.price)
        formData.append("category", data.category)
        formData.append("image", image)
        // to call the api we will use axios 5;27
        // Axios is a popular JavaScript library used to make HTTP requests from a browser or Node.js.
        const response = await axios.post(`${url}/api/food/add`, formData)
        if (response.data.success) {
            setData({
                name: '',
                description: "",
                price: "",
                category: "Salad"
            })
            setimage(false)
            toast.success(response.data.message)
            console.log(data.price);

        }
        else {
            toast.error(response.data.message)
        }
    }
    useEffect(()=>{
        console.log(data);// whenever our data get changed this function will get executed
    },[data]);

    return (
        <div className='add'>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />

                    </label>
                    <input onChange={(e) => setimage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />

                </div>
                <div className='add-product-description flex-col'>
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write content here' required></textarea>

                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>product Category</p>
                        <select onChange={onChangeHandler}  name="category" id="">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>

            </form>

        </div>
    )
}

export default Add
