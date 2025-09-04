import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'

export default function Homepage({ addtocart, setAddtocart, isLoggedIn }) {

    const [getdata, setGetdata] = useState([])


    const navigate = useNavigate()
    // function handleclickcart(product) {
    //     if (!isLoggedIn) {
    //         alert("u r not logged in ")
    //         navigate('/login')
    //     }
    //     setAddtocart(prevcart => [...prevcart, product]
    //     )
    // }

    const url = process.env.REACT_APP_BACKEND
    console.log(url)
    useEffect(() => {
        fetch(`${url}get-product`, {
            method: "GET",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setGetdata(data.product)
                console.log(getdata)
            })
            .catch(err => console.log("error in the getti data frndend", err))
    }, [])

    // Example in React (ProductCard.jsx or similar)

    const handleAddToCart = async (product) => {
        const res = await fetch(`${url}cart/place-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ product_id: product._id, quantity: 1 }),
        });

        const data = await res.json();

        if (data.success) {
           
            window.location.href = "/cartpage";
        } else {
            alert("Error placing order: " + data.message);
        }
    };

    return (
        <div>
            {/* <Navbar/> */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-4'>

                {
                    getdata.length === 0 ? (<span>loading...</span>) : (getdata && getdata.map((g, index) => (
                        <div className="card" style={{ width: "18rem" }} key={g.product_id}>
                            <img src={`${url}${g.image?.filepath}`} className="card-img-top" alt={g.product_name} />
                            {console.log("image link", `${ url }${ g.image?.filepath }`)}
                            <div className="card-body">
                                <h5 className="card-title">{g.product_name}</h5>
                                <p className="card-text">{g.product_description}</p>
                                <h1 className="font-bold">{g.product_price}</h1>
                                <div className='flex justify-center items-center my-2'>
                                    <button className='btn btn-success' onClick={() => handleAddToCart(g)} >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )))
                }
            </div>

        </div>
    )
}
