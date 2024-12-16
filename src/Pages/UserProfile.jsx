import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../Context/UserContext';
import BlogContext from '../../Context/BlogContext';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserProfile() {
  const { user } = useContext(UserContext);
  
    const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);
 const [toggle, setToggle] = useState(false); 

let token = localStorage.getItem("Blogtoken");

useEffect(()=>
  {
    if(token)
      {
        let header = {
          Authorization:"Bearer "+token
        }
        console.log(header)
        axios.post("http://localhost:7000/blog/userblog",{},
          {
            headers: header
          }
        ).then((res=>
        {
        console.log(res.data)
        const sorted = res.data.sort((a,b)=> new Date(b.updatedAt)- new Date(a.updatedAt))
        setBlog(sorted);
       
        //  setUser(res.data.data)

        }
        )).catch((err)=>
        {
         
          console.log(err)
        })
      }
  },[toggle])

  const deleteBlog = (blog) => {
    let token = localStorage.getItem("Blogtoken");
    console.log(blog)
    axios
      .delete("https://blogserver-4pih.onrender.com/blog/delete", {
        headers: {
          Authorization: "Bearer " + token,
          id: blog._id,
          imageid:blog.image.image_publicId,
        },
      })
      .then((response) => {
       
        toast.success("Blog delete")
        setToggle(!toggle)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-9xl mx-auto p-6 flex flex-col lg:flex-row lg:space-x-8">
        {/* User Profile Section */}
        {user && (
          <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6 flex flex-col items-center h-fit flex-shrink-0">
            <img
              src={user?.image?.imageUrl || 'https://via.placeholder.com/150'}
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4"
            />
            <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.location}</p>
          </div>
        )}

        {/* Blog Posts Section */}
        <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Blog Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
            {blog.map((b) => (
              <div key={b._id} className="bg-gray-100 shadow-md rounded-lg overflow-hidden">
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${b.image.imageUrl || 'https://via.placeholder.com/300'})` }}
                ></div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{b.title}</h3>
                  <p className="text-gray-600 mb-4">{b.content.substring(0, 100)}...</p>
                  <div className="flex justify-between items-center">
                    <Link to="/update" state={b}
                     
                      className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => deleteBlog(b)}
                      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
