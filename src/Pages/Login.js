import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'

export default function Login({ setIsLoggedIn }) {

    const [login, setLogin] = useState({
        email: "", password: ""
    })
    const navigate = useNavigate()
    const url = process.env.REACT_APP_BACKEND
    console.log(url)

    function handlechange(e) {
        const { name, value } = e.target
        setLogin({
            ...login,
            [name]: value
        })
    }

    function handlesubmit(e) {
        e.preventDefault()

        fetch(`${url}login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: login.email,
                password: login.password
            })
        })

            .then(res => res.json())
            .then(data => {
                console.log(data)
                setIsLoggedIn(true)
                if (data.users?.role === "admin") {
                    navigate('/adminviewpage')
                }
                else if(data.users?.role==="user") {
                    navigate('/')
                }
                else{
                    alert("plaese register and continue")
                    navigate('/register')
                }
            })
            .catch((err) => console.log("error in front end fetvh login", err))

    }

    return (
        <div>

            {/* <Navbar /> */}
            <div className=' border mx-auto w-96 '>

                <form action="" onSubmit={handlesubmit}>
                    <h1 className='text-2xl text-center my-3'>Login Page</h1>

                    <table className=' mx-auto '>
                        <tbody>
                            <tr >
                                <td >
                                    <label htmlFor="email" className='text-xl p-3'>Email:</label>

                                </td>

                                <td>
                                    <input type="text" className='border border-black rounded-1 my-2 p-1'
                                        name='email'
                                        value={login.email}
                                        onChange={handlechange}

                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label htmlFor="password" className='text-xl p-2'>Password:</label>

                                </td>

                                <td>
                                    <input type="password" className='border border-black rounded-1 my-3 p-1'
                                        name='password'
                                        value={login.password}
                                        onChange={handlechange}
                                    />
                                </td>
                            </tr>



                        </tbody>
                    </table>
                    <div className='flex justify-content-center mt-3 mb-2'>
                        <button type='submit' className='btn btn-success'>
                            Login
                        </button>
                    </div>

                    <span className='flex justify-content-center cursor-pointer text-lg text-blue-800 mb-3' onClick={() => navigate('/register')}>New Register..!</span>

                </form>
            </div>
        </div>
    )
}

