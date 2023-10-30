import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductItem from '../Component/ProductItem';

const KeranjangBelanja = () => {
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState(null);

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value);
    };
    const handleGoBack = () => {
        navigate(-1)
    };
    const [showDialog, setShowDialog] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    // console.log(subTotal)

    useEffect(() => {
        // Retrieve cart data from localStorage
        const existingCartData = localStorage.getItem('cartData');
        if (existingCartData) {
            setCartData(JSON.parse(existingCartData));
            // setSubTotal(total)
        }
    }, []);
    return (
        <div className='mx-[68px] flex gap-[250px] mt-8 relative'>
            <div>
                <div className='flex gap-6 mb-[52px]'>
                    <button onClick={() => navigate(-1)}>Back</button>
                    <h1 className='lg:text-[30px] lg:font-bold tracking-[3px] font-poppins'>Keranjang Belanja</h1>
                </div>
                <div className='flex justify-between'>
                    <div className='w-full  '>
                        <div className='flex border-b-2 '>
                            <p className='text-[24px] w-[412px] '>Produk</p>
                            <p className='text-[24px] w-[250px]'>Harga</p>
                            <p className='text-[24px]'>Jumlah</p>
                        </div>
                        <div className='flex flex-col gap-9 mt-6'>
                            {cartData.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ProductItem data={item} setTotal={setSubTotal} />
                                    </div>
                                )
                            })}

                        </div>
                        <div className='flex justify-between text-[20px]'>
                            <p>Subtotal untuk Produk</p>
                            <p>Rp {subTotal}</p>
                        </div>
                        <div className='flex justify-between text-[20px]'>
                            <p>Subtotal Pengiriman </p>
                            <p>Rp {subTotal}</p>
                        </div>
                        <div className='flex justify-between text-[20px]'>
                            <p>Total Pembayaran</p>
                            <p>Rp {subTotal*2}</p>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
            <div className='absolute left-[56%] h-[1000px] top-[-30px] border-r-4 mx-[52px]'>
            </div>
            <div className='w-[1200px] mx-9 '>
                <div className='mt-2'>
                    <h1 className='text-[30px] font-semibold mb-4'>Info Pembayaran</h1>
                    <p className='text-[20px] mb-3'>Alamat Pengirim</p>
                    <input type="text" placeholder='Masukkan Alamat' className='py-2 border-b w-full text-[18px] outline-none' />
                </div>
                <div className='mt-8'>
                    <h1 className='text-[20px]'>Opsi Pengiriman</h1>
                    <div className='flex gap-[38px]'>
                        <h1 className='w-[100px]'>JNE</h1>
                        <h1 className='w-[100px]'>JNT</h1>
                        <h1 className='w-[100px]'>TIKI</h1>
                    </div>
                </div>
                <div className='mt-8'>
                    <h1 className='text-[20px]'>Opsi Pembayaran</h1>
                    <div className='flex gap-[38px]'>
                        <h1 className='w-[100px]'>JNE</h1>
                        <h1 className='w-[100px]'>JNT</h1>
                        <h1 className='w-[100px]'>TIKI</h1>
                        <h1 className='w-[100px]'>TIKI</h1>
                    </div>
                </div>
                <div className='mt-8'>
                    <h1>Pesan</h1>
                    <textarea name="" id="" className='w-[500px] h-[160px] resize-none '></textarea>
                </div>
                <button className='mt-8'>
                    Buat Pesanan
                </button>
            </div>
        </div>
    )
}

export default KeranjangBelanja