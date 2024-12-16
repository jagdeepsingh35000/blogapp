import react, { useContext, useEffect } from "react";
import SignupForm from "./Pages/SignUpForm";

import "./index.css";
import Navbar from "./Pages/Navbar";
import LoginPage from "./Pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import 'react-toastify/dist/ReactToastify.css';
import CreateBlog from "./Pages/CreateBlog";
import UserContext from "../Context/UserContext";
import axios from "axios";
import ForgotPassword from "./Pages/ForgotPassword";
import ViewOneBlog from "./Pages/ViewOneBlog";
import UserProfile from "./Pages/UserProfile";
import UpdateBlog from "./Pages/UpdateBlog";

function App() {

  let token = localStorage.getItem("Blogtoken");
  const {user,setUser} = useContext(UserContext)

  useEffect(()=>
    {
      if(token)
        {
          let header = {
            Authorization:"Bearer "+token
          }
          axios.get("https://blogserver-4pih.onrender.com/user/verify",
            {
              headers: header
            }
          ).then((res=>
          {
          
           setUser(res.data.data)
  
          }
          )).catch((err)=>
          {
            console.log(err)
          })
        }
    },[])
  

  return (
    <>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<SignupForm />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/create-blog" element={<CreateBlog />}></Route>
        <Route path="/view" element={<ViewOneBlog />}></Route>
        <Route path="/my-blog" element={<UserProfile/>}></Route>
        <Route path="/update" element={<UpdateBlog/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
      </Routes>
      {/* <SignupForm/> */}
      {/* <LoginPage/> */}
    </>
  );
}

export default App;
