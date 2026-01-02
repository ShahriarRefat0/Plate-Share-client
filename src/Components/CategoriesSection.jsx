import React from "react";
import { motion } from "framer-motion";
import {
  FaAppleAlt,
  FaCarrot,
  FaUtensils,
  FaBreadSlice,
  FaCheese,
} from "react-icons/fa";

const categories = [
  {
    name: "Fruits",
    icon: FaAppleAlt,
    desc: "Fresh fruits shared by donors",
  },
  {
    name: "Vegetables",
    icon: FaCarrot,
    desc: "Daily and seasonal vegetables",
  },
  {
    name: "Cooked Meals",
    icon: FaUtensils,
    desc: "Home-cooked & restaurant meals",
  },
  {
    name: "Breads",
    icon: FaBreadSlice,
    desc: "Bakery items & packaged bread",
  },
  {
    name: "Dairy",
    icon: FaCheese,
    desc: "Milk, yogurt, and dairy foods",
  },
];

const CategoriesSection = () => {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage:
          "url(https://media.istockphoto.com/id/1498170916/photo/a-couple-is-taking-a-bag-of-food-at-the-food-and-clothes-bank.jpg?s=612x612&w=0&k=20&c=0fnD_g46lvoZ5NdzX5zYOSM4PzM95ezfs5uMe9D1QKs=)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-base-100/30 dark:bg-base-100/40"></div>

      {/* Content */}
      <motion.div
        className="relative w-11/12 mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-3xl font-primary md:text-4xl font-bold mb-4">
            Browse Food by{" "}
            <span className="title">Category</span>
          </h2>
          <p className="text-base-content/70">
            Easily explore different types of food shared by the community and
            find what fits your needs.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -8 }}
                className="
                  card bg-base-100 card-shadow hover:shadow-xl
                  p-5 rounded-2xl text-center
                  border 
                  transition-all duration-300
                  cursor-pointer border-primary
                "
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="icon text-xl" />
                </div>

                <h3 className="font-semibold text-base-content">
                  {category.name}
                </h3>
                <p className="text-xs text-base-content/60 mt-1">
                  {category.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default CategoriesSection;
