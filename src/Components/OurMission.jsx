import React from 'react';
import {
  FaHandHoldingHeart,
  FaHandshake,
  FaLeaf,
  FaPeopleCarry,
  FaUsers,
  
} from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";


const OurMission = () => {
   const missions = [
     {
       id: 1,
       icon: <FaHandHoldingHeart className="text-4xl text-[#ffff]" />,
       title: "Reduce Food Waste",
       desc: "We turn surplus food into shared meals so no plate ends up in the trash when it could feed someone in need.",
     },
     {
       id: 2,
       icon: <FaUsers className="text-4xl text-[#ffff]" />,
       title: "Build a Caring Community",
       desc: "Connecting donors, volunteers, and receivers to create a culture of kindness, sharing, and humanity.",
     },
     {
       id: 3,
       icon: <FaLeaf className="text-4xl text-[#ffff]" />,
       title: "Support a Sustainable Future",
       desc: "Every shared meal saves resources, energy, and protects the planet — one food donation at a time.",
     },
     {
       id: 4,
       icon: <FaBowlFood className="text-3xl text-white" />, // Food donation icon
       title: "Feed People, Not Landfills",
       desc: "We rescue edible food from being wasted and redirect it to people who truly need it.",
     },
     {
       id: 5,
       icon: <FaPeopleCarry className="text-3xl text-white" />, // Community support
       title: "Empower Volunteers",
       desc: "We provide a simple system for volunteers to pick up, deliver, and distribute shared meals.",
     },
     {
       id: 6,
       icon: <FaHandshake className="text-3xl text-white" />, // Partnership / kindness
       title: "Partner for Impact",
       desc: "We collaborate with restaurants, homes, and organizations to build a zero-food-waste society.",
     },
   ];

  return (
    <div className="my-20 w-11/12 mx-auto">
      <div className="text-center">
        <h1
          data-aos="fade-down"
          className="text-3xl md:text-5xl font-bold text-center  mb-4 font-primary  "
        >
          OUR <span className="text-[#009368]">MISSION</span>
        </h1>
        <p data-aos="fade-down" className="font-secondary text-gray-600 mt-5">
          Creating a sustainable network where surplus food reaches people, not
          landfills.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-10  mt-15">
        {missions.map((mission) => (
          <div
            data-aos="fade-up"
            key={mission.id}
            className="relative border border-primary rounded-xl p-8 text-center max-w-md mx-auto 
transition-all duration-300 hover:-translate-y-3 hover:shadow-xl card-shadow "
          >
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#009368] w-16 h-16 rounded-md flex items-center justify-center shadow-md">
              {mission.icon}
            </div>

            <h2 className="mt-10 text-2xl font-primary text-[#009368] font-semibold">
              {mission.title}
            </h2>

            <p className="mt-3 text-gray-600 font-secondary leading-relaxed">
              {mission.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurMission;