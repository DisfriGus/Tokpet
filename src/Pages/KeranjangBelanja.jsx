import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductItem from '../Component/ProductItem';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import JNE from '../assets/jne.png'
import JNT from '../assets/jnt.png'
import TIKI from '../assets/tiki.png'
import DANA from '../assets/dana.png'
import GOPAY from '../assets/gopay.png'
import LINKAJA from '../assets/linkaja.png'
import OVO from '../assets/ovo.png'
import axios from 'axios'
import { auth } from '../Config/Firebase';
import PaymentSuccessDialog from '../Component/PaymentSuccessDialog';

const KeranjangBelanja = () => {
  
    const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [alamat, setAlamat] = useState('');
  const [customer, setCustomer] = useState({
    id: '',
    email: '',
    username: '',
    riwayat: [], // Tambahkan properti riwayat
  });
  const [showDialog, setShowDialog]= useState(false)
  

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const [cartData, setCartData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const handleChangeText = (e) => {
    const { value } = e.target;
    setAlamat(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://13.213.46.17:8080/api/v1/customer');
        
        if (auth.currentUser && auth.currentUser.displayName) {
          const userLogin = response.data.find((user) => user.username === auth.currentUser.displayName);
          if (userLogin) {
            const userId = userLogin.id;
            setAlamat(userLogin.address);
            setCustomer((prevCustomer) => ({
              ...prevCustomer,
              id: userId,
              email: userLogin.email,
              username: userLogin.username,
              riwayat: userLogin.riwayat
            }));
            console.log(customer.riwayat)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const existingCartData = localStorage.getItem('cartData');
    if (existingCartData) {
      setCartData(JSON.parse(existingCartData));
    }
  }, []);
  
  const handlePesanan = async () => {
    try {
      const riwayatArray = cartData.map((cart) => ({
        id_tanaman: cart.id,
        quantity: parseInt(cart.quantity, 10),
      }));
  
      const updatedCustomer = {
        ...customer,
        riwayat: [riwayatArray],
      };
      console.log('Sending request with data:', updatedCustomer);
      const response = await axios.put(`https://13.213.46.17:8080/api/v1/customer/${customer.id}`, updatedCustomer);
      setShowDialog(!showDialog)
      localStorage.removeItem('cartData');
    } catch (error) {
      console.error('Error:', error.message, error.response);
    }
  };
  

    return (
        <div className='mx-2 lg:mx-[72px] flex mt-8 justify-evenly font-poppins max-2xl:flex-col'>
          {showDialog && (<PaymentSuccessDialog handleDialog={handlePesanan} total={subTotal*2} />)}
            <div>
                <div className='flex lg:gap-6 mb-[52px] items-center'>
                    <button className='text-[32px]' onClick={() => navigate(-1)}><TbArrowNarrowLeft /></button>
                    <h1 className='lg:text-[30px] lg:font-bold tracking-[3px] font-poppins'>Keranjang Belanja</h1>
                </div>
                <div className='flex justify-between'>
                    <div className='w-full   '>
                        <div className='flex border-b-2 max-lg:hidden'>
                            <p className='lg:text-[24px] lg:w-[412px] text-[#444B59] tracking-[2px] '>Produk</p>
                            <p className='lg:text-[24px] w-[250px] text-[#444B59] tracking-[2px]'>Harga</p>
                            <p className='lg:text-[24px] text-[#444B59] tracking-[2px]'>Jumlah</p>
                        </div>
                        <div className='flex flex-col gap-9 mt-6 mb-[42px]'>
                            {cartData.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ProductItem data={item} setTotal={setSubTotal} />
                                    </div>
                                )
                            })}

                        </div>
                        <div className='flex justify-between text-[20px] mb-[20px]'>
                            <p className='font-semibold text-[20px] text-[#444B59] tracking-[2px]'>Subtotal untuk Produk</p>
                            <p className='font-semibold text-[20px] text-[#444B59] tracking-[2px]'>Rp {subTotal}</p>
                        </div>
                        <div className='flex justify-between text-[20px]'>
                            <p className='font-semibold text-[20px] text-[#444B59] tracking-[2px]'>Subtotal Pengiriman </p>
                            <p className='font-semibold text-[20px] text-[#444B59] tracking-[2px]'>Rp {subTotal}</p>
                        </div>

                        <div className='flex justify-between text-[20px] border py-5 mt-[48px] px-4 bg-[#E8E6E6]'>
                            <p className='font-semibold text-[20px] text-[#444B59] tracking-[2px]'>Total Pembayaran</p>
                            <p className='font-semibold text-[20px] text-[#444B59] tracking-[2px]'>Rp {subTotal * 2}</p>
                        </div>


                    </div>
                </div>
            </div>
            <div className='max-2xl:hidden h-[1000px] top-[-30px] border-r-4'>
            </div>
            <div className='lg:w-[500px] mx-9 '>
                <div className='mt-2'>
                    <h1 className='text-[20px] lg:text-[30px] font-semibold mb-4 text-[#444B59] tracking-[2px]'>Info Pembayaran</h1>
                    <p className='lg:text-[20px] mb-3 text-[#444B59] tracking-[2px]'>Alamat Pengirim</p>
                    <input type="text" id='alamat' placeholder='Masukkan Alamat' className='py-2 border-b lg:w-full lg:text-[18px] outline-none' value={alamat} onChange={handleChangeText} />
                </div>
                <div className='mt-8'>
                    <h1 className='text-[20px] mb-6 text-[#444B59] tracking-[2px]'>Opsi Pengiriman</h1>
                    <div className='flex max-md:flex-wrap gap-[38px]'>
                        <button>
                            <img src={JNE} alt="JNE" />
                        </button>
                        <button>
                            <img src={JNT} alt="JNT" />
                        </button>
                        <button>
                            <img src={TIKI} alt="TIKI" />
                        </button>

                    </div>
                </div>
                <div className='mt-8'>
                    <h1 className='text-[20px] mb-6 text-[#444B59] tracking-[2px]'>Opsi Pembayaran</h1>
                    <div className='flex max-lg:flex-wrap gap-[38px] '>
                        <button>
                            <img src={DANA} alt="TIKI" />
                        </button>
                        <button>
                            <img src={GOPAY} alt="GOPAY" />
                        </button>
                        <button>
                            <img src={LINKAJA} alt="LINKAJA" />
                        </button>
                        <button>
                            <img src={OVO} alt="OVO" />
                        </button>
                    </div>
                </div>
                <div className='mt-8'>
                    <h1 className='text-[20px] text-[#444B59] tracking-[2px]'>Pesan</h1>
                    <textarea name="" id="" className='w-[300px] md:w-[500px] h-[320px] md:h-[160px] resize-none bg-[#E8E6E6] p-4 rounded-md ' placeholder='Silahkan Tinggalkan Pesan Anda'></textarea>
                </div>
                <div className='flex md:justify-center'>
                    <button className='mt-8 text-[#fff] tracking-[2px] border px-[72px] bg-[#23886D] py-[22px] rounded-full' onClick={()=>setShowDialog(true)}>
                        Buat Pesanan
                    </button>

                </div>
            </div>
        </div>
    )
}

export default KeranjangBelanja