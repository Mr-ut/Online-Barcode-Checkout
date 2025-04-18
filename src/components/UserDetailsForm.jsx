import { div } from 'framer-motion/client';
import React, { useState } from 'react';
import MobileNumber from './MobileNumber';

const UserDetailsForm = ({setActiveStep}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    acceptTerms: false
  });

  const [showUserForm, setUserForm] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const onSubmit = () => {
    setUserForm(true);
  }

  return (
    <div className="container">

    {!showUserForm ? (
      <div className="relative">
        {/* Banner Image */}
        <div className="h-48 w-full overflow-hidden"> {/* Adjust height as needed */}
          <img
            src="banner.jpg"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Container - overlapping with transparency */}
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-full ">
          <div className="bg-gray-300 bg-opacity-20 backdrop-blur-sm p-6 ">
            <h2 className="text-2xl ml-11 font-bold text-gray-800 mb-2 ">Tell us more about you</h2>
            <p className="text-gray-600 ml-11 mb-6 text-sm ">Please fill in your details to receive <br /> order notifications.</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder='First Name'
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder='Last Name'
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder='Email'
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-700">I hereby accept T&C, Privacy Policy</span>
                </label>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  type="submit"
                  className="mt-4 bg-black hover:bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-3xl transition-colors"
                  onClick={onSubmit}
                >
                  Continue
                </button>

                <button
                  type="button"
                  className="w-full bg-transparent hover:font-gray-100 text-gray-800 text-sm font-small py-2 px-4 "
                  onClick={onSubmit}
                >
                  Skip and Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>): <MobileNumber setActiveStep={setActiveStep}/>}
    </div>
  );
};

export default UserDetailsForm;