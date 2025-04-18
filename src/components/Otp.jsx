import React, { useState, useEffect } from 'react';

const Otp = ({ phoneNo, setShowOtpPage, setActiveStep }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const phoneNumber = `+91 ${phoneNo}`; // Replace with dynamic value

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [secondsLeft]);

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    console.log('Verifying OTP:', fullOtp);
    // Add your verification logic here

  };

  const handleResend = () => {
    setSecondsLeft(60);
    console.log('Resending OTP...');
    // Add resend logic here
  };

  return (
    <div className="container">

    
    <div className='relative'>


      <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Enter OTP</h2>
        <p className="text-gray-600 mb-6 text-center">
          The OTP has been sent to {phoneNumber}
          <button className="text-blue-600 ml-2 font-medium"
            onClick={() => setShowOtpPage(false)}>Change</button>
        </p>

        <form onSubmit={handleVerify}>
          <div className="flex justify-center space-x-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-2xl text-center border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                maxLength="1"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          <div className="flex justify-center">
            <button

              className="w-2/3 bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-3xl mb-4 transition-colors"
              onClick={() => setActiveStep('review')}
            >
              Verify OTP
            </button>
          </div>

          <div className="text-center text-gray-500">
            {secondsLeft > 0 ? (
              <span>Resend in {secondsLeft} seconds</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 font-medium"
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="h-1008 w-full overflow-hidden"> {/* Adjust height as needed */}
        <img
          src="banner.jpg"
          alt="Banner"
          className="w-full h-full object-cover  inset-0 bg-black/500"
        />
      </div>
    </div>
    </div>
  );
};

export default Otp;