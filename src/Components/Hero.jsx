import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

const Hero = () => {
  const slides = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hhcml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=700",
      title: "Your Leftovers Can Change Lives",
      desc: "Post surplus food, connect with nearby people, and make sure no meal goes to waste.",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1542323228-002ac256e7b8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=700",
      title: "Share Food, Spread Kindness",
      desc: "Donate your extra meals and help someone in need — together we reduce food waste and feed the community.",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hhcml0eSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=700",
      title: "Turn Extra Food into Extra Hope",
      desc: "Join a community where every shared plate saves food, saves money, and supports others.",
    },
  ];

  return (
    <div data-aos="zoom-out" className=" overflow-hidden">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Navigation, Pagination]}
        className=""
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-[450px] md:h-[600px] lg:h-[700px] object-cover text-5xl font-bold font-poppins text-gray-800"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Text with Framer Motion Animation */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
              >
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-3xl md:text-5xl font-bold mb-4 text-[#009368] font-primary"
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="text-lg md:text-xl max-w-2xl font-secondary"
                >
                  {slide.desc}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="
    mt-6
    flex items-center justify-center gap-3
    px-5 py-2
    md:px-7 md:py-3
    text-sm md:text-lg
    bg-[#009368] text-white
    rounded-full
    font-semibold shadow-lg
    hover:bg-white hover:text-[#009368] hover:border-[#009368]
    border border-transparent
    duration-300 ease-in-out
    w-40 md:w-48 lg:w-56 font-primary
  "
                >
                  View All Foods
                  <HiArrowTopRightOnSquare className="text-lg md:text-xl" />
                </motion.button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
