

import React, { useContext } from 'react';
import { UserProvider } from '../context/Usercontext';
import { Navigate } from 'react-router-dom';

const Privetroutes = ({ children }) => {
    const { currentUser, speener } = useContext(UserProvider)
    if (speener) {
        return <div className='flex items-center justify-center w-full h-screen'><span className="loading loading-spinner loading-lg"></span></div>
    }

    if (currentUser) {
        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default Privetroutes;