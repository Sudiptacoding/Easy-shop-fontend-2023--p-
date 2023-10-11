import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
// import Footer from '../components/Footer';
// import Header from '../components/Header';

const Root = () => {
    return (
        <div className='max-w-[1900px] border mx-auto'>
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
            <Toaster />
        </div>
    );
};

export default Root;