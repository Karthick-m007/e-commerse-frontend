import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'

export default function Homepage({ addtocart, setAddtocart, isLoggedIn }) {

    const [getdata, setGetdata] = useState([])


const navigate=useNavigate()
    function handleclickcart(product) {
        if (!isLoggedIn){
            alert("u r not logged in ")
            navigate('/login')
        }
        setAddtocart(prevcart => [...prevcart, product]
        )
    }

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
    return (
        <div>
            {/* <Navbar/> */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-4'>

                {
                    getdata.length === 0 ? (<span>loading...</span>) : (getdata && getdata.map((g, index) => (
                        <div className="card" style={{ width: "18rem" }} key={g.product_id}>
                                                        <img src={`${url}uploads/${g.image?.filename}`} className="card-img-top" alt={g.product_name} />

                            <div className="card-body">
                                <h5 className="card-title">{g.product_name}</h5>
                                <p className="card-text">{g.product_description}</p>
                                <h1 className="font-bold">{g.product_price}</h1>
                                <div className='flex justify-center items-center my-2'>
                                    <button className='btn btn-success' onClick={() => handleclickcart(g)} >
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
