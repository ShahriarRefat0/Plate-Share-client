import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

/* =======================
   TESTIMONIAL DATA
======================= */
const testimonials = [
  {
    name: "Amina Rahman",
    role: "Community Member",
    message:
      "Plate Share helped our neighborhood during a food shortage. The process was simple, respectful, and fast.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahim Uddin",
    role: "Food Donor",
    message:
      "Donating surplus food has never been this easy. I can clearly see where my food goes and who it helps.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sara Ahmed",
    role: "Volunteer",
    message:
      "Volunteering through Plate Share is rewarding. The platform makes coordination smooth and meaningful.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const TestimonialsSection = () => {
  return (
    <motion.section
      className="w-11/12 mx-auto py-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <h2 className="text-3xl font-primary md:text-4xl font-bold mb-4">
          What People Say About{" "}
          <span className="title">Plate Share</span>
        </h2>
        <p className="text-base-content/70">
          Real stories from donors, volunteers, and community members.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="
              card bg-base-100 card-shadow hover:shadow-xl
              p-6 md:p-8 rounded-lg
              transition-all duration-300 border-primary
border              relative
            "
          >
            {/* Quote Icon */}
            <FaQuoteLeft className="text-primary/20 text-4xl absolute top-6 right-6" />

            {/* Message */}
            <p className="text-sm md:text-base text-base-content/80 leading-relaxed mb-6">
              “{item.message}”
            </p>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border border-primary/20"
                loading="lazy"
              />
              <div>
                <h4 className="font-semibold text-base-content">
                  {item.name}
                </h4>
                <p className="text-xs text-base-content/60">
                  {item.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
