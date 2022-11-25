import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
// import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    // const [products, setProducts] = useState([])
    // const myProducts = useLoaderData()
    // useEffect(() => {
    //     fetch(`http://localhost:5000/myproducts/${user?.email}`)
    //     .then((res) => res.json())
    //         .then((data) => setProducts(...products,data))
    // }, [user?.email, products])

    const {data: myProducts = []} = useQuery({
        queryKey: ["products", user?.email],
        queryFn: async() => {
            const res = await fetch(`http://localhost:5000/myproducts/${user?.email}`);
            // const res = await fetch(`http://localhost:5000/myproducts/stave@jobs.com`);
            const data = await res.json();
            return data
        }
    })



    console.log(myProducts);

    return (
        <div>
            <h4 className="text-3xl">This is my products component</h4>
        </div>
    );
};

export default MyProducts;