import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbArrowLeft } from 'react-icons/tb';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../Config/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [customer, setCustomer] = useState({
        id:'',
        email: '',
        username: '',
        alamat: '',
        nomor: ''
    })
    const handleChangeText = (e) => {
        const { id, value } = e.target;
        setCustomer((prevState) => ({ ...prevState, [id]: value }));
    };

    useEffect(() => {
        const currentUser = getAuth().currentUser;
        if (currentUser) {
            setUser(currentUser);
        }
        const fetchData = async () => {
            try {
              const response = await axios.get('https://13.213.46.17:8080/api/v1/customer');
              if (auth.currentUser) {
                const userLogin = response.data.find((user) => user.username === auth.currentUser.displayName);
                if (userLogin) {
                  const userId = userLogin.id; // asumsikan respons memiliki properti '_id'
                    setCustomer({
                        id:userId,
                        email: userLogin.email,
                        username: userLogin.username,
                        nomor:userLogin.phoneNumber,
                        alamat:userLogin.address
                    })
                  const test = await axios.get(`https://13.213.46.17:8080/api/v1/customer/${userId}`);
                  console.log(test)
                }
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData();
    }, []);
    if (!user) {
        return <div>Loading...</div>; // Tampilkan sesuatu selama data pengguna sedang dimuat
    }
    const handleLogout = () => {
        signOut(auth).then(() => {
            toast("Berhasil Logout")
            localStorage.removeItem('userData')
            localStorage.removeItem('isLogin')
            setTimeout(()=>{
                navigate("/")
            },1500)
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleUpdateProfile = async () => {
        
        try {
            const response = await axios.put(`https://13.213.46.17:8080/api/v1/customer/${customer.id}`, {
                address: customer.alamat,
                phoneNumber: customer.nomor,
            });

            // Handle response from the backend (success or error)
            console.log(response.data); // Log response from the backend

            // Optionally, you can update the local state or perform other actions
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error (show error message, log, etc.)
        }
    };
    return (
        <div className='m-8 mx-4 lg:mx-[100px] font-poppins'>
            <ToastContainer
            hideProgressBar
            autoClose={1000}
            position='top-center'
            theme='colored'
            
            />
            <div className='flex justify-between items-center mb-8'>
                <div className='flex items-center gap-4 '>
                    <button onClick={() => navigate(-1)}>
                        <TbArrowLeft className='text-[24px]' />
                    </button>
                    <h4 className='text-[20px] lg:text-[30px] '>Edit Profile</h4>
                </div>
                <div className='flex max-lg:flex-col items-center gap-4'>
                    <div className='border border-black w-10 lg:w-20 h-10 lg:h-20 rounded-full'></div>
                    <p className='text-bold font-roboto lg:text-[28px] font-bold'>{customer.username}</p>
                    <div className='flex flex-col max-lg:hidden'>
                        <Link to={`/`}>home</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-6'>
                <div>
                    <p className='lg:text-[26px] font-semibold font-roboto'>Username</p>
                    <input className='border outline-none border-[#858585] rounded-md w-full lg:w-[920px] py-5 pl-8' type="text" id='username' value={customer.username} onChange={handleChangeText} />
                </div>
                <div>
                    <p className='lg:text-[26px] font-semibold font-roboto'>Email</p>
                    <input className='border outline-none border-[#858585] rounded-md w-full lg:w-[920px] py-5 pl-8' type="text" id='email' value={customer.email} onChange={handleChangeText} />
                </div>
                <div>
                    <p className='lg:text-[26px] font-semibold font-roboto'>Alamat</p>
                    <input className='border outline-none border-[#858585] rounded-md w-full lg:w-[920px] py-5 pl-8' type="text" id='alamat' value={customer.alamat} onChange={handleChangeText} />
                </div>
                <div>
                    <p className='lg:text-[26px] font-semibold font-roboto'>Nomor HP:</p>
                    <input className='border outline-none border-[#858585] rounded-md w-full lg:w-[920px] py-5 pl-8' type="text" id='nomor' value={customer.nomor} onChange={handleChangeText} />
                </div>

            </div>
            <button className='bg-[#23886D] py-[16px] text-white font-bold rounded-full' onClick={handleUpdateProfile}>
                Update Profile
            </button>

        </div>
    );
};

export default Profile;