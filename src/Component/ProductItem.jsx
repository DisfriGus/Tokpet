import React, { useEffect, useState } from 'react'

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
            if (item.id === data.id) {
                item.quantity = (item.quantity || 0) + 1;
                item.totalItemPrice = (parseFloat(item.harga.replace(/RP\./g, "")) * item.quantity);
                setTotal(item.totalItemPrice);
            }
            return item;
        });
        localStorage.setItem('cartData', JSON.stringify(updatedData));
        setCounter((prevCounter) => prevCounter + 1);

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
            totalHarga += element.totalItemPrice
        });
        setTotal(totalHarga)
    })
    const Button = () => {
        return (
            <button className='flex flex-row w-[128px] h-[48px] gap-4 justify-between items-center bg-[#F2F2F2] px-[18px] py=[12px] rounded-[24px]'>
                <div onClick={handleDecreaseQuantity}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <mask id='mask0_201_588' maskUnits='userSpaceOnUse' x='0' y='0' width='24' height='24'>
                            <rect width='24' height='24' fill='#D9D9D9' />
                        </mask>
                        <g mask='url(#mask0_201_588)'>
                            <path d='M5 13V11H19V13H5Z' fill='#757575' />
                        </g>
                    </svg>
                </div>
                <div className='font-bold'>{counter}</div>
                <div onClick={handleIncreaseQuantity}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <mask id='mask0_201_592' maskUnits='userSpaceOnUse' x='0' y='0' width='24' height='24'>
                            <rect width='24' height='24' fill='#D9D9D9' />
                        </mask>
                        <g mask='url(#mask0_201_592)'>
                            <path d='M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z' fill='#031C32' />
                        </g>
                    </svg>
                </div>
            </button>
        );
    };

    return (
        <div className='flex '>
            <div className='left flex flex-row items-start justify-start gap-4 w-[412px]'>
                <img className='w-[150px] h-[150px] object-cover rounded-[8px]' src={data.url} alt='' />
                <div className='flex flex-col'>
                    <h1 className='font-poppins text-[#031C32] text-lg font-medium  leading-6'>{data.title}</h1>
                </div>
            </div>
            <div className='text-[24px] w-[200px] font-bold mb-2'>
                {data.harga}
            </div>
            <div className='right flex flex-row gap-2 h-fit items-center justify-end sm:justify-start'>
                <button onClick={handleDelete}>Delete</button>
                <Button />
            </div>
        </div>
    );
};


export default ProductItem