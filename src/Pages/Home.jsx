import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogContext from "../../Context/BlogContext";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Footer from "./Footer";

export default function Home() {
  const {blog,setBlog} = useContext(BlogContext)
  const [recentPosts, setRecentpost] = useState([]);

  const featuredPost = {
    title: "Welcome to My Blog!",
    summary:
      "Explore the latest posts, thoughts, and tutorials on web development, programming, and more!",
    image: "https://via.placeholder.com/800x400",
  };

  useEffect(() => {
    axios
      .get("https://blogserver-4pih.onrender.com/blog/all")
      .then((res) => {
        console.log(res.data);
        const sorted = res.data.sort((a,b)=> new Date(b.updatedAt)- new Date(a.updatedAt))
        setRecentpost(sorted);
        setBlog(sorted);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 
  return (
    <div>
      <div>
       
        <Navbar />
      </div>
      <div className="font-sans leading-relaxed">
        {/* Featured Post */}
       
        <section className="p-8 text-center  ">
          <Carousel
           showThumbs={false} 
          showStatus={false}
          showArrows={false}
          transitionTime={500}
          interval={3000} 
          autoPlay
          infiniteLoop
           className="w-2/4 mx-auto ">
            <div>
              <img src="https://img.freepik.com/premium-photo/chameleon-wearing-sunglasses-solid-color-background-vector-art-minimal-abstract-generative_832935-3.jpg?semt=ais_hybrid" alt="Slide 1" />
             
            </div>
            <div>
              <img src="https://img.freepik.com/premium-photo/beautiful-photo-is-must-everyday-work-ai-generated-best-wonderful-photo-images-very-nice_1089151-1199.jpg" alt="Slide 2" />
             
            </div>
            <div>
              <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="Slide 3" />
             
            </div>
          </Carousel>
          <h2 className="text-2xl font-semibold mt-4">{featuredPost.title}</h2>
          <p className="mt-2 text-gray-700">{featuredPost.summary}</p>
        </section>

        <section className="p-8">
          <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
          <div className="space-y-6">
            {recentPosts.map((post) =>{

              const date =  new Date(post.updatedAt) //passing date in to date object
              const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ]; 
              
              return  (

            <Link to="/view" state={post}>
                <div
                  key={post.id}
                  className="flex items-start border-b pb-4 space-x-4"
                >
                  {/* Image Icon */}
                  <img
                    src={post.image.imageUrl || "https://via.placeholder.com/50"} // Default placeholder if no image provided
                    alt={post.title}
                    className="w-[100px] h-[100px] rounded object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-medium">{post.title}</h4>
                    <p className="text-gray-600">{post.content}</p>
                    <small className="text-gray-500">{`${monthNames[date.getUTCMonth()]} ${date.getDate()} , ${date.getUTCFullYear()}`}</small>
                  </div>
                </div></Link>
              )
            })}
          </div>
        </section>

      <Footer/>
      </div>
    </div>
  );
}
