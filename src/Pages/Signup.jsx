import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TbHome } from 'react-icons/tb'
import Farmer from '../assets/asian_farmers_03.jpg'
import fireConfig from '../Config/Firebase';
import { getAuth, updateCurrentUser, updatePhoneNumber, updateProfile } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Signup = () => {
  const navigate = useNavigate()
  const [customer, setCustomer] = useState({
    email: '',
    username: '',
    password: '',
    phone: '',
    alamat:'',
    riwayat:[[]]
  })
  const [errorMessage, setErrorMessage] = useState(null);
  const handleChangeText = (e) => {
    const { id, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [id]: value
    }));
  };
  const auth = getAuth(fireConfig)
  const handleSubmit = () => {
    const { email, password, username, phone } = customer
    axios.post("https://13.213.46.17:8080/api/v1/customer",{
        email: email,
        password: password,
        username: username,
        phoneNumber: phone,
        address:'' ,
        riwayat: []
    })
    
    .then(() => {
      // Rest of the code for successful registration
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: username
          });
          updatePhoneNumber(user, phone);
          navigate("/Login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log( errorMessage);
          setErrorMessage(errorMessage); // Set the error message state
        });
    })
    .catch((axiosError) => {
      // Handle Axios error (e.g., network error, server error)
      console.error('Axios Error:', axiosError);
      setErrorMessage('Error occurred during registration'); // Set a generic error message
    });
    setCustomer({
      email: '',
      username: '',
      password: '',
      phone: ''
    });
  };

  return (
    <div className='flex items-center font-poppins px-80 py-[120px] justify-between'>
      <div>
        <h1 className='text-[30px] font-bold text-[#444B59] mb-5 '>Selamat Datang !</h1>
        <p className='text-[#444B59] font-thin mb-12 '>Sudah Punya Akun?  <Link to={`/Login`} className='text-[#23886D]'>Login</Link></p>
        <div className='flex flex-col gap-6' action="">
          <div className=''>
            <p className='text-[24px]'>Username</p>
            <input
              type="text"
              className='outline-none border w-[400px] px-7 py-4 rounded-full'
              id='username'
              value={customer.username}
              onChange={handleChangeText}
            />
          </div>
          <div className=''>
            <p className='text-[24px]'>Email</p>
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
              autoComplete="current-password"
            />
          </div>
          <div className=''>
            <p className='text-[24px]'>Phone</p>
            <input
              type="number"
              className='outline-none border w-[400px] px-7 py-4 rounded-full'
              id='phone'
              value={customer.phone}
              onChange={handleChangeText}
            />
          </div>

          <button className='bg-[#23886D] py-[16px] text-white font-bold rounded-full' onClick={handleSubmit}>Sign up</button>

          {errorMessage =='Firebase: Error (auth/email-already-in-use).' && (
            <div className="text-red-500 mt-4">
              Email Already Exist
            </div>
          )}
          {errorMessage =='Firebase: Error (auth/invalid-email).' && (
            <div className="text-red-500 mt-4">
              Invalid Email, Coba Lagi
            </div>
          )}
        </div>
      </div>
      <div>
        <div className='flex items-center gap-5 justify-end'>
          <h4 className=''>Hubungi Kami</h4>
          <button>
            <Link to={`/`}>
              <TbHome className='text-[24px]' />

            </Link>
          </button>
        </div>
        <img src={Farmer} alt="" />
        <h4 className='text-center mt-8 text-[20px]'>Lanjutkan Dengan</h4>
        <hr className='my-4' />
        <div className='flex justify-evenly'>
          <button className='px-6 py-3 border'>G</button>
          <button className='px-6 py-3 border'>F</button>
          <button className='px-6 py-3 border'>A</button>
        </div>
      </div>
    </div>
  )
}

export default Signup