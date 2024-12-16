import React, { useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CreateBlog() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageURL, setImageURL] = useState('');

    let token = localStorage.getItem("Blogtoken");
    let navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Mock submission logic

    const formData = new FormData();
    formData.append('image', imageURL);
    formData.append('title', title);
    formData.append('content', content);
    // let naviagte =  useNavigate();
    
    
    axios.post("https://blogserver-4pih.onrender.com/blog/create-blog",formData,{
        headers: {
          Authorization:"Bearer "+token,
          
        }}).then((res)=>
        {
          console.log(res.data)
         
          toast.success("Blog created") 
          navigate("/view",{state:res.data})         
        })
        .catch((err)=>
        {
          alert(err.response.data.errmsg)          
          
        })


        // Reset form fields
        // setTitle('');
        // setContent('');
        // setImageURL('');


    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
          setImageURL(file);
        } else {
          toast.error("Please upload a valid image file.");
        }
      };
  return (
    <div>
      <div><Navbar/></div>

      <div className="font-sans leading-relaxed p-8">
            <nav className="bg-gray-800 text-white p-4 mb-8">
                <h1 className="text-lg font-bold">Create a Blog Post</h1>
            </nav>

            <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter blog title"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        rows="8"
                        placeholder="Write your blog content here"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="imageURL" className="block text-gray-700 font-medium mb-2">Image URL</label>
                    <input
                        type="file"
                        id="imageURL"
                       
                        onChange={handleFileChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter image URL (optional)"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                    Create Post
                </button>
            </form>
        </div>
    </div>
  )
}
