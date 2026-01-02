import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUtensils,
  FaHandsHelping,
  FaBuilding,
} from "react-icons/fa";


const useCountUp = (end, duration = 3000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const percentage = Math.min(progress / duration, 1);
      const eased = percentage * (2 - percentage); // easeOut

      setCount(Math.floor(eased * end));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};


const stats = [
  {
    label: "Active Members",
    value: 10000,
    suffix: "+",
    icon: FaUsers,
  },
  {
    label: "Meals Shared",
    value: 25000,
    suffix: "+",
    icon: FaUtensils,
  },
  {
    label: "Volunteers",
    value: 500,
    suffix: "+",
    icon: FaHandsHelping,
  },
  {
    label: "Partner Organizations",
    value: 120,
    suffix: "+",
    icon: FaBuilding,
  },
];

const StatisticsSection = () => {
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
          Our <span className="title">Impact</span> So Far
        </h2>
        <p className="text-base-content/70">
          Real numbers that reflect how Plate Share is making a difference
          in communities every day.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const count = useCountUp(stat.value, 4000)

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="
                card bg-base-100 card-shadow hover:shadow-xl
                p-6 md:p-8 rounded-lg border-primary border text-center
                transition-all duration-300
              "
            >
              {/* Icon */}
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="icon text-2xl" />
              </div>

              {/* Number */}
              <div className="text-3xl md:text-4xl font-bold text-base-content">
                {count.toLocaleString()}
                {stat.suffix}
              </div>

              {/* Label */}
              <div className="mt-2 text-sm text-base-content/70">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default StatisticsSection;
