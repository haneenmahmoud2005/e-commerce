import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');

    if (!userToken) {
      navigate('/login');
      return;
    }

    const headers = {
      token: userToken,
    };

    async function fetchOrders() {
      try {
        const response = await axios.get(
          'https://ecommerce.routemisr.com/api/v1/orders/',
          { headers }
        );

        if (response.data && Array.isArray(response.data.data)) {
          setOrders(response.data.data);
        } else {
          setError('No orders found.');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('userToken');
          navigate('/login');
        } else {
          setError('Error fetching orders. Please try again later.');
        }
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        <span>Loading your orders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-100 to-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Your Orders</h2>

        <button 
          onClick={() => navigate('/')} 
          className="text-purple-600 font-semibold mb-8 hover:underline"
        >
          ← Back to Home
        </button>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found for this user.</p>
        ) : (
          <ul className="space-y-6">
            {orders.map((order) => (
              <li
                key={order._id}
                className="border border-purple-300 rounded-lg p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-purple-800">Order #{order._id.slice(-6)}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                  </span>
                </div>

                <p className="text-gray-600 mb-1">
                  <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p className="text-gray-600 mb-1">
                  <strong>Total Price:</strong> ${order.totalOrderPrice.toFixed(2)}
                </p>

                <p className="text-gray-600">
                  <strong>Products:</strong> {order.cartItems?.length || 0} item(s)
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
