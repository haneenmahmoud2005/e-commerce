import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from "../../context/cartContext";
import { Link } from 'react-router-dom';
import './Carts.module.css';

export default function Carts() {
  const [product, setProduct] = useState(null);
  const { getProductToCart, deleteProductFromCart, updateProductQuantity } = useContext(cartContext);
  const [cartId, setCartId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const totalPrice = product?.reduce((acc, item) => acc + (item.price * item.count), 0);

  async function getProduct() {
    try {
      const { data } = await getProductToCart();
      setProduct(data?.data?.products);
      setCartId(data?.data._id);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  async function deleteProduct(id) {
    setDeletingId(id);

    setTimeout(async () => {
      try {
        const { data } = await deleteProductFromCart(id);
        setProduct(data?.data.products);
        setDeletingId(null);
      } catch (error) {
        console.error("Error deleting product:", error);
        setDeletingId(null);
      }
    }, 300);
  }

  async function changeCount(id, newCount) {
    if (newCount < 1) return;

    try {
      const response = await updateProductQuantity(id, newCount);
      if (response?.data?.status === 'success') {
        setProduct(response.data.data.products);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b animated-bg py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-center mb-12 text-purple-500  animate-fadeInDown">
          Your Shopping Cart
        </h1>
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Product List */}
          <div className="flex-1 space-y-6">
            {product?.length > 0 ? (
              product.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md transition-all duration-300 ease-in-out p-6
                    ${deletingId === item.product.id ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}
                  `}
                >
                  <img
                    src={item.product?.imageCover}
                    alt={item.product?.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 md:ml-4 mt-3 md:mt-0">
                    <h3 className="text-lg font-semibold text-purple-900">{item.product?.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.product?.category?.name}</p>
                    <p className="mt-1 text-md font-semibold text-purple-700">{item.price} EGP</p>
                  </div>

                  <div className="flex items-center border rounded-md overflow-hidden mt-3 md:mt-0">
                    <button
                      className="bg-purple-200 hover:bg-purple-300 px-2 py-1"
                      onClick={() => changeCount(item.product.id, item.count - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.count}
                      onChange={(e) => {
                        const newCount = parseInt(e.target.value, 10);
                        if (!isNaN(newCount)) changeCount(item.product.id, newCount);
                      }}
                      className="w-12 text-center border-x border-purple-300 text-sm"
                    />
                    <button
                      className="bg-purple-200 hover:bg-purple-300 px-2 py-1"
                      onClick={() => changeCount(item.product.id, item.count + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => deleteProduct(item.product.id)}
                    className="ml-4 text-red-600 hover:text-red-700 transition transform hover:scale-110"
                    aria-label="Delete product"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4
                           m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                      />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No products in your cart.</p>
            )}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-purple-400 mb-6">Summary</h2>
              <div className="flex justify-between text-lg font-semibold text-gray-900 border-t border-purple-300 pt-4">
                <span>Total Price:</span>
                <span>{totalPrice?.toFixed(2) || 0} EGP</span>
              </div>
            </div>
            <Link to={`/checkout/${cartId}`}>
              <button
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                disabled={!product || product.length === 0}
              >
                Checkout
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
