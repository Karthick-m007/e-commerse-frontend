import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'

export default function Adminviewpage() {
    const [getdata, setGetdata] = useState([])
    const navigate = useNavigate()

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

    function handleDelete(product_id) {
        fetch(`${url}product-delete/${product_id}`, {
            method: "DELETE",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    // Update the UI after deletion
                    setGetdata(prev => prev.filter(item => item.product_id !== product_id))
                }
            })
            .catch(err => console.log("error in delete fetch", err))
    }


    return (
        <div>
          
            <div className='flex justify-content-evenly mt-10'>

                {
                    getdata.length === 0 ? (<span>loading...</span>) : (getdata && getdata.map((g, index) => (
                        <div className="card" style={{ width: "18rem" }} key={g.product_id}>
                            <img src={`${url}uploads/${g.image?.filename}`} className="card-img-top" alt={g.product_name} />
                            <div className="card-body">
                                <h5 className="card-title">{g.product_name}</h5>
                                <p className="card-text">{g.product_description}</p>
                                <h1 className="font-bold    ">{g.product_price}</h1> <br />
                                <button className='btn btn-primary' onClick={() => navigate(`/adminedit/${g.product_id}`)}>
                                    Edit
                                </button>
                                <button className='btn btn-danger float-end' onClick={() => handleDelete(g.product_id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )))
                }
            </div>
        </div>
    )
}
