import React from 'react';
import { TiStarFullOutline } from 'react-icons/ti';

const StarRating = ({ jumlah }) => {
  const starCount = Number(jumlah); // Convert jumlah to a number

  if (isNaN(starCount) || starCount < 1) {
    // Handle the case where jumlah is not a valid number or less than 1
    return null; // You can return null or a message indicating an invalid input
  }

  return (
    <div className='flex'>
      {[...Array(starCount)].map((_, index) => {
        return <TiStarFullOutline key={index} className='text-yellow-400' />;
      })}
    </div>
  );
};

export default StarRating;
