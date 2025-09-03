import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setIsLoggedIn, isLoggedIn, setAddtocart }) => {
    const url = process.env.REACT_APP_BACKEND;
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false)

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

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-white shadow-md px-4 py-3">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-blue-600">
                    MyShop
                </Link>

                {/* Hamburger Menu (Mobile) */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-800 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>

                {/* Menu Items */}
                <div className={`md:flex md:space-x-4 ${menuOpen ? 'block' : 'hidden'} md:block`}>
                    <Link to="/" className="block mt-2 md:mt-0 text-gray-700 hover:text-blue-600">
                        Home
                    </Link>
                    <Link to="/products" className="block mt-2 md:mt-0 text-gray-700 hover:text-blue-600">
                        Products
                    </Link>
                    <Link to="/cartpage" className="block mt-2 md:mt-0 text-gray-700 hover:text-blue-600">
                        Cart
                    </Link>
                    {!isLoggedIn ? (
                        <Link to="/login" className="block mt-2 md:mt-0 text-gray-700 hover:text-blue-600">
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="block mt-2 md:mt-0 text-gray-700 hover:text-blue-600 bg-transparent border-none"
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
