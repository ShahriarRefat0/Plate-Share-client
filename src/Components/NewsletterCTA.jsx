import React from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const NewsletterCTA = () => {
  return (
    <motion.section
      className="relative w-11/12 mx-auto my-16 overflow-hidden rounded-3xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-green-500 to-emerald-500" />

      {/* Content */}
      <div className="relative z-10 px-6 py-16 md:px-16 md:py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay Connected with <span className="underline decoration-white/40">Plate Share</span>
        </h2>

        <p className="max-w-2xl mx-auto text-white/90 mb-8">
          Get updates on food drives, impact stories, and opportunities to donate
          or volunteer — straight to your inbox.
        </p>

        <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 bg-white/90 rounded-full p-2 shadow-xl">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="flex-1 px-5 py-3 rounded-full bg-transparent text-base-content outline-none"
          />
          <button className="btn btn-primary rounded-full px-6 flex items-center gap-2">
            <FaPaperPlane />
            Subscribe
          </button>
        </form>

        <p className="mt-5 text-sm text-white/80">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </motion.section>
    
  );
};

export default NewsletterCTA;
