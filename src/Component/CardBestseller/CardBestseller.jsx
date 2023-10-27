import React, { useEffect,useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import axios from 'axios'
const CardBestseller = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/tanaman');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        
        loop={true}
        navigation={true}
        modules={[ Navigation]}
        className="mySwiper pl-[60px]"
      >
        {posts.map((product, index) => {
            return (
              <SwiperSlide key={index} className=''>
                <img src={product.url} alt="" className='h-[360px] w-[400px] object-cover' />
                  <h1 className='font-poppins md:text-[24px] font-medium'>{product.title}</h1>
                  <p className='font-poppins md:text-[18px] font-semibold'>{product.harga}</p>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </>
  )
}

export default CardBestseller