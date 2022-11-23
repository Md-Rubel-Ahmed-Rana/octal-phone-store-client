import React from 'react';
import Advertisment from '../Advertisment/Advertisment';
import Banner from '../Banner/Banner';
import Products from '../Products/Products';

const Home = () => {
    return (
        <div className='bg-black text-white'>
            <Banner />
            <Products />
            <Advertisment />
        </div>
    );
};

export default Home;