import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loader from '../../../Shared/Loader/Loader';

const MyOrders = () => {
    const {user} = useContext(AuthContext)
    const [myOrders, setMyOrders] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/myOrders?email=${user?.email}`)
        .then((data) => setMyOrders(data.data))
    }, [user?.email])

    if (myOrders.length === 0) {
        return <Loader />
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.map((order, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={order.image} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{order.phoneName}</td>
                                <td>{order.price}</td>
                                <th>
                                    {
                                        order.paid ? "Paid" : <Link to={`/dashboard/payment/${order._id}`}> <button className="btn btn-primary btn-xs">Pay</button></Link>
                                    }
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;