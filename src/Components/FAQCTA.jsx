import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const FAQCTA = () => {
  return (
    <motion.section className="w-11/12 mx-auto py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.35 }}
    >
      <div className="p-8 bg-base-100 rounded-lg shadow flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-300">
        <div>
          <h3 className="text-xl font-semibold">Have Questions?</h3>
          <p className="text-sm text-gray-600">Check our FAQ or contact support for help.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/faq" className="px-4 py-2 bg-green-500 text-white rounded-lg">View FAQ</Link>
          <Link to="/contact" className="px-4 py-2 border border-green-500 text-green-500 rounded-lg">Contact Us</Link>
        </div>
      </div>
    </motion.section>
  );
};

export default FAQCTA;
