import React, { useContext, useEffect, useState } from 'react';
import { UserProvider } from '../context/Usercontext';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const PricingCard = () => {
    // const { allProductData } = useContext(UserProvider)

    const [sortValue, setSortValue] = useState([])

    useEffect(() => {
        fetch('https://easy-ruby-macaw-cape.cyclic.app/')
            .then(res => res.json())
            .then(data => {
                const sortValue = data?.products?.sort((a, b) => a.price - b.price)
                setSortValue(sortValue)
            })
    }, [])





    return (
        <div>
            {/* {
                sortValue?.length === 0 ? <div className='flex items-center justify-center w-full'><span className="loading loading-spinner loading-lg"></span></div> : <div className="flex flex-wrap items-center justify-center py-10 bg-gray-200 ">
                    <div className="container flex flex-col justify-center sm:flex-col lg:flex-row xl:flex-row md:flex-row items center ">
                        <div className="z-30 w-full px-8 py-12 bg-white sm:py-12 md:py-6 lg:py-6 xl:py-6 sm:w-full">
                            <h1 className="text-xl font-semibold text-gray-500 ">Low price</h1>
                            <div className="py-4 text-center px-7">
                                <h1 className="text-4xl font-black text-gray-700">${sortValue[0]?.price}.00</h1>
                                <p className="mt-2 text-gray-500">{sortValue[0]?.brand}</p>
                                <img src={sortValue[0]?.thumbnail} alt="" />
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="mt-3 text-center">
                                <p className="text-sm text-gray-400">
                                    {sortValue[0]?.description}
                                </p>
                            </div>
                            <Link to={`/moredetails/${sortValue[0]?._id}`}><button className="w-full py-2 mt-6 mb-3 font-semibold text-white duration-200 bg-gray-700 hover:shadow-xl hover:bg-gray-800">Show Details</button></Link>
                        </div>
                        <div className="z-40 w-full px-8 py-12 transform shadow-none sm:py-12 md:py-6 lg:py-6 xl:py-6 sm:w-full search-bg scale-1 sm:scale-1 md:scale-105 lg:scale-105 xl:scale-105 sm:shadow-none md:shadow-xl lg:shadow-xl xl:shadow-xl">
                            <h1 className="text-xl font-semibold text-white ">Top price</h1>
                            <div className="py-4 text-center px-7">
                                <h1 className="text-4xl font-black text-white">${sortValue[sortValue.length - 1].price}.00</h1>
                                <p className="mt-2 text-white text-opacity-50">{sortValue[sortValue.length - 1].brand}</p>
                                <img src={sortValue[sortValue.length - 1].thumbnail} alt="" />

                            </div>
                            <div className="h-px bg-purple-400"></div>
                            <div className="mt-3 text-center">
                                <p className="pb-10 text-sm text-white text-opacity-80">
                                    {sortValue[sortValue.length - 1]?.description}
                                </p>
                                <StarRatings
                                    rating={sortValue[sortValue.length - 1]?.rating}
                                    starDimension="25px"
                                    starSpacing="6px"
                                    starRatedColor="#ffa300"
                                />
                            </div>
                            <Link to={`/moredetails/${sortValue[sortValue.length - 1]._id}`}><button className="w-full py-2 mt-6 mb-3 font-semibold text-white duration-200 bg-gray-700 hover:shadow-xl hover:bg-gray-800">Show Details</button></Link>
                        </div>
                        <div className="z-30 w-full px-8 py-12 bg-white sm:py-12 md:py-6 lg:py-6 xl:py-6 sm:w-full">
                            <h1 className="text-xl font-semibold text-gray-500 ">Mead price</h1>
                            <div className="py-4 text-center px-7">
                                <h1 className="text-4xl font-black text-gray-700">${sortValue[sortValue.length / 2]?.price}.00</h1>
                                <p className="mt-2 text-gray-500">{sortValue[sortValue.length / 2].brand}</p>
                                <img src={sortValue[sortValue.length / 2]?.thumbnail} alt="" />

                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="mt-3 text-center">
                                <p className="text-sm text-gray-400">
                                    {sortValue[sortValue.length / 2]?.description}
                                </p>
                            </div>
                            <Link to={`/moredetails/${sortValue[sortValue.length / 2]?._id}`}><button className="w-full py-2 mt-6 mb-3 font-semibold text-white duration-200 bg-gray-700 hover:shadow-xl hover:bg-gray-800">Show Details</button></Link>
                        </div>
                    </div>

                </div>
            } */}

        </div>
    );
};

export default PricingCard;