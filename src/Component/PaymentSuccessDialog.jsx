import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
const PaymentSuccessDialog = ({ handleDialog, total }) => {
    const navigate = useNavigate()
    const [totalHarga, setTotalHarga] = useState(0)
    const currentDate = new Date();

    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();
    useEffect(()=>{
        setTotalHarga(total)
    },[])
    // Array untuk menyimpan nama-nama bulan
    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    // Mendapatkan nama bulan berdasarkan indeks
    const month = monthNames[monthIndex];

    // Membuat string dengan format "DD-MMMM-YYYY"
    const formattedDate = `${day} ${month} ${year}`;

    console.log(formattedDate);
    const handleCloseDialog = () => {
        // Additional logic if needed
        handleDialog();
    
        // Navigate to the home page
        navigate("/");
      };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-60"></div>
            <div className="relative sm:w-[800px] h-fit w-full max-sm:w-[400px] p-10 bg-white rounded-[16px] font-inter max-sm:px-[10px] px-[140px] py-[42px]">
                <button
                    className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={handleCloseDialog}
                    
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>


                <div className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col gap-[18px] items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                            <rect opacity="0.15" width="56" height="56" rx="28" fill="#1659E6" />
                            <rect x="16" y="16" width="24" height="24" rx="12" fill="#1659E6" />
                            <mask id="mask0_528_557" maskUnits="userSpaceOnUse" x="19" y="19" width="18" height="18">
                                <rect x="19" y="19" width="18" height="18" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_528_557)">
                                <path d="M25.8475 30.2012L32.1973 23.3207C32.3946 23.1069 32.6457 23 32.9507 23C33.2556 23 33.5067 23.1069 33.704 23.3207C33.9013 23.5345 34 23.8066 34 24.137C34 24.4674 33.9013 24.7396 33.704 24.9534L26.6009 32.6501C26.3857 32.8834 26.1345 33 25.8475 33C25.5605 33 25.3094 32.8834 25.0942 32.6501L22.296 29.6181C22.0987 29.4043 22 29.1322 22 28.8017C22 28.4713 22.0987 28.1992 22.296 27.9854C22.4933 27.7716 22.7444 27.6647 23.0493 27.6647C23.3543 27.6647 23.6054 27.7716 23.8027 27.9854L25.8475 30.2012Z" fill="white" />
                            </g>
                        </svg>
                        <h1 className='text-[#031C32] font-satoshi font-bold text-[24px]'>Payment Success!</h1>
                    </div>
                    <div className='w-[520px] h-[2px] bg-[#F8F8F8] rounded-[7px] mt-[24px] text-center mb-[18px]'></div>

                    <div className='w-[520px] h-[2px] bg-[#F8F8F8] rounded-[7px] text-center mb-[18px] max-sm:hidden'></div>
                    <div className='flex flex-row justify-between items-center w-full mb-[18px] max-sm:hidden'>
                        <h1 className='text-[#8F8F8F] font-inter text-[16px] font-medium'>Payment Time</h1>
                        <h1 className='font-inter text-right text-[16px] font-medium text-[#031C32]'>{formattedDate}</h1>
                    </div>
                    <div className='flex flex-row justify-between items-center w-full mb-[18px] max-sm:hidden'>
                        <h1 className='text-[#8F8F8F] font-inter text-[16px] font-medium'>Payment Method</h1>
                        <h1 className='font-inter text-right text-[16px] font-medium text-[#031C32]'>OVO</h1>
                    </div>
                    <div className='flex flex-row justify-between items-center w-full mb-[18px] max-sm:hidden'>
                        <h1 className='text-[#8F8F8F] font-inter text-[16px] font-medium'>Ref Number</h1>
                        <h1 className='font-inter text-right text-[16px] font-medium text-[#031C32]'>1644-1807-2023</h1>
                    </div>
                    <div className='w-[520px] h-[2px] bg-[#F8F8F8] rounded-[7px] text-center mb-[18px] max-sm:hidden'></div>
                    <div className='flex flex-row justify-between items-center w-full mb-[18px] max-sm:hidden'>
                        <h1 className='text-[#8F8F8F] font-inter text-[16px] font-medium'>Total</h1>
                        <h1 className='font-inter text-right text-[16px] font-medium text-[#031C32] max-sm:hidden'>Rp  {totalHarga}</h1>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PaymentSuccessDialog