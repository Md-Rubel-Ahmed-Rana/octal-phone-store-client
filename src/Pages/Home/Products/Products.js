import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/products")
            .then((data) => setProducts(data.data))
    }, [])

    return (
        <div className='py-5 bg-gray-800 my-5 rounded-md'>
            <h3 className="text-2xl text-center mb-5">Select your best Brand</h3>
            <div className='flex px-5 gap-10 mx-auto text-center'>
                {
                    products.map((product) => <Link to={`/category/${product.category_id}`}> <div className='shadow-xl cursor-pointer'>
                        <img className='h-40 w-60 rounded' src={product.img} alt="" />
                        <h3 className="text-2xl text-white">{product.name}</h3>
                    </div></Link>)
                }
            </div>
        </div>
    );
};

export default Products;