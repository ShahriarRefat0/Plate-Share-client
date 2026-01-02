import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="w-11/12 min-h-screen mx-auto py-20">
      {/* Header */}
      <motion.div
        className="text-center max-w-2xl mx-auto mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-primary font-bold mb-4">
          Get in <span className="title">Touch</span>
        </h1>
        <p className="text-base-content/70">
          Have questions, suggestions, or want to partner with Plate Share?
          We’d love to hear from you.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        {/* LEFT: Contact Info */}
        <motion.div
          className="bg-base-100 card-shadow rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6">
            Contact Information
          </h2>

          <p className="text-base-content/70 mb-8">
            Reach out to us anytime. Our team is always ready to support food
            donors, volunteers, and community partners.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FaEnvelope className="icon" />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm text-base-content/70">
                  support@plateshare.org
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FaPhoneAlt className="icon" />
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-sm text-base-content/70">
                  +880 1234 567 890
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FaMapMarkerAlt className="icon" />
              </div>
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-sm text-base-content/70">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Contact Form */}
        <motion.div
          className="bg-base-100 card-shadow rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6">
            Send Us a Message
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="input  w-full input-custo"
            />

            <input
              type="email"
              placeholder="Your Email"
              required
              className="input  w-full input-custo"
            />

            <textarea
              rows="4"
              placeholder="Write your message..."
              required
              className="textarea w-full rounded-2xl! input-custo"
            ></textarea>

            <button
              type="submit"
              className="
                btn btn-primary rounded-full w-full
                flex items-center justify-center gap-2
              "
            >
              <FaPaperPlane />
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
