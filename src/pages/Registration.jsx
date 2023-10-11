import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { UserProvider } from '../context/Usercontext';
import { updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import swal from 'sweetalert';
import Header from '../components/Header';

const Registration = () => {
    const [see, setSee] = useState(true)

    const { createuser, setFirstShow, googleLogIn } = useContext(UserProvider)

    const navigate = useNavigate()
    const handelRegistration = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (password.length < 6) {
            toast.error("PLease provide 6 character password")
            return
        }

        createuser(email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: photo || "https://www.w3schools.com/howto/img_avatar.png"
                }).then(() => {
                    setFirstShow(photo || "https://www.w3schools.com/howto/img_avatar.png");
                    swal("Good job!", "User created successfully !", "success");
                    navigate('/')
                }).catch((error) => {
                    console.log(error)
                });
            }).catch(() => {
                swal("Opps!", "User alrady created. please add new email!", "error");

            })

    }

    const googleSignIn = () => {
        googleLogIn()
            .then(() => {
                swal("Good job!", "Login successfully !", "success");
                navigate(location?.state ? location.state : '/')
            }).catch(() => {
                swal("Opps!", "Password not match!", "error");
            })
    }


    return (
        <div>
            <div className='bg-black'><Header></Header></div>
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 mx-auto lg:pt-7">
                    <a href="#" className="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="h-32 mr-2 " src="https://i.postimg.cc/3JV6ZvBy/we876w48d-wework-logo-wework-logo.png" alt="logo" />
                    </a>
                    <div className="w-full bg-white rounded-lg shadow-none lg:shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-2 space-y-4 lg:p-6 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create your Free Account
                            </h1>
                            <form onSubmit={handelRegistration} className="space-y-4 md:space-y-6">
                                <div>
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" required={true} />
                                </div>

                                <div>
                                    <label for="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Photo URl</label>
                                    <input type="text" name="photo" id="photo" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Photo URL" />
                                </div>

                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@gmail.com" required={true} />
                                </div>

                                <div className='relative'>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type={see ? 'password' : 'text'} name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                    <span className='absolute cursor-pointer bottom-3 right-3' onClick={() => setSee(!see)}>{!see ? <AiOutlineEye></AiOutlineEye> : <AiOutlineEyeInvisible></AiOutlineEyeInvisible>} </span>
                                </div>

                                <button type="submit" className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to='/login' class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login in</Link>
                                </p>
                            </form>
                        </div>
                    </div>

                    <div onClick={googleSignIn} className='flex items-center gap-1 py-1 my-4 text-white rounded-md cursor-pointer bg-primary px-7'>
                        <div><FcGoogle className='mr-5 text-3xl'></FcGoogle></div>
                        <div>Google Login</div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Registration;