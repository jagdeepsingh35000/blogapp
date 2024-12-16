import React, { useContext, useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import UserContext from '../../Context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginPage() {

  let navigate = useNavigate();
  const {user,setUser} = useContext(UserContext)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data:", formData);



        axios.post("https://blogserver-4pih.onrender.com/user/login",formData)
        .then((response)=>{
          
          console.log(response)
          setUser(response.data.existingUser)
           localStorage.setItem("Blogtoken",response.data.token)
           toast.success("successfully login")
           navigate("/")
        })
        .catch((error)=>
          {
            toast.error(error.response.data.errmsg)
            console.log(error)})

        // Add authentication logic here




      };
    
  return (
    <div>
        <Navbar/>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        <h2 className="text-[50px] font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-[30px] font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-5 py-3 border rounded-lg text-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[30px] font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-5 py-3 border rounded-lg text-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-[30px] text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none transition"
          >
            Login
          </button>
        </form>

        {/* Additional Links */}
        <div className="text-center mt-6">
          <Link
            to="/forgot-password"
            className="text-blue-500 text-[25px]  hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-4 text-[25px]">
          <span className="text-gray-600 ">Don't have an account?</span>{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
    </div>
  )
}
