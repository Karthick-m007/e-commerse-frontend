import React, { useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'

export default function Admineditpage() {
    const { product_id } = useParams()
    const navigate = useNavigate()

    const url = process.env.REACT_APP_BACKEND

    const [productcreate, setProductcreate] = useState({
        productname: "",
        productdescription: "",
        productprice: "",
        stock: "",
        image: null,
        image: ""

    })


    console.log(product_id)
    useEffect(() => {
        fetch(`${url}get-product/${product_id}`, {
            method: "GET",
            credentials: 'include'
        })

            .then(res => res.json())
            .then(data => {
                console.log(data.get)
                setProductcreate({
                    productname: data.get.product_name,
                    productdescription: data.get.product_description,
                    productprice: data.get.product_price,
                    stock: data.get.stock,
                    image: null,
                    image: `${url}uploads/${data.get.image.filepath}`
                }
                )

            }


            )
            .catch(err => console.log("error in edit get fetch", err))
    }, [url, product_id])

    function handlechange(e) {
        const { name, value, files } = e.target
        if (name === 'image') {
            setProductcreate({
                ...productcreate,
                image: files[0]
            })

        }
        else {
            setProductcreate({
                ...productcreate,
                [name]: value
            })

        }


    }


    function handlesubmit(e) {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('product_name', productcreate.productname)
        formdata.append('product_description', productcreate.productdescription)
        formdata.append('product_price', productcreate.productprice)
        formdata.append('stock', productcreate.stock)
        formdata.append('image', productcreate.image)

        fetch(`${url}update-product/${product_id}`, {
            method: "PUT",
            credentials: 'include',
            body: formdata
        })

            .then(res => res.json())
            .then(data => {
                console.log("success", data)
                if (data.success) {
                    alert("Product updated successfully")
                    navigate("/adminviewpage")
                } else {
                    alert("Update failed")
                }
            }).catch(err => console.log("error in put", err))
    }

    return (

        <div>
            {/* <Navbar /> */}
            <div className='flex items-center justify-center h-screen'>

                <form action="" className='border p-6' onSubmit={handlesubmit}>
                    <h1 className='text-2xl text-center p-4'>edit </h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="productname" className='my-3 text-xl'>
                                        Product Name:
                                    </label>
                                </td>

                                <td>
                                    <input type="text"
                                        className='border border-black p-1 my-2 rounded rounded-1'
                                        value={productcreate.productname}
                                        name='productname'
                                        onChange={handlechange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label htmlFor="productdescription" className='my-3 text-xl'>
                                        Product Description:
                                    </label>
                                </td>

                                <td>
                                    <input type="text"
                                        className='border border-black p-1 my-2 rounded rounded-1'
                                        value={productcreate.productdescription}
                                        name='productdescription'
                                        onChange={handlechange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label htmlFor="productprice" className='my-3 text-xl'>
                                        Product Price:
                                    </label>
                                </td>

                                <td>
                                    <input type="number"
                                        className='border border-black p-1 my-2 rounded rounded-1'
                                        value={productcreate.productprice}
                                        name='productprice'
                                        onChange={handlechange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label htmlFor="stock" className='my-3 text-xl'>
                                        Stock:
                                    </label>
                                </td>

                                <td>
                                    <input type="number"

                                        className='border border-black p-1 my-2 rounded rounded-1'
                                        value={productcreate.stock}
                                        name='stock'
                                        onChange={handlechange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label htmlFor="image" className='my-3 text-xl'>
                                        Product Image:
                                    </label>
                                </td>

                                <td>
                                    <input type="file"
                                        className='border w-48 p-1 border-black rounded-1'
                                        name='image'
                                        accept='image/*'
                                        onChange={handlechange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='flex justify-content-center my-3'>
                        <button className=' btn btn-primary'>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
