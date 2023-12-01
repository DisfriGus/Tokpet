import React, { useEffect, useState } from 'react'
import { TbMinus, TbPlus, TbTrash } from 'react-icons/tb';
const ProductItem = ({ data, setTotal }) => {
    const [counter, setCounter] = useState(data.quantity || 1);
    const [buttonTrue, setButtonTrue] = useState(false);
    const [buttonFalse, setButtonFalse] = useState(false);


    const handleDelete = () => {
        const localStorageData = JSON.parse(localStorage.getItem('cartData')) || [];
        const updatedData = localStorageData.filter((item) => item.id !== data.id);
        localStorage.setItem('cartData', JSON.stringify(updatedData));
        window.location.reload();
    };
    
    const handleIncreaseQuantity = () => {
        setButtonTrue(true);
        const localStorageData = JSON.parse(localStorage.getItem('cartData')) || [];
        const updatedData = localStorageData.map((item) => {
            if (item.id === data.id  && item.quantity < data.jumlah) {
                item.quantity = (item.quantity || 0) + 1;
                item.totalItemPrice = (parseFloat(item.harga.replace(/RP\./g, "")) * item.quantity);
                setTotal(item.totalItemPrice);
                setCounter((prevCounter) => prevCounter + 1);
            }
            return item;
        });
        localStorage.setItem('cartData', JSON.stringify(updatedData));

    };


    const handleDecreaseQuantity = () => {
        setButtonFalse(true);
        const localStorageData = JSON.parse(localStorage.getItem('cartData')) || [];
        const updatedData = localStorageData.map((item) => {
            if (item.id === data.id) {
                if (item.quantity > 1) {
                    item.quantity = (item.quantity || 0) - 1;
                    item.totalItemPrice = (parseFloat(item.harga.replace(/RP\./g, "")) * item.quantity);
                    setTotal(item.totalItemPrice);
                } else {
                    item.totalItemPrice = parseFloat(item.harga.replace(/RP\./g, ""))
                    setTotal(item.totalItemPrice)
                }
            }

            return item;

        });


        if (counter > 1) {
            localStorage.setItem('cartData', JSON.stringify(updatedData));
            setCounter((prevCounter) => prevCounter - 1);
        }
        setButtonFalse(false);


    };
    useEffect(() => {
        const dataTotalHarga = JSON.parse(localStorage.getItem('cartData')) || []
        let totalHarga = 0
        

        dataTotalHarga.forEach(element => {
            totalHarga += parseFloat(element.harga.replace(/RP\./g, "") * element.quantity)
            
        });
        setTotal(totalHarga)
    })
    const Button = () => {
        return (
            <button className='flex flex-row w-[128px] h-[48px] gap-4 justify-between items-center px-[18px] py-[12px] rounded-[24px]'>
                <div onClick={handleIncreaseQuantity} className='bg-[#D9D9D9] p-1 rounded hover:bg-[#23886D]'>
                    <TbPlus/>
                </div>
                <div className='font-bold'>{counter}</div>
                <div onClick={handleDecreaseQuantity} className='bg-[#D9D9D9] p-1 rounded hover:bg-[#23886D]'>
                    <TbMinus/>
                </div>
            </button>
        );
    };

    return (
        <div className='flex flex-col md:flex-row '>
            <div className='left flex flex-row items-start justify-start gap-4 lg:w-[412px]'>
                <img className='w-[150px] h-[150px] object-cover rounded-[8px]' src={data.url} alt='' />
                <div className='flex flex-col'>
                    <div className='flex flex-col '>
                        <h1 className='font-poppins text-[#031C32]  font-medium  leading-6 lg:text-[20px] tracking-[2px]'>{data.title}</h1>
                    </div>
                    <div className='lg:text-[24px] w-[200px] font-semibold text-[#444B59] tracking-[2px] mb-2 lg:hidden'>
                        {data.harga}
                    </div>

                </div>
            </div>
            <div className='max-lg:hidden lg:text-[24px] w-[200px] font-semibold text-[#444B59] tracking-[2px] mb-2'>
                {data.harga}
            </div>
            <div className='right flex flex-row gap-2 h-fit items-center justify-end sm:justify-start'>
                <button onClick={handleDelete} className='text-[24px]'><TbTrash/></button>
                <Button />
            </div>
        </div>
    );
};


export default ProductItem