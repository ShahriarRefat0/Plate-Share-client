import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router";

/* ======================
   BLOG DATA
====================== */
const blogs = [
  {
    id: 1,
    title: "How Food Sharing Is Changing Communities",
    excerpt:
      "Discover how small food donations are making a big impact on local communities and families.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e",
    date: "Aug 12, 2025",
  },
  {
    id: 2,
    title: "Reducing Food Waste Starts at Home",
    excerpt:
      "Simple habits that help reduce food waste and allow you to share surplus responsibly.",
    image:
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759",
    date: "Jul 28, 2025",
  },
  {
    id: 3,
    title: "Volunteers Behind Plate Share",
    excerpt:
      "Meet the volunteers who help collect, distribute, and deliver food every day.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    date: "Jul 10, 2025",
  },
];

const BlogSection = () => {
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
          From Our <span className="title">Blog</span>
        </h2>
        <p className="text-base-content/70">
          Stories, insights, and ideas about food sharing, sustainability,
          and community impact.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {blogs.map((blog, index) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="
              group relative overflow-hidden border border-primary card-shadow rounded-xl
              shadow-md hover:shadow-xl transition-all duration-300
            "
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="
                  w-full h-full object-cover
                  transition-transform duration-500
                  group-hover:scale-110
                "
                loading="lazy"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>

              {/* Date */}
              <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
                <FaRegCalendarAlt />
                {blog.date}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 bg-base-100">
              <h3 className="font-semibold text-lg mb-2 text-base-content">
                {blog.title}
              </h3>
              <p className="text-sm text-base-content/70 mb-4">
                {blog.excerpt}
              </p>

              <Link
                to="/blog"
                className="inline-flex  items-center gap-2 title font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Read More <FaArrowRight />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-14 text-center">
        <Link to="/blog" className="btn btn-outline btn-primary rounded-full">
          View All Blogs
        </Link>
      </div>
    </motion.section>
  );
};

export default BlogSection;
