import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo.svg'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import {TbUser, TbShoppingCart} from "react-icons/tb"
const Navbar = () => {
  let user = getAuth().currentUser;
  const [isLogin, setIsLogin] = useState(false)
  const [search, setSearch] =useState('')
  useEffect(()=>{
    setIsLogin(localStorage.getItem('userData'))
  }, [user])
  const handleChangeText = (e) => {
    setSearch(e.target.value)
};

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
      {isLogin ? (
        <div>
          <div className='flex gap-4'>
              <input 
              type="text" 
              className='border outline-none text-black'
              id='search'
              value={search}
              onChange={handleChangeText}
              />
              <button><TbShoppingCart/></button>
              <button><Link to={`/EditProfile`}><TbUser/></Link></button>
          </div>
        </div>
        
      ) : (
        <div>
          <div className='flex gap-4'>
            <button><Link to={`/Signup`}>Daftar</Link></button>
            <button><Link to={`/Login`}>Login</Link></button>
          </div>
        </div>
      )

      }
      
    </div>
  )
}

export default Navbar