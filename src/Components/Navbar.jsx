import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../../public/logo.png";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../authProvider/AuthProvider";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Swal from "sweetalert2";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate()

  const signOutUser = (e) => {
    e.preventDefault();
    logOutUser()
      .then((res) => {
        //console.log("user logout", res)
        Swal.fire({
          title: "LogOut Successful",
          icon: "success",
          draggable: true,
        });
        navigate('/');
      })
      .catch((e) => {
        //console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/available-foods"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Available Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>
      </li>
    
    </>
  );

  const showBtns = user ? (
    <div className="dropdown dropdown-end text-green-700 z-50">
      <div
        tabIndex={0}
        role="button"
        className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,255,120,0.6)]"
      >
        <img
          className="w-full h-full object-cover"
          src={user?.photoURL}
          alt="User"
        />
      </div>

      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box absolute right-0 z-[60]mt-3 w-52 p-2 shadow"
      >
        <div className="pb-3 border-b border-b-gray-200">
          <li className="text-sm font-semibold">{user.displayName}</li>
          <li className="text-xs">{user.email}</li>
        </div>

        <li>
          <Link to="/dashboard">
            <MdDashboard />
            Dashboard Home
          </Link>
        </li>

        <li>
          <Link to="/dashboard/profile">
            <FaUser />
            Profile
          </Link>
        </li>

        <li className="divider" />

        <li>
          <button
            onClick={signOutUser}
            className="btn btn-xs text-left bg-green-600 text-white hover:bg-white hover:text-green-600"
          >
            <IoLogOut /> Logout
          </button>
        </li>
      </ul>
    </div>
  ) : (
    <Link
      to="/login"
      className="bg-white text-primary  btn-xs sm:btn-sm md:btn-md font-semibold px-6 py-2 rounded-xl hover:bg-primary hover:text-white border border-white transition-all duration-300"
    >
      Login
    </Link>
  );

  return (
    <div className="sticky top-0 z-50 bg-primary shadow-md h-20 font-secondary">
      <div className="navbar text-white w-11/12 mx-auto">
        {/* LEFT SIDE */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className=" pr-4 btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#ffffff] font-semibold rounded-box z-20 mt-3 w-52 p-2 shadow text-green-700"
            >
              {links}
            </ul>
          </div>

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img
              src={logo}
              alt="Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <h4 className="text-sm sm:text-base md:text-lg font-semibold font-primary">
                Plate Share
              </h4>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-200">
                We Care Humanity
              </p>
            </div>
          </Link>
        </div>

        {/* CENTER NAV LINKS */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium gap-4">
            {links}
          </ul>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="navbar-end mx-w-30 gap-5">
          <div className="flex gap-3 f items-center">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn btn-circle btn-ghost text-white hover:bg-white/20 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <MdDarkMode className="text-2xl" />
              ) : (
                <MdLightMode className="text-2xl" />
              )}
            </button>
            {showBtns}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
