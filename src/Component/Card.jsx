import React from 'react'
import ImgEx from '../assets/ex.png'
const Card = () => {
  return (
    <div className=' flex flex-col w-[300px]'>
        <img className='' src={ImgEx} alt="" />
        <div className='px-[12px] '>
            <h1>Nama Barang</h1>
            <h4>Rating</h4>
            <h3>Harga</h3>
        </div>
    </div>
  )
}

export default Card