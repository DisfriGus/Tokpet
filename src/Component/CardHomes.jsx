import React from 'react'

const CardHomes = () => {
    return (
        <div className='flex justify-center items-center h-full border-black'>
            <div className='border flex flex-col items-center bg-white px-[86px] py-[42px] max-w-[580px]'>
                <h3 className='font-bold'>NEW ITEM</h3>
                <h1 className='font-poppins font-medium text-[48px] text-center'>Discover Our New Collection</h1>
                <button>Buy Now</button>
            </div>
        </div>
    )
}

export default CardHomes