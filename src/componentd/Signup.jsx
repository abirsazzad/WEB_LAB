import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = formData; // Only sending email and password

      const response = await fetch('https://localhost:7287/api/Student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send only email and password
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('✅ Signup successful!');
        console.log(data);
        setFormData({ email: '', password: '' });
      } else {
        setMessage('❌ Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-white to-green-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-medium text-sm text-red-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
