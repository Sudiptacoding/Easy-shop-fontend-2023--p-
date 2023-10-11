import React, { useContext } from 'react';
import StarRatings from 'react-star-ratings';
import { addDataCard, getDataCard } from '../../public/Utilitis/AddtocardLocalstorage';
import toast from 'react-hot-toast';
import { UserProvider } from '../context/Usercontext';

const DiscountCard = ({ item }) => {
    const { cardhandel, setCardHandel } = useContext(UserProvider)

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

    return (
        <div>
            <div data-aos="zoom-in" className="relative flex flex-col w-full overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
                <a className="relative flex mt-3 overflow-hidden h-60 rounded-xl" href="#">
                    <img className="object-cover w-full" src={item.thumbnail} alt="product image" />
                    <span className="absolute top-0 left-0 px-2 m-2 text-sm font-medium text-center text-white bg-black rounded-full">{item.discountPercentage}% OFF</span>
                </a>
                <div className="px-5 pb-5 mt-4">
                    <a href="#">
                        <h5 className="text-xl tracking-tight text-slate-900">{item.title}</h5>
                    </a>
                    <div className="flex items-center justify-between mt-2 mb-5">
                        <p>
                            <span className="text-3xl font-bold text-slate-900">${item.price}</span>
                            <span className="text-sm line-through text-slate-900">${((item.price * item.discountPercentage) / 100).toFixed(2)}</span>
                        </p>
                        <div className="flex items-center">


                            <StarRatings
                                rating={item.rating}
                                starDimension="20px"
                                starSpacing="1px"
                                starRatedColor="#ffa300"
                            />


                            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{item.rating}</span>
                        </div>
                    </div>
                    <a onClick={() => handelAddData(item)} className="cursor-pointer flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart</a
                    >
                </div>
            </div>

        </div>
    );
};

export default DiscountCard;