import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import swal from 'sweetalert';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loader from '../../../Shared/Loader/Loader';

const MyProducts = () => {
    const { user } = useContext(AuthContext);

    const {data: products = []} = useQuery({
        queryKey: ["products", user?.email],
        queryFn: async () => {
            if(user?.email){
                const res = await fetch(`http://localhost:5000/myproducts/${user?.email}`)
                const data = await res.json();
                return data
            }
        }
    }) 

    const handleAdvertise = (advertise) => {
        const advertiseData = {
            name: advertise.name,
            image: advertise.img,
            id: advertise._id,
            price: advertise.resalePrice,
            seller_email: advertise.seller_email
        }
        fetch("http://localhost:5000/seller/advertise", {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(advertiseData)
        })
        .then((res) => res.json())
        .then(() => {
            swal("Done!", "Advertised successfully", "success");
        })
        .catch((err) => console.log(err))
    }

    return (
        <div>
            <div className='grid  lg:grid-cols-2 gap-2'>
                {
                    products.length === 0 ? <Loader /> : products.map((product, index) => <div className='rounded-md w-full shadow-lg bg-slate-200 m-1 p-4 gap-3' key={index}>
                        <div className='mb-4'>
                            <img className='h-48 rounded w-full' src={product.img} alt="" />
                        </div>
                        <div>
                            <h2 className="text-2xl mb-2">{product?.name}</h2>
                            <p className='mb-2'>Resale Price: {product?.resalePrice}</p>
                            <div className='flex justify-between'>
                                <button  className='bg-blue-500 p-2 rounded text-white'>Available</button>
                                <button onClick={() => handleAdvertise(product)} className='bg-green-500 p-2 rounded text-white'>Advertise</button>
                                <button  className='bg-red-500 p-2 rounded text-white'>Delete</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyProducts;