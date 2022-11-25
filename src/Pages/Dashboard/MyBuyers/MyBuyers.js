import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MyBuyers = () => {
    const [buyers, setBuyers] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/buyers")
            .then((data) => setBuyers(data.data))
    }, [])
    
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        buyers.map((buyer, index) => <tr key={buyer._id}>
                            <th>{index + 1}</th>
                            <td>{buyer.buyerName}</td>
                            <td>{buyer.email}</td>
                            <td>{buyer.phoneNumber}</td>
                            <td>{buyer.location}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyBuyers;