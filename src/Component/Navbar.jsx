import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo.svg'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { TbUser, TbShoppingCart, TbMenu2, TbX } from "react-icons/tb"
import fireConfig from '../Config/Firebase'
import  axios  from 'axios'
const Navbar = () => {
  const [open, setOpen] = useState(false)
  let user;

  const currentUser = getAuth().currentUser;



  const [isLogin, setIsLogin] = useState(false)
  const [search, setSearch] = useState('')
  useEffect(() => {
    const auth = getAuth(fireConfig);
    const fetchData = async () => {
      try {
        const response = await axios.get('https://13.213.46.17:8080/api/v1/customer');
        if (auth.currentUser) {
          const userLogin = response.data.find((user) => user.username === auth.currentUser.displayName);
          setIsLogin(userLogin)
          
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const handleChangeText = (e) => {
    setSearch(e.target.value)
  };

  return (
    <div className='max-lg:overflow-hidden fixed z-20 w-screen'>
      <div className='flex items-center px-4 xl:px-[240px] py-4 justify-between bg-[#23886D] text-white'>
        <div className='flex items-center gap-2'>
          <img src={Logo} alt="" />
          <p>Toko Petani</p>
        </div>
        <div className='flex gap-4 max-lg:hidden '>
          <Link>Best Seller</Link>
          <Link>Item Terbaru</Link>
          <Link to={`/RiwayatBelanja`}>Riwayat Belanja</Link>
        </div>
        {isLogin ? (
          <div className='max-lg:hidden'>
            <div className='flex gap-4'>
              <input
                type="text"
                className='border outline-none text-black'
                id='search'
                placeholder='Search'
                value={search}
                onChange={handleChangeText}
              />
              <button><Link to={`/KeranjangBelanja`} className='text-[24px]'><TbShoppingCart /></Link></button>
              <button><Link to={`/EditProfile`} className='text-[24px]'><TbUser /></Link></button>
            </div>
          </div>

        ) : (
          <div className='max-lg:hidden'>
            <div className='flex gap-4'>
              <button><Link to={`/Signup`}>Daftar</Link></button>
              <button><Link to={`/Login`}>Login</Link></button>
            </div>
          </div>
        )

        }
        <div className='lg:hidden flex flex-row-reverse gap-4'>
          <button onClick={() => setOpen(!open)}>
            {open ? <TbX className='text-[20px]'/> : <TbMenu2 className='text-[20px]'/>}
          </button>
          <div className='flex justify-center gap-4'>
            <button><Link to={`/KeranjangBelanja`}><TbShoppingCart className='text-[20px]'/></Link></button>
            <button><Link to={`/EditProfile`}><TbUser className='text-[20px]'/></Link></button>
          </div>
        </div>

      </div>
      <div>
        <div className={`lg:hidden fixed z-20 top-20 text-white bg-[#23886D] w-full h-screen duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex flex-col gap-4  items-center'>
            <Link>Best Seller</Link>
            <Link>Item Terbaru</Link>
            <Link to={`/RiwayatBelanjan`}>Riwayat Belanja</Link>
          </div>
          {isLogin ? (
            <div className='lg:hidden my-4'>
              <div className='flex flex-col gap-4'>
                <input
                  type="text"
                  className='border outline-none text-black mx-4'
                  id='search'
                  placeholder='Search'
                  value={search}
                  onChange={handleChangeText}
                />

              </div>
            </div>

          ) : (
            <div className=''>
              <div className='flex flex-col gap-4'>
                <button><Link to={`/Signup`}>Daftar</Link></button>
                <button><Link to={`/Login`}>Login</Link></button>
              </div>
            </div>
          )

          }
        </div>
      </div>
    </div>
  )
}

export default Navbar