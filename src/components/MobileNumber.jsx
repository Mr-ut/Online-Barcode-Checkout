import React, { useState } from 'react';
import Otp from './Otp';
import { steps } from 'framer-motion';

const MobileNumber = ({setActiveStep}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showOtpPage, setShowOtpPage] = useState(false);

    const [formData, setFormData] = useState({
        mobile: '',
        acceptTerms: false
    });
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowOtpPage(true);
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="container">
        
        {!showOtpPage ? (

        
        
        <div className="relative ">
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
                <div className=" bg-opacity-20 backdrop-blur-sm p-6 ">
                    <h2 className="text-2xl  font-bold text-gray-800 mb-2 ">Continue with mobile <br /> number</h2>
                    <p className="text-gray-600  mb-6 text-sm ">You will recive a 4 digit verification code.</p>

                    <form onSubmit={handleSubmit}>

                        <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1">
                            Mobile number
                        </label>
                        <div className="relative flex items-center">
                            <div className="absolute left-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">+91</span>
                            </div>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="pl-12 w-full px-3 py-2 border-b border-gray-500 focus:outline-none focus:border-blue-700 "
                                placeholder="Enter your mobile number"
                                pattern="[0-9]{10}"
                                maxLength="10"
                            />
                        </div>

                        <div className=" mt-4 mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    required
                                />
                                <span className="ml-2 text-sm text-gray-700">I hereby accept Zecode's T&C, Privacy Policy</span>
                            </label>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <button
                                type="submit"
                                className="mt-4 bg-black hover:bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-3xl transition-colors"
                            >
                                Continue & Verify OTP
                            </button>


                        </div>
                    </form>
                </div>
            </div>
        </div>)
        : <Otp phoneNo={phoneNumber} setShowOtpPage={setShowOtpPage} setActiveStep={setActiveStep}/>}
        </div>
    );
};

export default MobileNumber;