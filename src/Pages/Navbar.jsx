import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../../Context/UserContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
 
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  console.log(user);
  console.log("Current Path:", location.pathname);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className=" bg-red-300 mx-auto px-4  flex items-center justify-between">
        {/* Brand Logo */}
        <div className="text-[30px] font-bold text-blue-600 p-2 ">
          <Link to="/">MyBlog</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex font-semibold text-[20px] space-x-9">
          <Link
            to="/"
            className={` ${
              isActive("/") ? "text-blue-700" : "text-gray-700"
            }  hover:text-blue-500 transition duration-200`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={` ${
              isActive("/about") ? "text-blue-700" : "text-gray-700"
            }  hover:text-blue-500 transition duration-200`}
          >
            About
          </Link>
          {user && (
            <Link
              to="/my-blog"
              className={` ${
                isActive("/my-blog") ? "text-blue-700" : "text-gray-700"
              }  hover:text-blue-500 transition duration-200`}
            >
              My Blog
            </Link>
          )}
          <Link
            to={`${!user ? "/login" : "/create-blog"}`}
            className={` ${
              isActive("/create-blog") ? "text-blue-700" : "text-gray-700"
            }  hover:text-blue-500 transition duration-200`}
          >
            Create
          </Link>
        </div>
        {!user ? (
          <div className="hidden md:flex font-semibold text-[20px] space-x-9">
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-800 transition duration-200"
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex font-semibold text-[20px] space-x-2">
            <div>
              <img
                className="w-[35px] h-[35px] rounded-full"
                src={user.image.imageUrl}
              ></img>
            </div>
            <Link
              onClick={() => {
                setUser(null);
                localStorage.removeItem("Blogtoken");
              }}
              to="/login"
              className="text-gray-700 hover:text-blue-500 transition duration-200"
            >
              Logout
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <Link
            to="/"
            className={` ${
              isActive("/") ? "text-blue-700  bg-gray-100" : "text-gray-700"
            } block py-2 px-4 hover:bg-gray-100 hover:text-blue-500 transition duration-200`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={` ${
              isActive("/about")
                ? "text-blue-700  bg-gray-100"
                : "text-gray-700"
            } block py-2 px-4 hover:bg-gray-100 hover:text-blue-500 transition duration-200`}
          >
            About
          </Link>
          {user && (
            <Link
              to="/my-blog"
              className={` ${
                isActive("/my-blog")
                  ? "text-blue-700  bg-gray-100"
                  : "text-gray-700"
              } block py-2 px-4 hover:bg-gray-100 hover:text-blue-500 transition duration-200`}
            >
              My Blog
            </Link>
          )}
          {user && (
            <Link
              to="/create-blog"
              className={` ${
                isActive("/create-blog")
                  ? "text-blue-700  bg-gray-100"
                  : "text-gray-700"
              } block py-2 px-4 hover:bg-gray-100 hover:text-blue-500 transition duration-200`}
            >
              Create
            </Link>
          )}

          {user ? (
            <Link
              onClick={() => {
                setUser(null);
                localStorage.removeItem("Blogtoken");
              }}
              to="/login"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
