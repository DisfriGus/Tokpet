import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Kategori = () => {
    const [category, setCategory] = useState([]);
    const [plants, setPlants] = useState([]);
    const [filteredPlants, setFilteredPlants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCategory = await axios.get('http://localhost:8080/api/v1/category');
                setCategory(responseCategory.data);
                const responseTanaman = await axios.get('http://localhost:8080/api/v1/tanaman');
                setPlants(responseTanaman.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handlingChoose = (e) => {
        const selectedCategory = e.target.id;
        
        const filteredData = plants.filter((item) =>
            item.category.includes(selectedCategory)
        );
        setFilteredPlants(filteredData);
    };

    return (
        <div className='flex flex-col gap-[26px] justify-center my-10'>
            <div className='flex gap-[26px] justify-center my-10'>
                {category.map((item) => (
                    <div key={item.id}>
                        <button
                            id={item.title}
                            className='cursor-pointer text-[#939393] hover:text-[#25523B] hover:border-b hover:border-[#25523B] duration-200 '
                            onClick={handlingChoose}
                        >
                            {item.title}
                        </button>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-4 gap-x-[30px] gap-y-[70px] mx-[320px] items-center">
                {filteredPlants.map((item) => (
                    <div key={item.id}>
                        <img className='h-[240px] w-[300px] object-cover' src={item.url} alt="" />
                        <p className='text-[20px] font-semibold mt-5 '>{item.title}</p>
                        <p className='text-[22px] font-semibold'>{item.harga}</p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Kategori;
