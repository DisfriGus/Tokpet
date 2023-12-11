import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Kategori = () => {
    const [category, setCategory] = useState([]);
    const [plants, setPlants] = useState([]);
    const [filteredPlants, setFilteredPlants] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCategory = await axios.get('https://13.213.46.17:8080/api/v1/category');
                setCategory(responseCategory.data);
                const responseTanaman = await axios.get('https://13.213.46.17:8080/api/v1/tanaman');
                setPlants(responseTanaman.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (category.length > 0) {
            // Set selected category to the first category in the list
            setSelectedCategory(category[0].title);
        }
    }, [category]);

    useEffect(() => {
        const filteredData = plants.filter((item) => item.category.includes(selectedCategory));
        setFilteredPlants(filteredData)    
    }, [selectedCategory, plants]);

    const handlingChoose = (e) => {
        const selectedCategory = e.target.id;
        setSelectedCategory(selectedCategory);
        const filteredData = plants.filter((item) =>
            item.category.includes(selectedCategory)
        );
        setFilteredPlants(filteredData);
    };

    return (
        <div className='flex flex-col gap-[26px] justify-center my-10 '>
            <div className='flex gap-[26px] justify-center my-10 max-md:overflow-auto max-md:pl-[400px]'>
                {category.map((item) => (   
                    <div key={item.id}>
                        <button
                            id={item.title}
                            className='cursor-pointer text-[#939393] hover:text-[#25523B] hover:border-b hover:border-[#25523B] duration-200 w-[100px] '
                            onClick={handlingChoose}
                        >
                            {item.title}
                        </button>
                    </div>
                ))}
            </div>
            <div className="grid  grid-cols-1 lg:grid-cols-4 gap-x-[30px] lg:gap-y-[70px] mx-[60px] lg:mx-[320px] items-center cursor-pointer">
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
