import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setIsLoggedIn, isLoggedIn, setAddtocart }) => {
    const url = process.env.REACT_APP_BACKEND;
    const navigate = useNavigate();

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
    }, [url, setIsLoggedIn]);

    const handleLogout = () => {
        fetch(`${url}logout`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setIsLoggedIn(false);
                    setAddtocart([]);
                    navigate('/login');
                }
            });
    };

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-blue-600 mb-2 md:mb-0">
                    MyShop
                </Link>

                {/* Navigation Links */}
                <div className="flex flex-col md:flex-row gap-4 text-center">
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
                            className="text-gray-700 hover:text-blue-600 bg-transparent border-none"
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
