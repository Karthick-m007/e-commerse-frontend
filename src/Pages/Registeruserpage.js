import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Registeruserpage() {
    const navigate = useNavigate()

    const [register, setRegister] = useState({
        username: "",
        email: "",
        password: "",
        role: ""
    })

    function handlechange(e) {
        const { name, value } = e.target
        setRegister({
            ...register,
            [name]: value
        })
    }
    const url = process.env.REACT_APP_BACKEND

    function handlesubmit(e) {
        e.preventDefault()

        fetch(`${url}create-new-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                username: register.username,
                email: register.email,
                password: register.password,
                role: register.role
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setRegister({
                    username: "",
                    email: "",
                    password: "",
                    role: ""
                })
            })
            .catch(err => console.log('error in register fetch', err))
    }
    return (
        <div className='border mx-auto w-96 mt-32'>


            <h1 className='text-center my-3 text-2xl'>Registration</h1>
            <form action="" className='flex flex-col align-items-center' onSubmit={handlesubmit}>

                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="username" className='my-3 text-xl'>User Name:</label>
                            </td>

                            <td>
                                <input type="text"
                                    className='border rounded-1 border-black p-1 my-2'
                                    name='username'
                                    value={register.username}
                                    onChange={handlechange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="email" className='my-3 text-xl'>Email:</label>
                            </td>

                            <td>
                                <input type="email"
                                    className='border rounded-1 border-black p-1 my-2'
                                    name='email'
                                    value={register.email}
                                    onChange={handlechange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="password" className='text-xl my-3'>Password:</label>
                            </td>

                            <td>
                                <input type="password"
                                    className='border rounded-1 border-black p-1 my-2'
                                    name='password'
                                    value={register.password}
                                    onChange={handlechange}
                                />
                            </td>
                        </tr>


                        <tr>
                            <td>
                                <label htmlFor="role" className='text-xl my-3'>Role:</label>
                            </td>

                            <td>
                                <select name="role" id="" className='border rounded-1 border-black p-1 my-2' onChange={handlechange} value={register.role}
                                >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>

                </table>
                <div className='my-3 flex justify-content-center'>
                    <button type='submit' className='btn btn-success '>
                        Register
                    </button>
                </div>
                <span onClick={() => navigate('/login')} className='text-blue-800 float-end text-lg my-3 cursor-pointer'>Already have account... Login...!</span>
            </form>

        </div>
    )
}
