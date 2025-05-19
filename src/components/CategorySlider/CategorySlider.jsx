import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function CategorySlider() {
  const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true, // تشغيل الحركة التلقائية
  autoplaySpeed: 2000, // المدة بين كل سلايد (بالملي ثانية) = 2 ثواني
};

  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({ data }) => {
        setCategories(data.data);
        console.log('Fetched categories:', data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="mb-5">
      <h1 className="p-4 text-3xl font-bold text-white text-center">
        Shop Popular Categories
      </h1>

      <Slider {...settings}>
        {categories.map((cat, index) => (
          <div key={index} className="px-2">
            <img
              src={cat.image}
              alt={cat.name || `Category ${index + 1}`}
              loading="lazy"
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
