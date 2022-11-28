import React from 'react';
import allu from "../../../images/allu.png"
import jeet from "../../../images/jeet.png"
import stave from "../../../images/stave.png"

const Feedback = () => {
    return (
        <>
        <h3 className="text-3xl text-white mt-10 text-center -mb-10">Feedbacks</h3>
        <div className='lg:flex lg:px-10 rounded-lg gap-10 bg-gray-800  py-10 mb-10'>
            <div className='bg-gray-700 p-5 rounded-md'>
                <img className='w-full h-60 rounded' src={allu} alt="" />
                <h5 className='text-2xl text-center mb-2'>Allu Arjun</h5>
                <p>HI guys, This is a wonderfull website from where I have bought my best branded mobile. They provide the world class service</p>
            </div>
            <div className='bg-gray-700 p-5 rounded-md'>
                <img className='w-full h-60 rounded' src={stave} alt="" />
                <h5 className='text-2xl text-center mb-2'>Stave Jobs</h5>
                <p>Hello everyone, This is my favourite website. Sometimes I come here to buy my best branded mobile. Their services are very impressive.</p>
            </div>
            <div className='bg-gray-700 p-5 rounded-md'>
                <img className='w-full h-60 rounded' src={jeet} alt="" />
                <h5 className='text-2xl text-center mb-2'>Jeet</h5>
                <p>Just, I have wondered by visiting this website. Their service to person to person is one of the best service. I really support them.</p>
            </div>
        </div>
        </>
    );
};

export default Feedback;