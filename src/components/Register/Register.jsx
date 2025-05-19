import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userContext } from '../../context/userContext';
import axios from 'axios';

export default function Register() {
  const { setLogin } = useContext(userContext); // Use the context to update login status
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(10, 'Name cannot exceed 10 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Enter a valid email'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^01[0125][0-9]{8}$/, 'Enter a valid phone number'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^[A-Za-z][A-Za-z0-9]{7,}$/, 'Password must start with a letter and be at least 8 characters'),
    rePassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  // Handle form submission
  async function handleRegister(values) {
    setLoading(true);
    console.log("📤 Data being sent:", values);

    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        values
      );

      console.log("✅ Server response:", response.data);

      if (response.data.message === 'success') {
        // If registration is successful, save the token and update login state
        localStorage.setItem('userToken', response.data.token);
        setLogin(true); // Set login state to true after successful registration
        navigate('/'); // Redirect to homepage or any other page
      } else {
        const errorMsg = response.data.message || 'Registration failed.';
        alert(errorMsg);
      }
    } catch (error) {
      console.error("❌ Full error object:", error);

      const errorMsg =
        error.response?.data?.message ||
        'An unexpected error occurred. Please try again later.';

      // Show server message (like "Email already exists")
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-200 to-cyan-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">User Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-xl border ${formik.errors.name && formik.touched.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-fuchsia-400`}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-xl border ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-fuchsia-400`}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-xl border ${formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-fuchsia-400`}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          {/* RePassword */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="rePassword"
              placeholder="••••••••"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-xl border ${formik.errors.rePassword && formik.touched.rePassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-fuchsia-400`}
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="text-red-500 text-sm">{formik.errors.rePassword}</div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="01XXXXXXXXX"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-xl border ${formik.errors.phone && formik.touched.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-fuchsia-400`}
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white py-2 rounded-xl font-semibold transition duration-300"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {/* Redirect to Login */}
          <p className="text-gray-400 text-sm text-center mt-2">
            Already have an account?
            <a href="/login" className="text-fuchsia-500 hover:underline ml-1">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
