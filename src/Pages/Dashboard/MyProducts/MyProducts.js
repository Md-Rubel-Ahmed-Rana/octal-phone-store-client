import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    
    const {data: products = []} = useQuery({
        queryKey: ["products", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myproducts/${user?.email}`)
            const data = await res.json();
            return data
        }
    }) 

    console.log(products);

    return (
        <div>
            <h4 className="text-3xl">This is my products component</h4>
        </div>
    );
};

export default MyProducts;