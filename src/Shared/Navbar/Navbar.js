import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex justify-between px-20'>
            <div>
                <h2 className='text-2xl'>This is logo</h2>
            </div>
            <div>
                <ul className='flex gap-4'>
                    <li> <Link>Home</Link> </li>
                    <li> <Link>Products</Link> </li>
                    <li> <Link>Register</Link> </li>
                    <li> <Link>Login</Link> </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;