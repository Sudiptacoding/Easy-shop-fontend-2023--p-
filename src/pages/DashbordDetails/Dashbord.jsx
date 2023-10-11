import React, { useContext, useEffect, useState } from 'react';
import { UserProvider } from '../../context/Usercontext';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const Dashbord = () => {
    const [allbuyproduct, setAllBuyProduct] = useState([])
    const { currentUser } = useContext(UserProvider)

    useEffect(() => {
        fetch('https://easy-ruby-macaw-cape.cyclic.app/buyproduct')
            .then(res => res.json())
            .then(data => {
                setAllBuyProduct(data)
            })
    }, [])

 
    return (
        <div>
            <div class="w-full">
                <div class="bg-white shadow-xl rounded-lg py-3">
                    <div class="photo-wrapper p-2">
                        <img class="w-32 h-32 rounded-full mx-auto" src={currentUser.photoURL} alt="John Doe" />
                    </div>
                    <div class="p-2">
                        <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{currentUser.displayName}</h3>
                        <div class="text-center text-gray-400 text-xs font-semibold">
                            <p>{currentUser?.metadata?.lastSignInTime}</p>
                        </div>
                        <table class="text-xs my-3 flex items-center justify-center">
                            <tbody>
                                <tr>
                                    <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                    <td class="px-2 py-2">{currentUser.email}</td>
                                </tr>
                            </tbody></table>

                        <div class="text-center my-3">
                            <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
                        </div>

                    </div>
                </div>
            </div>
            <div className='py-5 text-center'><h1 className='font-bold text-black'>Total buy product</h1></div>
            <div className='w-full flex items-center justify-center h-[30vh] bg-pink-200'>
                <div className="radial-progress text-primary" style={{ "--value": allbuyproduct.length }}>{allbuyproduct.length}%</div>
            </div>

            <div>
                <AreaChart width={1000} height={250} data={allbuyproduct}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorprice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colordiscountPercentage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="brand" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="discountPercentage" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="price" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </div>
            <div>
                <BarChart width={1000} height={250} data={allbuyproduct}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="discountPercentage" fill="#8884d8" />
                    <Bar dataKey="price" fill="#82ca9d" />
                </BarChart>
            </div>

        </div>
    );
};

export default Dashbord;