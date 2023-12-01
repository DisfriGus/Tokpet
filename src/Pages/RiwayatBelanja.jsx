import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth';
import OrderCard from '../Component/OrderCard';
const RiwayatBelanja = () => {
    const [riwayatData, setRiwayatData] = useState([]);
    const [totalBayar, setTotalBayar] = useState(0)
    const navigate = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            const auth = getAuth();
            try {
                const responseCustomer = await axios.get('http://localhost:8080/api/v1/customer');
                const responseTanaman = await axios.get('http://localhost:8080/api/v1/tanaman');
                const userLogin = responseCustomer.data.find((user) => user.username === auth.currentUser.displayName);
                const foundRiwayats = [];

                responseCustomer.data.forEach((customer) => {
                    if (customer.riwayat !== null && customer.username === userLogin.username) {
                        // Pelanggan memiliki riwayat belanja
                        customer.riwayat.forEach((riwayats) => {
                            const filteredRiwayat = riwayats.filter((riwayat) => {
                                // Cek apakah id_tanaman ada di responseTanaman
                                return responseTanaman.data.some((tanaman) => tanaman.id === riwayat.id_tanaman);
                            });

                            foundRiwayats.push(filteredRiwayat);
                        });
                    }
                });
                const testRiwayat = foundRiwayats.map((test) =>
                    test.flat().map((tests) => {
                        const matchingTanaman = responseTanaman.data.find((tanaman) => tanaman.id === tests.id_tanaman);
                        return { ...tests, tanamanInfo: matchingTanaman };
                    })
                );

                setRiwayatData(testRiwayat);

                let totalPrice = 0;
                setRiwayatData(testRiwayat)



            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Calculate total price
    const calculateTotalPrice = (riwayat) => {
        return riwayat.reduce((acc, data) => {
          return acc + parseFloat(data.tanamanInfo.harga.replace(/RP\./g, '')) * data.quantity;
        }, 0);
      };



    return (
        <div className='mx-[36px] font-poppins'>
            <div className='flex items-center gap-4'>
                <TbArrowNarrowLeft className='text-[32px]' onClick={() => navigate(-1)} />
                <h2 className='text-[30px] tracking-[3px] font-bold'> Riwayat Belanja</h2>

            </div>
            <div className='flex justify-between items-center px-6 py-3    '>
                <div className='flex flex-col gap-4 w-full '>
                    {riwayatData.map((riwayat, index) => (
                        <div className='flex justify-between border items-center'>
                            <div key={index} className='flex flex-col gap-4 ml-[30px] my-6 '>
                                {riwayat.map((data, innerIndex) => (
                                    <OrderCard
                                        key={innerIndex}
                                        url={data.tanamanInfo.url}
                                        title={data.tanamanInfo.title}
                                        quantity={data.quantity}
                                        harga={data.tanamanInfo.harga}
                                    // Add other props as needed
                                    />
                                ))}
                            </div>


                            <div className='mr-[54px] flex flex-col lg:my-7'>
                                <div className='border-l-2 pl-7 pr-[23px]'>
                                    <p className='tracking-[1.5px]'>Total Belanja</p>

                                    <p className='tracking-[1.5px]'>Rp
                                    <p className='tracking-[1.5px]'>Rp {calculateTotalPrice(riwayat)}</p>
                                    </p>
                                </div>
                                <button className='w-full border ml-6'>Beli Lagi</button>
                            </div>



                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default RiwayatBelanja;
