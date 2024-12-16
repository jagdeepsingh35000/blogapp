import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {


    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleEmailSubmit = (e) => {
      e.preventDefault();
      // Add logic to send OTP to the email
      

      axios.post("https://blogserver-4pih.onrender.com/user/otpgenerate",{email})
      .then((res)=>{
        setIsOtpSent(true);
        console.log(res)})
        .catch((err)=>{
        console.log(err)
      })
    };
  
    const handleOtpSubmit = (e) => {
      e.preventDefault();
      // Add logic to verify OTP and allow the user to reset their password

      axios.post("https://blogserver-4pih.onrender.com/user/verifyotp",{email,otp})
      .then((res)=>{
        alert('OTP Verified');
        setIsOtpVerified(true);
        console.log(res)})
        .catch((err)=>{
          alert(err.response.data.message)
        // console.log(err.response.data.message)
      })
     
    };


    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
          setPasswordError("Passwords don't match");
        } else {

          console.log(email)
          console.log(newPassword)
          let password = newPassword;
          // Add logic to reset the password
          axios.post("https://blogserver-4pih.onrender.com/user/changepassword",{email,password})
          .then((res)=>{
          alert('Password successfully changed!');
            console.log(res)})
            .catch((err)=>{
              alert(err.response.data.errmsg)
            console.log(err.response.data.errmsg)
          })

        }
      };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isOtpVerified ? 'Create New Password' : isOtpSent ? 'Verify OTP' : 'Forgot Password'}
        </h2>

        {!isOtpSent ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Enter your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send OTP
            </button>
          </form>
        ) : isOtpVerified ? (
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {passwordError && (
              <div className="text-red-500 text-sm mb-4">{passwordError}</div>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-700 font-medium mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Verify OTP
            </button>
          </form>
        )}

        <div className="text-center mt-4 text-sm text-gray-600">
          <span>
            {isOtpSent && !isOtpVerified
              ? "Didn't receive the OTP?"
              : isOtpVerified
              ? 'Want to change the password again?'
              : 'Remember your password?'}
          </span>
          <button
            onClick={() => {
              if (isOtpSent) {
                setIsOtpSent(false);
                setIsOtpVerified(false);
              }
            }}
            className="text-blue-600 hover:text-blue-700 ml-1"
          >
            {isOtpSent && !isOtpVerified ? 'Resend OTP' : <Link to={'/login'}>login</Link>}
          </button>
        </div>
      </div>
    </div>
  )
}
