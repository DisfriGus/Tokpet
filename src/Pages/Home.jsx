import React, { useState, useEffect } from 'react'
import Navbar from '../Component/Navbar'
import Layout from '../Component/Layout'
import SliderComponent from '../Component/SliderComponent/SliderComponent'
import CardBestseller from '../Component/CardBestseller/CardBestseller'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import bestSellerIMG from '../assets/BestSeller.png'
import fireConfig from '../Config/Firebase'
import Kategori from '../Component/Kategori'
import Footer from '../Component/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const notify = () => {
    toast("Item Berhasil Ditambahkan")
  }
  useEffect(() => {
    const auth = getAuth(fireConfig);
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/customer');
        if (auth.currentUser) {
          const userLogin = response.data.find((user) => user.username === auth.currentUser.displayName);
          if (userLogin) {
            const userId = userLogin.id; // asumsikan respons memiliki properti '_id'
            const test = await axios.get(`http://localhost:8080/api/v1/customer/${userId}`);
            localStorage.setItem('userData', JSON.stringify({
              username: test.data.username,
              email: test.data.email,
              phoneNumber: test.data.phoneNumber,
              address: test.data.address
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[]);
  return (
    <Layout>
      <ToastContainer
      position='top-center'
      autoClose={1000}
      theme='light'
      hideProgressBar
      />
      <Navbar />
      <div className=''>
      </div>
      <div>
        <SliderComponent />
      </div>
      <div className='flex justify-center mt-[140px] mb-[86px]'>
        <img src={bestSellerIMG} className='w-[400px]' alt="" />
      </div>
      <div className='' id='bestSeller'>
        <CardBestseller onBuy={notify}/>
      </div>
      <div className='mt-[120px]'>
        <h1 className='font-poppins text-[40px] font-semibold text-center'>Kategori Belanja</h1>
        <Kategori/>
      </div>
      <Footer/>
    </Layout>
  )
}

export default Home