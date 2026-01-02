import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaHandshake, FaChartLine } from "react-icons/fa";

const highlights = [
  {
    title: "Fast & Local Matching",
    desc: "Surplus food is quickly matched with nearby people or organizations to reduce waste and delays.",
    icon: FaBolt,
  },
  {
    title: "Trusted Community Partners",
    desc: "We collaborate with verified donors, volunteers, and organizations to ensure safe food sharing.",
    icon: FaHandshake,
  },
  {
    title: "Real Impact Tracking",
    desc: "Track meals shared, people helped, and food saved through transparent platform statistics.",
    icon: FaChartLine,
  },
];

const HighlightsSection = () => {
  return (
    <motion.section
      className="w-11/12 mx-auto py-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-3xl font-primary md:text-4xl font-bold mb-4">
          Why <span className="title">Plate Share</span>?
        </h2>
        <p className="text-base-content/70">
          Built with purpose, transparency, and community impact at its core.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="
                card bg-base-100 card-shadow hover:shadow-xl
                p-6 md:p-8 rounded-lg border border-primary text-center
                transition-all duration-300
              "
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="icon text-2xl" />
              </div>

              <h3 className="text-xl font-semibold mb-2 text-base-content">
                {item.title}
              </h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default HighlightsSection;
