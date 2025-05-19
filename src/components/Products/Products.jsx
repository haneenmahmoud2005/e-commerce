import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import CategorySlider from '../CategorySlider/CategorySlider';

export default function Products() {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);
  let { addProductToCart } = useContext(cartContext);

async function addProductItem(id) {
  try {
    let response = await addProductToCart(id);
    if (response && response.data && response.data.status) {
      console.log('Response Status:', response.data.status);
      if (response.data.status === 'success') {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } else {
      console.error('Unexpected response structure:', response);
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    toast.error('Something went wrong');
  }
}
  

  function getProducts() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => {
        setLoading(false);
        setProduct(data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching products:', error);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (<>
     <CategorySlider/>
    <div className="container mx-auto">
   
      {!isLoading ? (
        <div className="flex flex-wrap">
          {product.length > 0 ? (
            product.map((productInfo) => (
              <div
                key={productInfo.id}
                className="w-full sm:w-1/4 md:w-1/4 lg:w-1/5 p-3"
              >
                <div className="bg-white shadow-md rounded-lg overflow-hidden m-1 bg-gradient-to-r from-fuchsia-300 to-cyan-200 p-3 pb-0 pro hover:scale-105 transition-transform duration-300">
                  <Link to={`/productDetails/${productInfo.id}`}>
                    <img
                      src={productInfo.imageCover}
                      alt={productInfo.title}
                      className="w-full"
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-blue-600">
                        {productInfo.category.name}
                      </h3>
                      <span className="block">
                        {productInfo.title.split(' ').slice(0, 3).join(' ')}
                      </span>
                      <div className="flex justify-between my-2">
                        <span className="text-emerald-800">
                          {productInfo.price} EGP
                        </span>
                        <span>
                          {productInfo.ratingsQuantity}
                          <i className="fa-solid fa-star text-yellow-400"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      addProductItem(productInfo._id);
                    }}
                    className="bg-fuchsia-700 w-full m-1 p-2 text-white bttn rounded-2xl shadow-2xl hover:bg-fuchsia-800 transition-all"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full mt-4 text-white">
              No products found.
            </p>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
 </> );
}
