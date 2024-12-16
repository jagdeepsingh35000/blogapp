import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateBlog = () => {

  const location = useLocation();
  const blog = location.state;
  // const [product, setProduct] = useState(null);
  const [imageobeject, setImageObject] = useState(null);
  const [flag,setFlag] = useState(false)

  const [image, setImage] = useState(blog.image.imageUrl);
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  
  let navigate = useNavigate(); 

  let token = localStorage.getItem("Blogtoken");



  const handleFileChange = (e) => {
    
    setFlag(!flag)

    setImage((e.target.files[0])) 

    setImageObject(URL.createObjectURL(e.target.files[0]))
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    flag && formData.append('image', image);
    formData.append('title', title);
    formData.append('content', content);
   
    flag && formData.append('publicId',blog.image.image_publicId)
     formData.append('flag',flag);
    console.log({formData})

    axios.put("https://blogserver-4pih.onrender.com/blog/update",formData,{
      headers: {
        Authorization:"Bearer "+token,
          id: blog._id,
      }}).then((res)=>
    {
      console.log(res)
      alert("product updated")
      // navigate("/allproducts")
    })
    .catch((err)=>
    {
      console.log(err)
      alert(err.response.data)
    })

  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Update Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div className="flex flex-col items-center">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 p-2 border border-gray-300 rounded-md"
          />
          {blog.image && (
            <img src={imageobeject? imageobeject :image } alt="Product preview" className="mt-4 w-32 h-32 object-cover rounded-lg" />
          )}
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter product name"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter product description"
          />
        </div>

      

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
