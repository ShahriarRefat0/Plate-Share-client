import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from "../Components/Footer";
import { Outlet } from 'react-router';
import Aos from 'aos';
import "aos/dist/aos.css";

const MainLayouts = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000, 
      once: true, 
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayouts;