import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserProvider } from '../context/Usercontext';
import StarRatings from 'react-star-ratings';
import { removeCard } from '../../public/Utilitis/Likelocalstorage';
import { removeCardData } from '../../public/Utilitis/AddtocardLocalstorage';
import swal from 'sweetalert';

const Header = (props) => {
    const { likehandel, cardhandel, allProductData, setLikeHandel, setCardHandel, currentUser, firstShow, logOut } = useContext(UserProvider)


    const check = props.isShow;

    const [data, setData] = useState([])
    const [search, setSearch] = useState('');
    const handelLogOut = () => {
        logOut()
            .then(() => {
                swal("Good job!", "Signout sucessfully!", "success");
            }).catch(() => {
                swal("Opps!", "Somethings rong!", "error");
            });
    }

    useEffect(() => {
        fetch('https://easy-ruby-macaw-cape.cyclic.app/')
            .then(response => response.json())
            .then(json => {
                setData(json)
            })
    }, [])


    const handelCardModal = () => {
        document.getElementById('my_modal_1').showModal();
    }

    const handelLikeModal = () => {
        document.getElementById('my_modal_4').showModal();
    }


    const handelDeletLike = (id) => {
        removeCard(id)
        const filterV = likehandel.filter(item => item._id !== id)
        setLikeHandel(filterV)

    }

    const handelDeletCard = (id) => {
        removeCardData(id)
        const filterV = cardhandel.filter(item => item._id !== id)
        setCardHandel(filterV)

    }

    const navLink = <>
        <li ><NavLink to='/'
            className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? "text-red-400" : "text-white"
            }
        >Home</NavLink></li>

        <li><NavLink to='/about'
            className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? "text-red-400" : "text-white"
            }
        >About</NavLink></li>
        <li><NavLink to='/admin'
            className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? "text-red-400" : "text-white"
            }
        >Admin</NavLink></li>

    </>
    return (
        <div>
            <div className="relative navbar">
                <div className="navbar-start">
                    <div className="z-10 text-white dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-600 text-white rounded-box w-52">
                            {navLink}
                        </ul>
                    </div>
                    <Link to='/'><a className="hidden text-xl text-white normal-case btn btn-ghost md:block">EasyShop</a></Link>
                </div>
                <div className="hidden navbar-center lg:flex">
                    <ul className="px-1 menu menu-horizontal">
                        {navLink}
                    </ul>
                </div>
                <div className="gap-3 navbar-end">

                    {
                        !check && <>
                            <div className="form-control">
                                <input onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Category brand title ....." className="input input-bordered w-24 md:w-[350px]" />
                            </div>
                            <label tabIndex={0} className="text-white bg-transparent border-none btn hover:bg-transparent btn-circle">
                                <div onClick={handelCardModal} className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item w-[11px]">{cardhandel.length}</span>
                                </div>
                            </label>
                            <button className="text-white bg-transparent border-none btn hover:bg-transparent btn-circle">
                                <div onClick={handelLikeModal} className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                    <span className="badge badge-xs badge-white w-[15px] h-[15px] indicator-item">{likehandel.length}</span>
                                </div>
                            </button></>
                    }

                    <div className="flex items-center gap-3">
                        {
                            currentUser ? <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={currentUser.photoURL || firstShow} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Email
                                            <span className="p-3 text-white rounded-full badge bg-primary">{currentUser.emailVerified ? 'valid' : 'invalid'}</span>
                                        </a>
                                    </li>
                                    <li><a>{currentUser.displayName}</a></li>
                                    <li onClick={handelLogOut}><a>Logout</a></li>
                                </ul>
                            </div> :
                                <Link to='/login'> <a className="text-black btn">Login</a></Link>
                        }
                    </div>
                </div>
            </div>
            {
                data?.length > 0 && <div className='absolute z-10 w-auto h-auto gap-5 top-18 search-bg'>
                    {
                        data.filter((user) => {
                            return search.toLowerCase() === '' ? '' : (user.category.toLowerCase().includes(search) || user.brand.toLowerCase().includes(search) || user.title.toLowerCase().includes(search))
                        }).map((item, i) => {
                            return <Link key={i} to={`/moredetails/${item?._id}`} >
                                <div >
                                    <div className='flex items-center justify-between gap-5 p-5 mx-auto lg:w-3/4'>
                                        <div className='w-1/2 lg:3/4'>
                                            <h2 className="text-sm tracking-widest text-white title-font">BRAND NAME</h2>
                                            <h1 className="mb-3 text-3xl font-medium text-white title-font">{item.brand}</h1>
                                            <h2 className="text-sm tracking-widest text-white title-font">CATEGORY NAME</h2>
                                            <h1 className="mb-3 text-2xl font-medium text-white title-font">{item.category}</h1>
                                            <div className="flex mb-4">
                                                <StarRatings
                                                    rating={item.rating}
                                                    starDimension="25px"
                                                    starSpacing="6px"
                                                    starRatedColor="#ffa300"
                                                />
                                                <span className="ml-3 text-white">4 Reviews</span>
                                            </div>
                                            <p className="leading-relaxed text-white">{item.description}</p>
                                            <div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-200">
                                                <Link to={`/moredetails/${item._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    Read more
                                                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='w-1/2 lg:w-1/4'>
                                            <img className='w-auto h-[273px]' src={item.thumbnail} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        })
                    }

                </div>
            }

            {/* modal section like section */}

            <dialog id="my_modal_1" className="modal">
                <div className="w-11/12 max-w-5xl shadow-2xl modal-box card-bg">
                    <div>
                        {
                            cardhandel.length === 0 ? <div className='flex items-center justify-center'><p className='text-xl font-bold text-white'>No card added...</p></div> : <div>   {
                                cardhandel.map((item, i) => {
                                    return <Link key={i} to={`/moredetails/${item?._id}`} >
                                        <div >
                                            <div className='flex items-center justify-between gap-5 p-5 mx-auto '>
                                                <div className='w-1/2 lg:3/4'>
                                                    <h2 className="text-sm tracking-widest text-white title-font">BRAND NAME</h2>
                                                    <h1 className="mb-3 text-3xl font-medium text-white title-font">{item?.brand}</h1>
                                                    <h2 className="text-sm tracking-widest text-white title-font">CATEGORY NAME</h2>
                                                    <h1 className="mb-3 text-2xl font-medium text-white title-font">{item?.category}</h1>
                                                    <div className="flex mb-4">
                                                        <StarRatings
                                                            rating={item?.rating}
                                                            starDimension="25px"
                                                            starSpacing="6px"
                                                            starRatedColor="#ffa300"
                                                        />
                                                        <span className="ml-3 text-white">{item?.rating} Reviews</span>
                                                    </div>
                                                    <p className="leading-relaxed text-white">{item?.description}</p>
                                                    <div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-200">
                                                        <Link to={`/moredetails/${item._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                            Read more
                                                            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                            </svg>
                                                        </Link>
                                                        <Link onClick={() => handelDeletCard(item._id)} className="inline-flex items-center px-3 py-2 ml-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                            Remove
                                                            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className='w-1/2 lg:w-1/4'>
                                                    <img className='w-auto h-[273px]' src={item?.thumbnail} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                })
                            }</div>
                        }



                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* card modal */}

            <dialog id="my_modal_4" className="modal">
                <div className="w-11/12 max-w-5xl shadow-md modal-box bannerbg">
                    <div>
                        {
                            likehandel.length === 0 ? <div className='flex items-center justify-center'><p className='text-xl font-bold text-white'>No like added..</p></div> : <div> {
                                likehandel.map((item, i) => {
                                    return <Link key={i} to={`/moredetails/${item._id}`} >
                                        <div >
                                            <div className='flex items-center justify-between gap-5 p-5 mx-auto '>
                                                <div className='w-1/2 lg:3/4'>
                                                    <h2 className="text-sm tracking-widest text-white title-font">BRAND NAME</h2>
                                                    <h1 className="mb-3 text-3xl font-medium text-white title-font">{item.brand}</h1>
                                                    <h2 className="text-sm tracking-widest text-white title-font">CATEGORY NAME</h2>
                                                    <h1 className="mb-3 text-2xl font-medium text-white title-font">{item.category}</h1>
                                                    <div className="flex mb-4">
                                                        <StarRatings
                                                            rating={item.rating}
                                                            starDimension="25px"
                                                            starSpacing="6px"
                                                            starRatedColor="#ffa300"
                                                        />
                                                        <span className="ml-3 text-white">{item.rating} Reviews</span>
                                                    </div>
                                                    <p className="leading-relaxed text-white">{item.description}</p>
                                                    <div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-200">
                                                        <Link to={`/moredetails/${item._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                            Read more
                                                            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                            </svg>
                                                        </Link>

                                                        <Link onClick={() => handelDeletLike(item._id)} className="inline-flex items-center px-3 py-2 ml-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                            Remove
                                                            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                            </svg>
                                                        </Link>


                                                    </div>
                                                </div>
                                                <div className='w-1/2 lg:w-1/4'>
                                                    <img className='w-auto h-[273px]' src={item.thumbnail} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                })
                            }</div>
                        }
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>




        </div>
    );
};

export default Header;
