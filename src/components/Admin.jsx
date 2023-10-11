import React, { useContext, useState } from 'react';
import { UserProvider } from '../context/Usercontext';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [passcheck, setPasscheck] = useState(false)

    const navigate = useNavigate()
    const handelAdmin = (e) => {
        setPasscheck(false)
        e.preventDefault()
        const pass = e.target.pass.value;
        if (pass === 'admin123') {
            swal("Good job!", "You clicked the button!", "success");
            navigate('/dashbord')
        } else {
            setPasscheck(true)
        }
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <div class="w-full max-w-xs">
                <form onSubmit={handelAdmin} class="bg-white border shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Please type [ admin123 ] for password
                        </label>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="">
                            Password
                        </label>
                        <input name='pass' class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="******************" />
                        {passcheck && <p class="text-red-500 text-xs italic">Please choose a password.</p>}
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Admin;