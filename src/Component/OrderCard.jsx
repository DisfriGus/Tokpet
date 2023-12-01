import React from 'react'

const OrderCard = ({url, title, quantity, harga }) => {
    return (
        <div className=''>
            <div className='flex gap-[18px]'>
                <img src={url} alt="" className='w-20 h-20 rounded-[20px]' />
                <div className='flex flex-col gap-1'>
                    <p className='tracking-[1.5px] font-extrabold'>{title}</p>
                    <p className='tracking-[1.5px]'>{quantity} x {harga}</p>
                </div>
            </div>
            
        </div>
    )
}

export default OrderCard