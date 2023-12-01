import { onAuthStateChanged } from 'firebase/auth';
import React from 'react'
import { auth } from '../Config/Firebase';


const Product = ({ product, onBuy}) => {
    const addToCart = () => {
        const user = onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                const existingCartData = localStorage.getItem('cartData');
                let cartData = existingCartData ? JSON.parse(existingCartData) : [];

                const existingItem = cartData.find(item => item.id === product.id);
                if (existingItem) {
                    existingItem.quantity = (existingItem.quantity || 1) + 1;
                } else {
                    cartData.push({ ...product, quantity: 1 });
                }

                localStorage.setItem('cartData', JSON.stringify(cartData));
                onBuy(product)
            }

        }
        )
    };

    return (
        <div onClick={addToCart} className='cursor-pointer'>
            <img src={product.url} alt="" className='h-[360px] w-[400px] object-cover' />
            <h1 className='font-poppins md:text-[24px] font-medium'>{product.title}</h1>
            <p className='font-poppins md:text-[18px] font-semibold'>{product.harga}</p>
            
        </div>
    )
}

export default Product