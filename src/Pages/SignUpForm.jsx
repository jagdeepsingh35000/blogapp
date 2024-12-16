import React, { useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function SignUpForm() {

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageobeject, setImageObject] = useState(null);
 let navigate = useNavigate();
  
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);


    console.log(formData)

    
    axios.post("https://blogserver-4pih.onrender.com/user/register",formData).then((res)=>
    {
      console.log(res)
      // alert("user created")
      toast.success("user created")
      navigate("/login")

      
    })
    .catch((err)=>
    {
            toast.error(err.response.data.errmsg)
    })


  };

  return (
    <div><Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-10 transform transition-all hover:scale-105 duration-300">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full border-2 border-dashed border-blue-400 cursor-pointer hover:bg-gray-300 transition"
            >
              {imageobeject ? (
                <img
                
                  src={imageobeject}
                  alt="Uploaded"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-blue-400 text-lg font-medium">Upload</span>
              )}
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={(e) =>{ setImage((e.target.files[0])) 
                setImageObject(URL.createObjectURL(e.target.files[0]))
                }
              }
              className="hidden"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-5 py-3 border rounded-lg text-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-5 py-3 border rounded-lg text-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-5 py-3 border rounded-lg text-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-xl text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}
