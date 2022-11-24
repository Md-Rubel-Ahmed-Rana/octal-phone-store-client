import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const {user} = useContext(AuthContext)
    const { data: currenUser = [] } = useQuery({
        queryKey: ["users", user],
        queryFn: async() => {
            const res = await fetch(`http://localhost:5000/users/${user?.email}`)
            const data = await res.json()
            return data;
        }
    })

    return (
        <div>
            <Navbar />
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {
                            currenUser.role === "admin" ? <>
                                <li> <Link>All Buyers</Link> </li>
                                <li> <Link>All Sellers</Link> </li>
                            </> : <> 
                                    {
                                        currenUser.role === "seller" ? <>
                                            <li> <Link to="/dashboard/addProduct">Add A Product</Link> </li>
                                            <li> <Link>My Buyers</Link> </li>
                                        </> : <li> <Link>My Orders</Link> </li>
                                    }
                                </> 
                        }
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;