import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const AboutPage = () => {
  return (
   <div className='flex flex-col min-h-screen'>
   <div><Navbar/></div>
   <div>
   <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Welcome to My Blog channel!</h2>
        <p className="text-lg">
          We’re thrilled to have you here. At My Blog channel, we believe in sharing stories, insights, and ideas that inspire, educate, and connect.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-lg">
          Our goal is to  "empower our readers with the latest trends in technology, lifestyle, and personal growth." We strive to create content that’s not only informative but also sparks meaningful conversations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
        <p className="text-lg">
          We’re a team of passionate writers, thinkers, and creators who come from diverse backgrounds.  we strive to inform, inspire, and connect with our readers. Together, we’re building a community that values curiosity, creativity, and the power of shared knowledge.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Why We Started</h2>
        <p className="text-lg">
        My blog began as a way to share my passion for learning and creativity. I wanted to connect with others, share valuable insights, and spark curiosity. It’s become a space for growth, where I express my thoughts, experiences, and the lessons I’ve learned along the way. 
          <br />
          </p>
      </section>

    

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Join Our Journey</h2>
        <p className="text-lg">
          Become part of our growing community. Stay updated with our latest posts and exclusive insights by subscribing to our newsletter.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Connect With Us</h2>
        <p className="text-lg">
          We’d love to hear from you! Whether you have feedback, suggestions, or just want to say hi, feel free to reach out:
        </p>
        <p className='mt-2'><strong>Email : </strong>jagdeepsingh35000@gmail.com</p>
       <div className='flex  items-center'> 
        <p className='mt-2'><strong>Contact with us </strong></p>
        <div className="p-4">
      <ul className="flex space-x-4">
        <li>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-pink-600">
            <FaInstagram />
          </a>
        </li>
        <li>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-400">
            <FaTwitter />
          </a>
        </li>
        <li>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-600">
            <FaFacebook />
          </a>
        </li>
      </ul>
    </div>
        </div> 
       
        
      </section>
    </div>
   </div>
   <div><Footer/></div>
   </div>
  );
};

export default AboutPage;
