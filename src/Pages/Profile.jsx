import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbArrowLeft } from 'react-icons/tb';
import {  getAuth, signOut } from 'firebase/auth';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [customer, setCustomer] = useState({
        email: getAuth().currentUser.email,
        username: getAuth().currentUser.displayName,
        alamat: '',
        nomor: getAuth().currentUser.phoneNumber
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
    }, []);
    if (!user) {
        return <div>Loading...</div>; // Tampilkan sesuatu selama data pengguna sedang dimuat
    }
    const handleLogout =()=>{
        signOut(auth).then(()=>{
            alert("Logout Berhasil")
            localStorage.removeItem('userData')
        }).catch((err)=>{
            console.log(err);
        })
    } 
    return (
        <div className='m-8'>
            <div className='flex items-center gap-4'>
                <button onClick={() => navigate(-1)}>
                    <TbArrowLeft className='text-[24px]' />
                </button>
                <h4 className='text-[30px]'>Edit Profile</h4>
            </div>
            <div>
                <p>Username</p>
                <input className='border outline-none w-[920px] py-5 pl-8' type="text" id='username' value={customer.username} onChange={handleChangeText} />
                <p>Email:</p>
                <input className='border outline-none w-[920px] py-5 pl-8' type="text" id='email' value={customer.email} onChange={handleChangeText} />
                <p>Alamat:</p>
                <input className='border outline-none w-[920px] py-5 pl-8' type="text" id='alamat' value={customer.alamat} onChange={handleChangeText} />
                <p>Nomor HP:</p>
                <input className='border outline-none w-[920px] py-5 pl-8' type="text" id='nomor' value={customer.nomor} onChange={handleChangeText} />
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;