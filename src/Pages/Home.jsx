import React, { useState, useEffect } from 'react'
import Navbar from '../Component/Navbar'
import Layout from '../Component/Layout'
import SliderComponent from '../Component/SliderComponent/SliderComponent'
import CardBestseller from '../Component/CardBestseller/CardBestseller'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import bestSellerIMG from '../assets/BestSeller.png'
import fireConfig from '../Config/firebase'

const Home = () => {
  useEffect(() => {
    const auth = getAuth(fireConfig)
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/customer');
            const userLogin = response.data.find((user)=> user.username === auth.currentUser.displayName) 
            
            if (userLogin) {
                const userId = userLogin.id; // asumsikan respons memiliki properti '_id'
                const test = await axios.get(`http://localhost:8080/api/v1/customer/${userId}`);
                localStorage.setItem('userData',JSON.stringify(({
                  username: test.data.username,
                  email: test.data.email,
                  phoneNumber: test.data.phoneNumber,
                  address:test.data.address
              })))
                
                console.log(test.data.username);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);
  return (
    <Layout>
      <Navbar />
      <div className=''>
      </div>
      <div>
        <SliderComponent />  
      </div>
      <div className='flex justify-center mt-[140px] mb-[86px]'>
        <img src={bestSellerIMG} className='w-[400px]' alt="" />
      </div>
      <div className=''>
        <CardBestseller/> 
      </div>
      <div className='mt-[120px]'>
        <h1 className='font-poppins text-[40px] font-semibold text-center'>Kategori Belanja</h1>
        <div className='flex gap-[26px] justify-center my-10'>
          <h1 className='cursor-pointer text-[#939393] hover:text-[#25523B] hover:border-b-2 hover:border-[#25523B] duration-200 '>Terbaru</h1>
          <h1 className='cursor-pointer text-[#939393] hover:text-[#25523B] hover:border-b-2 hover:border-[#25523B] duration-200 '>Terbaru</h1>
          <h1 className='cursor-pointer text-[#939393] hover:text-[#25523B] hover:border-b-2 hover:border-[#25523B] duration-200 '>Terbaru</h1>
          <h1 className='cursor-pointer text-[#939393] hover:text-[#25523B] hover:border-b-2 hover:border-[#25523B] duration-200 '>Terbaru</h1>
          <h1 className='cursor-pointer text-[#939393] hover:text-[#25523B] hover:border-b-2 hover:border-[#25523B] duration-200 '>Terbaru</h1>
        </div>
        
      </div>
    </Layout>
  )
}

export default Home