import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const AllBuyers = () => {
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
    const buyers = users.filter((user) => user.role === "buyer");


    const handleDeleteUser = (email) => {
        fetch(`http://localhost:5000/users/${email}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            refetch()
        })
        .catch((err) => console.log(err))
    }

    return (
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer, index) => <tr key={buyer._id}>
                                <th>{index + 1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td>{buyer.role}</td>
                                <td><button onClick={() => handleDeleteUser(buyer.email)} className='bg-red-500 px-2 py-1 text-white rounded'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
    );
};

export default AllBuyers;