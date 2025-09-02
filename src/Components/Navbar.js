import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ setIsLoggedIn, isLoggedIn, setAddtocart }) => {

    const url = process.env.REACT_APP_BACKEND
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${url}check-auth`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setIsLoggedIn(data.success);
            })
            .catch(() => setIsLoggedIn(false));
    }, [url]);

    const handleLogout = () => {
        fetch(`${url}logout`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setIsLoggedIn(false);
                    setAddtocart([])
                    navigate('/login');
                }
            });
    };

    return (
        <nav className="bg-white shadow-md px-4 py-3">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-blue-600">
                    MyShop
                </Link>

                {/* Links */}
                <div className="space-x-4 hidden md:flex">
                    <Link to="/" className="text-gray-700 hover:text-blue-600">
                        Home
                    </Link>
                    <Link to="/products" className="text-gray-700 hover:text-blue-600">
                        Products
                    </Link>
                    <Link to="/cartpage" className="text-gray-700 hover:text-blue-600">
                        Cart
                    </Link>
                    {!isLoggedIn ? (
                        <Link to="/login" className="text-gray-700 hover:text-blue-600">
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="text-gray-700 hover:text-blue-600 cursor-pointer bg-transparent border-none"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;