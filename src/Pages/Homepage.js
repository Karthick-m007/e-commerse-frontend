import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Homepage({ addtocart, setAddtocart, isLoggedIn }) {
    const [getdata, setGetdata] = useState([]);
    const navigate = useNavigate();
    const url = process.env.REACT_APP_BACKEND;

    function handleclickcart(product) {
        if (!isLoggedIn) {
            alert("You are not logged in.");
            navigate('/login');
            return;
        }
        setAddtocart(prevcart => [...prevcart, product]);
    }

    useEffect(() => {
        fetch(`${url}get-product`, {
            method: "GET",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setGetdata(data.product);
            })
            .catch(err => console.log("error in the get product frontend", err));
    }, [url]);

    return (
        <div className="px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getdata.length === 0 ? (
                    <span>Loading...</span>
                ) : (
                    getdata.map((g) => (
                        <div
                            key={g.product_id}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                        >
                            <img
                                src={`${url}uploads/${g.image?.filename}`}
                                alt={g.product_name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h5 className="text-lg font-semibold mb-2">{g.product_name}</h5>
                                <p className="text-gray-700 text-sm mb-2">{g.product_description}</p>
                                <p className="text-blue-600 font-bold text-xl mb-4">₹{g.product_price}</p>
                                <div className="flex justify-center">
                                    <button
                                        className="btn btn-success px-4 py-2"
                                        onClick={() => handleclickcart(g)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
