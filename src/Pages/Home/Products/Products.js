import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import Loader from '../../../Shared/Loader/Loader';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://octal-phone-server.vercel.app/categories")
            .then((data) => setProducts(data.data))
    }, [])

    return (
        <div className='py-5 bg-gray-800 my-5 rounded-md'>
            <h3 className="text-2xl text-center mb-5">Select your best Brand</h3>
            <div className='lg:flex px-5 gap-10 mx-auto text-center'>
                {
                    products.length === 0 ? <Loader /> : products.map((product) => <Link to={`/category/${product.category_id}`} key={product._id}> <div className='shadow-xl bg-slate-600 p-3 m-3 rounded cursor-pointer animate__animated animate__fadeInLeft'>
                        <img className='h-40 lg:w-60 w-full rounded' src={product.img} alt="" />
                        <h3 className="text-2xl text-white">{product.name}</h3>
                    </div></Link>)
                }
            </div>
        </div>
    );
};

export default Products;