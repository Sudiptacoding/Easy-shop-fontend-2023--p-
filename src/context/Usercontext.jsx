import React, { createContext, useEffect, useState } from 'react';
import { getDataCard } from '../../public/Utilitis/AddtocardLocalstorage';
import { getData } from '../../public/Utilitis/Likelocalstorage';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const UserProvider = createContext(null)

import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

const Usercontext = ({ children }) => {

    const [allProductData, setAllProductData] = useState([]);
    const [likehandel, setLikeHandel] = useState([])
    const [cardhandel, setCardHandel] = useState([])


    const [firstShow, setFirstShow] = useState('')
    const [currentUser, setCurrentUser] = useState(null)
    const [speener, seeSpeener] = useState(true)


    // create user
    const createuser = (email, password) => {
        seeSpeener(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // log in user
    const loginguser = (email, password) => {
        seeSpeener(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogIn = () => {
        seeSpeener(true)
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        seeSpeener(true)
        return signOut(auth)
    }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            seeSpeener(false)
        });
        return () => {
            unSubscribe()
        }
    }, [])









    useEffect(() => {
        fetch('https://easy-ruby-macaw-cape.cyclic.app/')
            .then(res => res.json())
            .then(data => {                
                setAllProductData(data)
                let likeArr = []
                for (const like of getData()) {
                    const matchdata = data.find(item => item._id === like)
                    likeArr.push(matchdata)
                }

                let cardArr = []
                for (const card of getDataCard()) {
                    const matchdata = data.find(item => item._id === card)
                    cardArr.push(matchdata)
                }
                setLikeHandel(likeArr)
                setCardHandel(cardArr)
            })
    }, [])


    const send = {
        allProductData,

        // all like
        likehandel,
        setLikeHandel,

        // card
        cardhandel,
        setCardHandel,



        // new daqta

        currentUser,

        // first imag
        firstShow,


        // create user
        createuser,
        // login user
        loginguser,
        // google login
        googleLogIn,

        // logout
        logOut,



        // image set
        setFirstShow,
        speener,



    }



    return (
        <UserProvider.Provider value={send}>
            {children}
        </UserProvider.Provider>
    );
};

export default Usercontext;