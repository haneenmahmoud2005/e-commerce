import React from 'react';
import CategorySlider from '../CategorySlider/CategorySlider';

export default function Brands() {
  const brands = [
    {
      _id: '1',
      name: 'Nike',
      image: 'https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo.png',
      link: 'https://www.nike.com',
    },
    {
      _id: '2',
      name: 'Adidas',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
      link: 'https://www.adidas.com',
    },
    {
      _id: '3',
      name: 'Puma',
      image: 'https://upload.wikimedia.org/wikipedia/ar/d/d7/Puma_Logo.svg',
      link: 'https://www.puma.com',
    },
    {
      _id: '4',
      name: 'Apple',
      image: 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png',
      link: 'https://www.apple.com',
    },
  ];

  return (
    <>
      <CategorySlider />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Top Brands</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="bg-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-200"
            >
              <a href={brand.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-24 h-24 object-contain mx-auto mt-6 mb-4"
                  onError={(e) => (e.target.src = '/images/default-logo.png')}
                />
                <h3 className="text-xl font-semibold text-center text-gray-800">{brand.name}</h3>
                <p className="text-center text-gray-500 mt-2 mb-6">Click to Visit</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
