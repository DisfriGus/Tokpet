import React from 'react'
import Logo from '../assets/Logo.svg'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex items-center px-[240px] py-4 justify-between bg-[#23886D] text-white'>
        <div className='flex items-center gap-2'> 
            <img src={Logo} alt="" />
            <p>Toko Petani</p>
        </div>
        <div className='flex gap-4'>
            <Link>Home</Link>
            <Link>Home</Link>
            <Link>Home</Link>
            <Link>Home</Link>
        </div>
        <div className='flex gap-4'>
            <button>Daftar</button>
            <button>Login</button>
        </div>
    </div>
  )
}

export default Navbar