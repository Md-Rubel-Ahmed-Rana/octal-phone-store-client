import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Advertisment = () => {
    const [advertises, setAdvertises] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/advertises")
            .then((data) => setAdvertises(data.data))
    }, )
    return (
        <div>
            {
                advertises.length === 0 ? "" : 
                    <div className='grid lg:grid-cols-4 gap-10 bg-gray-800 p-10 rounded-md'>
                {
                    advertises.map((advertise) => <div className='relative w-full'>
                        <img className='rounded w-full h-60' src={advertise.image} alt="" />
                        <h3 className='absolute top-28 lg:rotate-45 text-4xl text-black'>{advertise.name}</h3>
                    </div>)
                }
                </div>
            }
        </div>
    );
};

export default Advertisment;