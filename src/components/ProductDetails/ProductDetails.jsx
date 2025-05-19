import axios from 'axios';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import { cartContext } from '../../context/cartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addProductToCart } = useContext(cartContext);

  // جلب تفاصيل المنتج
  const fetchProductDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProduct(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch product details');
      console.error('Error fetching product:', err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  // إضافة المنتج إلى السلة
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

  // حالة التحميل
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  // حالة الخطأ
  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-bold">
        {error}
      </div>
    );
  }

  // حالة المنتج غير موجود
  if (!product) {
    return (
      <div className="text-center mt-10 text-red-600 font-bold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-r from-fuchsia-500 to-cyan-200 rounded-xl shadow-lg p-6">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full max-w-sm rounded-lg shadow-md object-cover h-96"
            loading="lazy"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4 flex flex-col m-auto">
          <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
          <p className="text-gray-600 text-lg">{product.description}</p>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-2xl font-semibold text-green-600">
              {product.price} EGP
            </span>
            <span className="text-yellow-500 flex items-center gap-1">
              {product.ratingsAverage.toFixed(1)}
              <i className="fa-solid fa-star"></i>
            </span>
          </div>

          <div className="space-y-2">
            {product.category && (
              <p className="text-gray-700">
                <span className="font-semibold">Category:</span> {product.category.name}
              </p>
            )}
            {product.brand && (
              <p className="text-gray-700">
                <span className="font-semibold">Brand:</span> {product.brand.name}
              </p>
            )}
            {product.quantity === 0 && (
              <p className="text-red-500 font-semibold">Out of Stock</p>
            )}
          </div>

          <button
            onClick={() => addProductItem(product.id)}  
            disabled={product.quantity === 0}
            className={`mt-6 w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              product.quantity === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white'
            }`}
          >
            {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
