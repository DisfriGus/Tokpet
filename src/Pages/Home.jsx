import React from 'react'
import Navbar from '../Component/Navbar'
import Layout from '../Component/Layout'
import imgHome from '../assets/imgHome.jpg'
import SliderComponent from '../Component/SliderComponent'
const Home = () => {
  return (
    <Layout>
        <Navbar/>
        <div className=''>
          <SliderComponent/>
        </div>
        <div>
        </div>
    </Layout>
  )
}

export default Home