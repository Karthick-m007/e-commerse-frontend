import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Productcreatepage() {
    const navigate=useNavigate()
    const [productcreate, setProductcreate] = useState({
        productname: "",
        productdescription: "",
        productprice: "",
        stock: "",
        image: null
    })

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

    const formdata = new FormData()
    formdata.append('product_name', productcreate.productname)
    formdata.append('product_description', productcreate.productdescription)
    formdata.append('product_price', productcreate.productprice)
    formdata.append('stock', productcreate.stock)
    formdata.append('image', productcreate.image)

    const url = process.env.REACT_APP_BACKEND
    function handlesubmit(e) {
        e.preventDefault()
        fetch(`${url}create-new-product`, {
            method: "POST",
            credentials: 'include',
            body: formdata
        })

            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProductcreate({
                    productname: "",
                    productdescription: "",
                    productprice: "",
                    stock: "",
                    image: null
                })
            })
            .catch(err => console.log("error in the create product fetch", err))
    }
    return (
        <div className='flex items-center justify-center h-screen'>

            <form action="" className='border p-6' onSubmit={handlesubmit}>
                <h1 className='text-2xl text-center p-4'>Create New     Product</h1>
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
                    <button className=' btn btn-primary' onClick={(() => navigate('/adminviewpage'))}>
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    )
}

