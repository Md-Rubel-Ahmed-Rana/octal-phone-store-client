import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Categories = () => {
    const {products} = useLoaderData();
    return (
        <div className='bg-black px-20 py-10'>
            <div className='flex justify-between'>
                {
                    products.map((product, index) =><> <div className='flex rounded-md w-full m-1 bg-gray-800 p-4 gap-3 text-white' key={index}>
                        <div>
                            <img className='h-52 w-40' src={product.img} alt="" />
                        </div>
                        <div>
                            <h2 className="text-2xl text-white mb-2">{product.name}</h2>
                            <p className='mb-1'>Original Price: {product.originalPrice}</p>
                            <p className='mb-2'>Resale Price: {product.resalePrice}</p>
                            <p className='mb-2'>Resale Price: {product.usedTime}</p>
                            <p className='mb-2'>Post: {product.postedTime}</p>
                            <p className='mb-2'>Location: {product.location}</p>
                            <p className='mb-2'> <span>Seller: {product.seller}</span> <span>{product.isVerified === "yes" ? "Yes" : "No"}</span> </p>
                        <button className='text-white bg-blue-600 px-3 py-2 rounded'>Buy Now</button>
                        </div>
                    </div>

                     </>)
                }
            </div>
        </div>
    );
};

export default Categories;