import React, { useEffect ,useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import Loader from '../Loader/Loader';

// تحقق من صحة رقم الهاتف
const phoneRegExp = /^01[0125][0-9]{8}$/;

export default function Checkout() {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  const [isLoading, setIsLoading] = useState(false);
  

  // التحقق من وجود المستخدم المسجل
  useEffect(() => {
    if (!token) {
      toast.error('You must be logged in to proceed');
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [token, navigate]);

  const formik = useFormik({
    initialValues: {
      city: '',
      phone: '',
      details: '',
    },
    validationSchema: Yup.object({
      city: Yup.string()
        .required('City is required')
        .min(3, 'City must be at least 3 characters'),
      phone: Yup.string()
        .required('Phone is required')
        .matches(phoneRegExp, 'Phone number is not valid'),
      details: Yup.string()
        .required('Address details are required')
        .min(10, 'Address must be at least 10 characters'),
    }),
    onSubmit: handleCheckout,
  });

  async function handleCheckout(formData) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress: formData },
        {
          headers: { token },
          params: { url: window.location.origin }, // استخدام رابط الموقع الحالي
        }
      );
      
      window.location.href = data.session.url;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Checkout failed. Please try again.';
      toast.error(errorMsg);
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!token || isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-fuchsia-50 to-cyan-50 flex items-center justify-center p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-fuchsia-600 mb-6">
          Shipping Information
        </h2>

        <div className="space-y-4">
          {/* City Field */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              id="city"
              type="text"
              {...formik.getFieldProps('city')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent ${
                formik.touched.city && formik.errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your city"
            />
            {formik.touched.city && formik.errors.city && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.city}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              {...formik.getFieldProps('phone')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent ${
                formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="01XXXXXXXXX"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
            )}
          </div>

          {/* Address Details */}
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
              Address Details *
            </label>
            <textarea
              id="details"
              rows={3}
              {...formik.getFieldProps('details')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent ${
                formik.touched.details && formik.errors.details ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Street, building, apartment details"
            />
            {formik.touched.details && formik.errors.details && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.details}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !formik.isValid}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              isLoading || !formik.isValid
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-fuchsia-600 hover:bg-fuchsia-700'
            }`}
          >
            {isLoading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </form>
    </div>
  );
}