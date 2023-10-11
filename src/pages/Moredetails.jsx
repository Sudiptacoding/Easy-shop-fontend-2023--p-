import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import StarRatings from 'react-star-ratings';
import { addData, getData } from '../../public/Utilitis/Likelocalstorage';
import { UserProvider } from '../context/Usercontext';
import { addDataCard, getDataCard } from '../../public/Utilitis/AddtocardLocalstorage';
import toast from 'react-hot-toast';
import swal from 'sweetalert';



const Moredetails = () => {
    const { likehandel, setLikeHandel, cardhandel, setCardHandel } = useContext(UserProvider)
    const [moredata, setMoreData] = useState(null)
    const { id } = useParams();


    useEffect(() => {
        fetch(`https://easy-ruby-macaw-cape.cyclic.app/user/${id}`)
            .then(res => res.json())
            .then(data => {
                setMoreData(data)
            })
    }, [id])

    const handelLike = (id) => {
        const localData = getData();
        const match = localData.find(local => local === id._id)
        if (match) {
            toast.error("This product alrady your favourite")
        } else {
            addData(id._id)
            setLikeHandel([...likehandel, id])
            toast.success('Successfully liked this product!')
        }
    }
    const handelAddData = (id) => {
        const localData = getDataCard();
        const match = localData.find(local => local === id._id)
        if (match) {
            toast.error("Your are alrady added this product")
        } else {
            addDataCard(id._id)
            setCardHandel([...cardhandel, id])
            toast.success('Successfully card added!')
        }
    }

    const navigate = useNavigate()
    const handelBycard = (moredata) => {
        fetch('https://easy-ruby-macaw-cape.cyclic.app/buyproduct', {
            method: 'POST',
            body: JSON.stringify(moredata),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then(() => {
                swal("Good job!", "You are sucessfully buy this product!", "success");
                navigate('/')
            });
    }

    if (!moredata) {
        return <div className='flex items-center justify-center w-full h-screen'><span className="loading loading-spinner loading-lg"></span></div>
    } else {
        return (

            < div className='details-bg' >
                <Header></Header>
                <section class="py-10 font-poppins dark:bg-gray-800">
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
                            <div class="w-full px-4 md:w-1/2 pt-10">
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
                                    <div class="mb-6">
                                        <h2 class="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">System Specs :</h2>
                                        <div class="bg-gray-100 dark:bg-gray-700 rounded-xl">
                                            <div class="p-3 lg:p-5 ">
                                                <div class="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                                                    <div class="flex flex-wrap justify-center gap-x-10 gap-y-4">
                                                        <div><img className='h-[300px]' src={moredata.thumbnail} alt="" /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                                        <span class="text-base text-gray-600 dark:text-gray-400">In Stock  <span class="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                            {moredata?.stock ? moredata?.stock : 'No item'}</span></span>
                                        <p class="mt-2 text-sm text-blue-500 dark:text-blue-200">Ships from  &nbsp;
                                            <span class="text-gray-600 dark:text-gray-400">
                                                {moredata?.title}
                                            </span>
                                        </p>
                                    </div>
                                    <div class="mb-6 "></div>
                                    <div class="flex flex-wrap items-center mb-6">
                                        <div class="mb-4 mr-4 lg:mb-0">
                                            <div class="w-28">
                                                <div class="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                                                    <button class="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                                                        <span class="m-auto text-2xl font-thin">-</span>
                                                    </button>
                                                    <input type="number" class="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black" placeholder="1" />
                                                    <button class="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                                                        <span class="m-auto text-2xl font-thin">+</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-4 lg:mb-0">
                                            <button onClick={() => handelLike(moredata)} class="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-gray-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class=" bi bi-heart" viewBox="0 0 16 16">
                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>
                                        <a onClick={() => handelAddData(moredata)} href="#" class="w-full px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-blue-600 hover:text-gray-100 lg:w-1/2 rounded-xl">
                                            Add to cart
                                        </a>
                                    </div>
                                    <div class="flex gap-4 mb-6">
                                        <Link onClick={() => handelBycard(moredata)} href="#" class="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                                            Buy now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </ div>
        );
    }




};

export default Moredetails;