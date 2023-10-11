
import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';

const AllbuyProductList = () => {

    const [moredata, setMore] = useState({})
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('https://easy-ruby-macaw-cape.cyclic.app/buyproduct')
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])

    const handelView = (item) => {
        setMore(item)
        document.getElementById('my_modal_2').showModal()
    }

    if (data.length < 0) {
        return <div className='flex items-center justify-center w-full'><span className="loading loading-spinner loading-2xl"></span></div>
    }
    else {
        return (
            <div>
                <div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
                            <div>
                                <div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>

                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Stock
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Rating
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        delet
                                    </th>
                                </tr>
                            </thead>

                            {
                                data?.map((item, i) => {
                                    return <tbody key={i} className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                <img className="w-10 h-10 rounded-full" src={item?.thumbnail} alt="Jese image" />
                                                <div className="pl-3">
                                                    <div className="text-base font-semibold">{item?.title}</div>
                                                    <div className="font-normal text-gray-500">{item?.brand}</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {item?.price} $
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className={`h-2.5 w-2.5 rounded-full bg-green-500 mr-2 ${item?.stock > 10 ? 'bg-green-500' : 'bg-primary'}`}></div> {item?.stock}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className={`font-medium  hover:underline ${item?.rating < 2.5 ? 'text-red-600' : 'text-primary'}`}>{item?.rating} ∗</a>
                                            </td>
                                            <td onClick={() => handelView(item)} className="px-6 py-4 cursor-pointer">
                                                <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View details</a>
                                            </td>
                                        </tr>
                                    </tbody>


                                })
                            }

                        </table>
                    </div>

                </div>

                {/* You can open the modal using document.getElementById('ID').showModal() method */}

                <dialog id="my_modal_2" className="modal">
                    <div className="w-11/12 max-w-5xl modal-box">
                        <section class="font-poppins dark:bg-gray-800">
                            <div class="max-w-6xl px-4 mx-auto">
                                <div class="flex flex-wrap mb-24 -mx-4 bg-white px-6 rounded-md">
                                    <div class="w-full px-4 pt-10 mb-8 md:w-1/2 md:mb-0">
                                        <div class="sticky top-0 overflow-hidden ">
                                            <div class="relative mb-6 lg:mb-10 lg:h-96">
                                                <a class="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2" href="#">

                                                </a>
                                                <img class="object-contain w-full" src={moredata?.thumbnail} alt="" />
                                                <a class="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2" href="#">

                                                </a>
                                            </div>
                                            <div class="flex-wrap hidden -mx-2 md:flex">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full px-4 md:w-1/2 ">
                                        <div class="lg:pl-20">
                                            <div class="mb-6 ">
                                                <span class="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                                    {moredata?.brand ? moredata?.brand : 'No data'}</span>
                                                <h2 class="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                                    {moredata?.description ? moredata?.description : 'No data'}
                                                </h2>
                                                <div class="flex flex-wrap items-center mb-6">
                                                    <ul class="flex mb-4 mr-2 lg:mb-0">

                                                        <StarRatings
                                                            rating={moredata?.rating}
                                                            starDimension="25px"
                                                            starSpacing="6px"
                                                            starRatedColor="#ffa300"
                                                        />
                                                    </ul>
                                                    <a class="mb-4 text-xs underline hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0" href="#">
                                                        {moredata?.rating}  View the {moredata.brand ? moredata?.brand : 'No Data'} store
                                                    </a>
                                                </div>
                                                <p class="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                                    <span>Rs.{moredata?.price ? moredata?.price : 'No data'}.00</span>
                                                    <span class="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">Rs.{moredata?.discountPercentage}%</span>
                                                </p>
                                            </div>
                                            <div class=" border-t border-b border-gray-200 dark:border-gray-700">
                                                <span class="text-base text-gray-600 dark:text-gray-400">In Stock  <span class="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                                    {moredata?.stock ? moredata?.stock : 'No item'}</span></span>
                                                <p class="mt-2 text-sm text-blue-500 dark:text-blue-200">Ships from  &nbsp;
                                                    <span class="text-gray-600 dark:text-gray-400">
                                                        {moredata?.title}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section >
                    </div>
                </dialog>
            </div>
        );
    }




};

export default AllbuyProductList;