import React from 'react'
import Dana from '../assets/dana.png'
import Gopay from '../assets/gopay.png'
import LinkAja from '../assets/linkaja.png'
import Ovo from '../assets/ovo.png'
import FooterLogo from '../assets/footerlogo.png'
const Footer = () => {
  return (
    <div className='bg-[#23886D] text-white w-full h-[355px] flex max-lg:items-center  justify-around items-center pr-40'>
        <div className='flex flex-col justify-center'>
            <p className='mb-6 max-lg:hidden'>Pembayaran</p>
            <div className='flex gap-7 max-lg:hidden'>
                <img src={Dana} alt="" />
                <img src={Gopay} alt="" />
                <img src={LinkAja} alt="" />
                <img src={Ovo} alt="" />
            </div>
            <p className='my-6 max-lg:hidden'>Pembayaran</p>
            <div className='flex gap-7 max-lg:hidden'>
                <img src={Dana} alt="" />
                <img src={Gopay} alt="" />
                <img src={LinkAja} alt="" />
                <img src={Ovo} alt="" />
            </div>
        </div>
        <div className=''>
            <img src={FooterLogo} alt="" />
        </div>
        <div className='max-lg:hidden'>
            <p>Hubungi Kami</p>
        </div>
    </div>
  )
}

export default Footer