import React, { useRef, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import imgHome from '../assets/imgHome.jpg'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Autoplay,EffectFade, Navigation, Pagination } from 'swiper/modules';
import CardHome from './CardHomes';

export default function SliderComponent() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        modules={[Autoplay,EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide style={{backgroundImage:`url(${imgHome})`}} className='w-full h-[750px] bg-cover'>
          <CardHome/>
        </SwiperSlide>
        <SwiperSlide style={{backgroundImage:`url('https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`}} className='w-full h-[750px] bg-cover'>
          <CardHome/>
        </SwiperSlide>
        
      </Swiper>
    </>
  )
}