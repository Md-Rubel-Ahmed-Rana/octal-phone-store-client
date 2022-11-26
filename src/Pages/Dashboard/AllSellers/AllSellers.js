import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import swal from 'sweetalert';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loader from '../../../Shared/Loader/Loader';

const AllSellers = () => {
    const { user } = useContext(AuthContext)
    const { data: currenUser = [] } = useQuery({
        queryKey: ["users", user],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/${user?.email}`)
            const data = await res.json()
            return data;
        }
    })

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users", currenUser],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?role=${currenUser?.role}`)
            const data = await res.json()
            return data;
        }
    })

    const sellers = users.filter((user) => user.role === "seller");


    const handleDeleteUser = (email) => {
        fetch(`http://localhost:5000/users/${email}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(() => {
                swal("Done", "Seller deleted successfully", "success");
                refetch()
            })
            .catch((err) => console.log(err))
    }


    // updated seller in users collection
    const handleVerify = (seller) => {
        axios.put(`http://localhost:5000/users/sellers/${seller._id}`)
        .then(() => {
            // update seller in products collection
            axios.put("http://localhost:5000/products/sellers")
            .then((data) => console.log(data))
        })
        .catch((err) => console.log(err))
    }

    if (sellers.length === 0) {
        return <Loader />
    }

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sellers.map((seller, index) => <tr key={seller._id}>
                            <th>{index + 1}</th>
                            <td>{seller.name}</td>
                            <td>{seller.email}</td>
                            <td>{seller.role}</td>
                            <td>{seller.isVerified ? <FaCheckCircle className='text-green-500 text-2xl' />  : <button onClick={() => handleVerify(seller)}className='bg-red-500 text-white rounded p-1'>Unverified</button> }</td>
                            <td><button onClick={() => handleDeleteUser(seller.email)} className='bg-red-500 px-2 py-1 text-white rounded'>Delete</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllSellers;