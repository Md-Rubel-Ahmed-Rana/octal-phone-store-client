import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import logo from "../../images/logo.png"

const Navbar = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <div className='lg:flex justify-between items-center lg:px-20 py-2 px-4 bg-blue-800 text-white'>
            <div className='flex items-center justify-center gap-3'>
                <Link to="/">
                    <img className='w-14 h-14 rounded-full' src={logo} alt="logo" />
                </Link>
                <Link to="/"> 
                    <h2 className='text-2xl font-bold'>Octal Phone Store</h2> 
                 </Link>
            </div>
            <div>
                <ul className='flex gap-4'>
                    <li> <Link>Home</Link> </li>
                    {
                        user?.uid ? <>
                            <li> <Link>My Products</Link> </li>
                            <li> <Link>Add Product</Link> </li>
                            <li> <Link to="/login">Logout</Link> </li>
                        </> : <>
                                <li> <Link to="/register">Register</Link> </li>
                                <li> <Link to="/login">Login</Link> </li>
                        </>
                    }
                    
                </ul>
            </div>
        </div>
    );
};

export default Navbar;