import React from "react";
import { motion } from "framer-motion";
import { FaHandsHelping, FaTruck, FaUsers, FaSeedling, FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { Link } from "react-router";


const serviceItems = [
  {
    key: "post-food",
    title: "Post Surplus Food",
    desc: "Share extra cooked meals or groceries with photos, quantity, location, and expiry in under a minute.",
    icon: FaHandsHelping,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    bg: "from-green-50 to-emerald-50",
    darkBg: "from-green-950/30 to-emerald-950/30",
  },
  {
    key: "find-food",
    title: "Find Nearby Food",
    desc: "Browse available food near you and request meals easily with clear pickup and expiry details.",
    icon: FaUsers,
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    bg: "from-emerald-50 to-green-50",
    darkBg: "from-emerald-950/30 to-green-950/30",
  },
  {
    key: "pickup",
    title: "Volunteer Pickup & Delivery",
    desc: "Volunteers help collect and deliver food safely when donors or receivers need support.",
    icon: FaTruck,
    gradient: "from-teal-500 via-green-500 to-emerald-500",
    bg: "from-teal-50 to-green-50",
    darkBg: "from-teal-950/30 to-green-950/30",
  },
  {
    key: "impact",
    title: "Track Community Impact",
    desc: "See real statistics on meals shared, people helped, and food saved from going to waste.",
    icon: FaSeedling,
    gradient: "from-lime-500 via-green-500 to-emerald-500",
    bg: "from-lime-50 to-green-50",
    darkBg: "from-lime-950/30 to-green-950/30",
  },
];


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};


const ServicesSection = () => {
  return (
    <section className="relative w-11/12 mx-auto py-16 md:py-24 overflow-hidden">

      {/* Decorative Glow */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

     
      <motion.div
        className="max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >

        <h2 className="text-4xl md:text-5xl font-primary font-bold mb-6">
          Our{" "}
          <span className="text-[#009368]">Services</span>
        </h2>

        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Simple, practical tools designed to share surplus food, connect communities,
          and reduce food waste — one meal at a time.
        </p>
      </motion.div>

    
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {serviceItems.map((service) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={service.key}
              variants={item}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div
                className={`
                  relative h-full rounded-2xl overflow-hidden
                  bg-gradient-to-br ${service.bg} dark:${service.darkBg}
                  border border-white/20 dark:border-white/10
                  shadow-xl transition-all duration-500
                `}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient}
                  opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <div className="relative p-8 flex flex-col h-full">
                  <div className="mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient}
                      flex items-center justify-center text-white text-2xl shadow-lg`}
                    >
                      <Icon />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-base-content">
                    {service.title}
                  </h3>

                  <p className="text-sm text-base-content/70 flex-1 mb-6">
                    {service.desc}
                  </p>

                  <Link
                    to="/about-us"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Learn more <FaArrowRight className="text-xs" />
                  </Link>
                </div>

                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}
                  scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                ></div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>


      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-lg text-base-content/70 mb-6">
          Ready to share food or find help in your community?
        </p>

        <Link
          to="/available-foods"
          className="btn btn-primary btn-lg rounded-full"
        >
          Explore Available Foods
        </Link>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
