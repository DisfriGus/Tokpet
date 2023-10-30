import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import axios from 'axios'
import Product from '../Product';
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
  const buyProduct = (e) => {
    console.log(e.target)
  }
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}

        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper pl-[60px]"
      >
        {posts.map((product, index) => {
          return (
            <SwiperSlide key={index} onClick={buyProduct}>
              <Product product={product} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default CardBestseller