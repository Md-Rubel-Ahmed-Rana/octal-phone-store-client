import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Advertisment = () => {
    const [advertises, setAdvertises] = useState([])

    useEffect(() => {
        axios.get("https://octal-phone-server.vercel.app/advertises")
            .then((data) => setAdvertises(data.data))
    }, []);

    return (
        <div>
            {
                advertises.length === 0 ? "" :
                    <div className='grid lg:grid-cols-4 gap-10 bg-gray-800 p-10 rounded-md'>
                        {
                            advertises.map((advertise) => <div key={advertise._id} className='relative w-full animate__animated animate__fadeInUp'>
                                <img className='rounded w-full h-60' src={advertise.image} alt="" />
                                <h3 className='absolute top-28 lg:rotate-45 text-4xl bg-green-500 p-2 text-black'>{advertise.name}</h3>
                            </div>)
                        }
                    </div>
            }
        </div>
    );
};

export default Advertisment;