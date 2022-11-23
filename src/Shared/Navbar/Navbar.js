import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png"

const Navbar = () => {
    return (
        <div className='lg:flex justify-between items-center lg:px-20 py-2 px-4 bg-blue-800 text-white'>
            <div className='flex items-center justify-center gap-3'>
                <img className='w-14 h-14 rounded-full' src={logo} alt="logo" />
                <h2 className='text-2xl font-bold'>Octal Phone Store</h2>
            </div>
            <div>
                <ul className='flex gap-4'>
                    <li> <Link>Home</Link> </li>
                    <li> <Link>My Products</Link> </li>
                    <li> <Link>Add Product</Link> </li>
                    <li> <Link>Register</Link> </li>
                    <li> <Link>Login</Link> </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;