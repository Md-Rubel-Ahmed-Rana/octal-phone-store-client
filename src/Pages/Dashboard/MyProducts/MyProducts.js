import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import swal from 'sweetalert';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    // const [orders, setOrders] = useState([])

    const {data: products = [], refetch} = useQuery({
        queryKey: ["products", user?.email],
        queryFn: async () => {
            if(user?.email){
                const res = await fetch(`http://localhost:5000/myproducts/${user?.email}`)
                const data = await res.json();
                return data
            }
        }
    }) 

    
    // useEffect(() => {
    //     axios.get("http://localhost:5000/orders")
    //         .then((data) => setOrders(data.data))
    // }, []);
    
    const myProducts = products.filter((product) => product.seller_email === user?.email);
    // const paidProduct = orders.find((order) => order.paid);
    // const remainingProducts = myProducts.filter((product) => product.img !== paidProduct.image);

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

    const handleDelete = (product) => {
        axios.delete(`http://localhost:5000/myProducts/delete/${product._id}`)
        .then(() => {
            axios.delete(`http://localhost:5000/advertise/delete/${product._id}`)
            .then(() => {
                swal("Oops!", "Product deleted successfully", "success");
                refetch()
            })
            .catch((err) => console.log(err))
        })
        .catch((err)=> console.log(err))
    }

    return (
        <div>
            <div className='grid  lg:grid-cols-2 gap-2'>
                {
                    myProducts.length === 0 ? <h2 className="text-2xl">You have not added any product.</h2> : myProducts.map((product, index) => <div className='rounded-md w-full shadow-lg bg-slate-200 m-1 p-4 gap-3' key={index}>
                        <div className='mb-4'>
                            <img className='h-48 rounded w-full' src={product.img} alt="" />
                        </div>
                        <div>
                            <h2 className="text-2xl mb-2">{product?.name}</h2>
                            <p className='mb-2'>Resale Price: {product?.resalePrice}</p>
                            <div className='flex justify-between'>
                                <button  className='bg-blue-500 p-2 rounded text-white'>Available</button>
                                <button onClick={() => handleAdvertise(product)} className='bg-green-500 p-2 rounded text-white'>Advertise</button>
                                <button onClick={() => handleDelete(product)}  className='bg-red-500 p-2 rounded text-white'>Delete</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyProducts;