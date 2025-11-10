import React from "react";
import { FaUpload, FaSearch, FaTruckPickup } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUpload className="text-3xl text-[#009368]" />,
      title: "Post Food",
      desc: "Got extra food? Add details with a photo and location. It only takes a few seconds!",
    },
    {
      id: 2,
      icon: <FaSearch className="text-3xl text-[#009368]" />,
      title: "Find Food",
      desc: "Anyone nearby can browse and request available meals easily.",
    },
    {
      id: 3,
      icon: <FaTruckPickup className="text-3xl text-[#009368]" />,
      title: "Collect Food",
      desc: "The requester collects the food or a volunteer delivers it — simple and kind!",
    },
  ];

  const images = [
    "https://www.spoton.com/blog/content/images/2021/08/The-Rising-Value-of-Food-Delivery.jpg",
    "https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1720827965195-cd851900354e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUxfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=700",
  ];

  return (
    <section className="w-11/12 mx-auto my-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center  mb-4 font-primary">
        How It <span className="text-[#009368]">Works</span>
      </h2>
      <p className="text-center text-gray-600 text-base md:text-lg max-w-3xl mx-auto mb-10 font-secondary">
        Share your extra meals, help others, and reduce food waste — all in just
        3 easy steps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-[#dfeee4] p-10 rounded-2xl">
        {/* Left Side - Steps */}
        <div>
          {steps.map((step) => (
            <div
              key={step.id}
              className="border border-[#009368] rounded-xl p-5 md:p-6 mb-6 shadow-md 
                         hover:-translate-y-2 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-[#009368]/10 p-3 rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-[#009368] font-primary">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base font-secondary">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="rounded-2xl shadow-xl w-full md:w-[90%]"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`slide-${i}`}
                  className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] object-cover rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
