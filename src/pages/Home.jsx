import React, { useContext, useEffect, useState } from 'react';
import { UserProvider } from '../context/Usercontext';
import Banner from '../components/Banner';

import { Link } from 'react-router-dom';
import PricingCard from '../components/PricingCard';
import ProductFeacher from '../components/ProductFeacher';
import ProductFeacher2 from '../components/ProductFeacher2';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DiscountCard from '../components/DiscountCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    const { allProductData, currentUser } = useContext(UserProvider)

    const filter = allProductData?.map(item => item.category)
    const category = [...new Set(filter), 'All'];

    const [product, setProduct] = useState([])
    const [duplicate, setDuplicate] = useState([]);

    const [seeALl, setSeeAll] = useState(false)

    useEffect(() => {
        fetch('https://easy-ruby-macaw-cape.cyclic.app/')
            .then(res => res.json())
            .then(data => {
                setDuplicate(data)
                setProduct(data)
            })
    }, [])
    const handelSetCata = (cata) => {
        if (cata === 'All') {
            setProduct(duplicate)
        } else {
            const filterCata = duplicate.filter(cate => cate.category === cata)
            setProduct(filterCata)
        }
    }
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,

    };


    return (
        <div>
            <div className='bg-black'><Header></Header></div>
            {currentUser && <div className='bg-black flex items-center justify-center bg-fixed w-full h-[20vh] '><h1 className='pb-10 text-2xl font-bold text-white'>Welcome to {currentUser.displayName}</h1></div>}
            <Banner></Banner>

            <div className='card-bg'>
                <div >
                    {
                        category.length > 2 && <div className='flex flex-wrap items-center justify-center gap-2 py-5'>
                            {
                                category?.map((cata, i) => {
                                    return <div key={i} className=''>
                                        <div onClick={() => handelSetCata(cata)} className='px-8 text-white btn btn-primary text-md'>{cata}</div>
                                    </div>
                                })
                            }
                        </div>
                    }
                </div>
                {/* show card */}
                <div>
                    {
                        !seeALl ? <div className='grid grid-cols-1 gap-5 p-10 lg:grid-cols-4 md:grid-cols-2'>
                            {
                                product?.slice(0, 8).map((card, i) => {
                                    return <div data-aos="zoom-in" key={i}>
                                        <div className="relative overflow-hidden rounded-md shadow-lg">
                                            <div className="relative group">
                                                <img src={card?.thumbnail} alt="Image" className="w-full h-[400px] transform transition-transform duration-300 group-hover:scale-110" />
                                                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                                                    <div className=''>
                                                        <h1><Link to={`/moredetails/${card._id}`}><button className='btn'>More Details</button></Link></h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div> : <div className='grid grid-cols-1 gap-5 p-10 lg:grid-cols-4 md:grid-cols-1'>
                            {
                                product?.slice(0, product.length).map((card, i) => {
                                    return <div key={i}>
                                        <div className="relative overflow-hidden rounded-md shadow-lg">
                                            <div className="relative group">
                                                <img src={card.thumbnail} alt="Image" className="w-full h-[400px] transform transition-transform duration-300 group-hover:scale-110" />
                                                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                                                    <div className=''>
                                                        <h1><Link to={`/moredetails/${card._id}`}><button className='btn'>More Details</button></Link></h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    }
                    <div className='flex items-center justify-center pb-8'>
                        {
                            !seeALl && <div>
                                {
                                    product?.length >= 8 && <button onClick={() => setSeeAll(!seeALl)} className='text-white btn btn-primary'>See All</button>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className='price-card'>
                <Slider {...settings}>
                    {
                        allProductData?.map((item, i) => {
                            return <div key={i}>

                                <div class="w-full p-4 text-center bg-[#00000057] sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                    <span className=''><img className='mx-auto w-[200px] h-[200px] rounded-full' src={item.thumbnail} alt="" /></span>
                                    <h5 class="mb-2 text-3xl font-bold dark:text-white text-white">{item.title}</h5>
                                    <p class="mb-5 text-base text-white sm:text-lg dark:text-gray-400">{item.description}</p>
                                    <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                        <a href="#" class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                            <svg class="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                                            <div class="text-left">
                                                <div class="mb-1 text-xs">Download on the</div>
                                                <div class="-mt-1 font-sans text-sm font-semibold">Mac App Store</div>
                                            </div>
                                        </a>
                                        <a href="#" class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                            <svg class="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path></svg>
                                            <div class="text-left">
                                                <div class="mb-1 text-xs">Get in on</div>
                                                <div class="-mt-1 font-sans text-sm font-semibold">Google Play</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        })
                    }
                </Slider>
            </div>


            <div  className='mb-20'>
                <div className='flex items-center justify-center py-10 '><h1 className='text-4xl font-bold underline underline-offset-4'>All Product Overview</h1></div>
                <div className='grid grid-cols-1 gap-6 p-5 lg:grid-cols-4 md:grid-cols-2 lg:px-10 '>
                    {
                        allProductData?.map((item, i) => <DiscountCard item={item} key={i}></DiscountCard>)
                    }
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;