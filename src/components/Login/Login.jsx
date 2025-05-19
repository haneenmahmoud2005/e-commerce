import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { useContext } from 'react';
import { userContext } from '../../context/userContext';

export default function Login() {
  const navigate = useNavigate();
  const { setLogin } = useContext(userContext);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Enter a valid email'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^[A-Za-z][0-9]/, 'Password must start with a letter followed by a number')
      .min(8, 'Password must be at least 8 characters'),
  });

  async function handleLogin(formData) {
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
        formData
      );
      if (response.data.message === 'success') {
        localStorage.setItem('userToken', response.data.token);
        setLogin(true);
        navigate('/');
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Login failed. Please try again.';
      alert(errMsg);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative bg-transparent">
      {/* كارت التسجيل بشفافيه + blur + fade-in animation */}
      <div className="relative w-full max-w-xl bg-white/30 border border-white/40 rounded-3xl backdrop-blur-lg shadow-2xl p-10
        opacity-0  animate-fadeInUp"
      >
        <h2 className="text-4xl font-bold text-fuchsia-400 mb-8 text-center drop-shadow-lg">
          Welcome Back
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="block text-fuchsia-400 font-semibold mb-3 tracking-wide">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-6 py-4 rounded-2xl border text-gray-900 font-medium shadow-md transition-all focus:outline-none focus:ring-4 focus:ring-cyan-400 bg-white/90 ${
                formik.errors.email && formik.touched.email
                  ? 'border-red-500 bg-red-100'
                  : 'border-gray-300'
              }`}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-600 text-sm mt-2">{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-fuchsia-400 font-semibold mb-3 tracking-wide">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-6 py-4 rounded-2xl border text-gray-900 font-medium shadow-md transition-all focus:outline-none focus:ring-4 focus:ring-cyan-400 bg-white/90 ${
                formik.errors.password && formik.touched.password
                  ? 'border-red-500 bg-red-100'
                  : 'border-gray-300'
              }`}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-600 text-sm mt-2">{formik.errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-4 rounded-2xl shadow-lg transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>

      {/* إضافة الـ keyframes في style مدمج */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
