import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { AuthContext } from '../../contexts/AuthProvider';
import swal from 'sweetalert';
import axios from 'axios';

const Categories = () => {
    const {user} = useContext(AuthContext)
    const products = useLoaderData();
    const [modalData, setModalData] = useState({});
    
    const handleConfirmation = (event) => {
        event.preventDefault()
        const form = event.target;
        const buyerName = form.buyerName.value;
        const email = form.email.value;
        const phoneName = form.phone.value;
        const price = form.price.value;
        const phoneNumber = form.number.value;
        const location = form.location.value;

        axios.post("http://localhost:5000/orders", {
            buyerName, email, phoneName, price, phoneNumber, location
        })
        .then(()=> {
            swal("Great!", "Confirmed your order", "success");
        })
        .catch((error) => {
                console.log(error);
        });
       
    }

    return (
        <div className='bg-black lg:px-20 py-10 relative'>
            <div className='grid  lg:grid-cols-3 gap-10'>
                {
                    products.map((product, index) =><div className='rounded-md w-full m-1 bg-gray-800 p-4 gap-3 text-white' key={index}>
                        <div className='mb-4'>
                            <img className='h-48 rounded w-full' src={product.img} alt="" />
                        </div>
                        <div>
                            <h2 className="text-2xl text-white mb-2">{product?.name}</h2>
                            <p className='mb-1'>Original Price: {product?.originalPrice}</p>
                            <p className='mb-2'>Resale Price: {product?.resalePrice}</p>
                            <p className='mb-2'>Used Time: {product?.usedTime}</p>
                            <p className='mb-2'>Condition: {product?.condition}</p>
                            <p className='mb-2'>Post: {product?.postedTime}</p>
                            <p className='mb-2'>Location: {product?.location}</p>
                            <div className='mb-2 flex items-center gap-4'> <span>Seller: {product?.seller}</span> <span>{product?.isVerified === "yes" ? <span ><FaCheckCircle className='text-green-500' /></span> : <FaTimesCircle className='text-red-500' />}</span> </div>
                            <button onClick={() => setModalData(product)} ><label htmlFor="confirm-modal" className="btn">Buy Now</label></button>
                        </div>
                    </div>)
                }
            </div>            
            <input type="checkbox" id="confirm-modal" className="modal-toggle" />
            <div className="modal modal-bottom text-black sm:modal-middle">
                <div className="modal-box bg-teal-500">
                    <form onSubmit={handleConfirmation} className='text-center'>
                        <input className='p-2 w-full' defaultValue={user?.displayName} type="text" name="buyerName" id="buyerName" readOnly />
                        <br />
                        <br />
                        <input className='p-2 w-full' defaultValue={user?.email} type="email" name="email" id="email" readOnly />
                        <br />
                        <br />
                        <input className='p-2 w-full' defaultValue={modalData?.name} type="text" name="phone" id="phone" readOnly />
                        <br />
                        <br />
                        <input className='p-2 w-full' defaultValue={modalData?.resalePrice} type="text" name="price" id="price" readOnly />
                        <br />
                        <br />
                        <input className='p-2 w-full' name='number' id='number' type="text" placeholder='Phone Number' required />
                        <br />
                        <br />
                        <input className='p-2 w-full' name='location' id='location' type="text" placeholder='Your Location' required />
                        <div className='flex justify-between items-center'>
                            <div className="modal-action text-center">
                                <label htmlFor="confirm-modal" className="btn">Cancel</label>
                            </div>
                            <div>
                                <button className='btn btn-primary mt-5' type="submit">Confirm</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Categories;