import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbArrowLeft } from 'react-icons/tb';
import {  getAuth, signOut } from 'firebase/auth';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const auth = getAuth()
    const userLogin = auth.currentUser
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
                <p>Username: {user.displayName}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;