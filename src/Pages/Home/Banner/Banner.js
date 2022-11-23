import React from 'react';
import BannerImg from "../../../images/banner.png"

const Banner = () => {
    return (
        <div className='lg:flex bg-gray-800 p-5 rounded-xl justify-between items-center'>
            <div className='lg:w-1/2'>
                <h3 className="lg:text-4xl text-white font-semibold mb-3">Welcome to our store</h3>
                <p className='leading-8'>Hi Dear customer, Are you thinking to buy a nice phone in a low and minimalistic price? Wow, this online store is best for you. We provide the best service to our customer. We also provide delivery system for our customer. You just order a product we will reach the product to your location.</p>
            </div>
            <div className='lg:w-1/2'>
                <img className='w-full h-full rounded-md' src={BannerImg} alt="" />
            </div>
        </div>
    );
};

export default Banner;