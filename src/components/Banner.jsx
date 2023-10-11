import React, { useContext } from 'react';
import { UserProvider } from '../context/Usercontext';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import Header from './Header';

const Banner = () => {
    const { allProductData } = useContext(UserProvider)

    return (
        <div className='bannerbg'>
            {/* <Header className=''></Header> */}
            <Zoom scale={1.4}>
                {allProductData?.map((item, i) => {
                    return <div key={i} className='flex items-center justify-center flex-col lg:flex-row w-full lg:h-[80vh] max-h-screen'>
                        <div className="flex items-center justify-start w-full p-5 each-slide-effect lg:w-1/2 lg:pl-52">
                            <div>
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
                        </div>
                        <div className='w-full lg:w-1/2'>
                            <div className="each-slide-effect lg:p-32">
                                <img className='w-full h-[500px] rounded-lg' src={item.thumbnail} alt="" />
                            </div>
                        </div>
                    </div>
                })}
            </Zoom>
        </div>
    );
};

export default Banner;










// import React, { useContext, useState } from 'react';
// import Slider from 'react-slick';
// import { UserProvider } from '../context/Usercontext';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const Banner = () => {
//     const { allProductData } = useContext(UserProvider)
//     console.log(allProductData)

//     const [nav1, setNav1] = useState();
//     const [nav2, setNav2] = useState();
//     return (

//         <div className='total-area'>
//             <div className=''>
//                 <div className='Card-text-section'>
//                     <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
//                         {
//                             allProductData.map((item, i) => {
//                                 return <div>
//                                     {item.description}
//                                 </div>
//                             })
//                         }
//                     </Slider>
//                 </div>

//                 <div className='Card-image-section'>
//                     <Slider
//                         asNavFor={nav1}
//                         ref={(slider2) => setNav2(slider2)}
//                         slidesToShow={1}
//                         swipeToSlide={true}
//                         focusOnSelect={true}
//                         autoplay={true}
//                         autoplaySpeed={5000}
//                     >
//                         {
//                             allProductData.map((item, i) => {
//                                 return <div>
//                                     <img src={item.images[0]} alt="" />
//                                 </div>
//                             })
//                         }
//                     </Slider>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Banner;