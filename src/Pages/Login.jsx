import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TbHome } from 'react-icons/tb'
import Farmer from '../assets/asian_farmers_03.jpg'
import axios from 'axios'
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import fireConfig from '../Config/Firebase'

const Login = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        email: "",
        password: ""
    });

    const auth = getAuth(fireConfig);
    const [errorMessage, setErrorMessage] = useState(null);
    const handleChangeText = (e) => {
        const { id, value } = e.target;
        setCustomer((prevState) => ({ ...prevState, [id]: value }));
    };

    const updateFirebaseToken = async (customerId, firebaseToken) => {
        try {
            await axios.put(`httpss://api/v1/customer/${customerId}/update-token`, { firebaseToken });
            console.log('update')
        } catch (error) {
            console.error('Error updating Firebase token:', error);
        }
    };

    const handleSubmit = async () => {
        const { email, password } = customer;
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const user = res.user;
            const firebaseToken = await user.getIdToken();

            // Update Firebase token on the backend
            updateFirebaseToken(user.uid, firebaseToken);

            // Reset state and navigate
            localStorage.setItem('userData', JSON.stringify({}));
            setCustomer({
                email: '',
                password: '',
            });
            navigate('/');
        } catch (err) {
            console.error(err);
            setErrorMessage(err)
        }
    };

    const handleLoginGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, provider);
            const user = res.user;
            const firebaseToken = await user.getIdToken();

            // Update Firebase token on the backend
            updateFirebaseToken(user.uid, firebaseToken);

            // Navigate
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='flex items-start font-poppins px-80 py-[120px] justify-between'>
            <div>
                <h1 className='text-[30px] font-bold text-[#444B59] mb-5 '>Welcome To Our Website</h1>
                <p className='text-[#444B59] font-thin mb-12 '>Don't have account, <Link to={`/Signup`} className='text-[#23886D]'>Sign Up</Link></p>
                <div className='flex flex-col gap-6' action="">
                    <div className=''>
                        <p className='text-[24px]'>Username</p>
                        <input
                            type="text"
                            className='outline-none border w-[400px] px-7 py-4 rounded-full'
                            id='email'
                            value={customer.email}
                            onChange={handleChangeText}
                        />
                    </div>
                    <div>
                        <p className='text-[24px]'>Password</p>
                        <input
                            type="password"
                            className='outline-none border w-[400px] px-7 py-4 rounded-full'
                            id='password'
                            value={customer.password}
                            onChange={handleChangeText}
                        />
                    {errorMessage && (
                        <div className="text-red-500 mt-4">
                            Email/Password Anda Salah, Coba Lagi
                        </div>
                    )}
                    </div>
                    <p className='text-right mb-20'>Foreget Password ?</p>
                    <div className='flex justify-evenly'>
                        <button className='px-6 py-3 border' onClick={handleLoginGoogle}>G</button>
                        <button className='px-6 py-3 border'>F</button>
                        <button className='px-6 py-3 border'>A</button>
                    </div>
                    <button className='bg-[#23886D] py-[16px] text-white font-bold rounded-full' onClick={handleSubmit}>Sign In</button>


                </div>
            </div>
            <div className=''>
                <div className='flex items-center gap-5 justify-end'>
                    <h4 className=''>Hubungi Kami</h4>
                    <button>
                        <Link to={`/`}>
                            <TbHome className='text-[24px]' />

                        </Link>
                    </button>
                </div>
                <img src={Farmer} alt="" />
            </div>
        </div>
    )
}

export default Login