"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg"
        >
          Creative Digital Studio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg md:text-2xl text-gray-300 max-w-2xl"
        >
          We craft stunning digital experiences that inspire and engage.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition"
        >
          Get Started
        </motion.button>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-900">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-8 text-indigo-400"
        >
          About Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center text-gray-400 text-lg"
        >
          We are a passionate team of designers, developers, and strategists
          committed to helping brands grow in the digital space. With creativity
          and technology, we bring ideas to life.
        </motion.p>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-950">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12 text-cyan-400"
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            "Web Development",
            "UI/UX Design",
            "Brand Strategy"
          ].map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-8 bg-gray-800 rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4 text-indigo-400">{service}</h3>
              <p className="text-gray-400">
                High-quality {service.toLowerCase()} to elevate your business.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-900">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12 text-cyan-400"
        >
          Our Work
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="overflow-hidden rounded-xl shadow-lg group"
            >
              <img
                src="https://bigpicturefilmclub.com/wp-content/uploads/2025/02/Studio-Ghibli.jpg"
                alt={`Project ${item}`}
                width={500}
                height={300}
                className="object-cover w-full h-64 group-hover:scale-110 transition duration-500"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-950">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12 text-indigo-400"
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {["Amazing experience!", "Highly recommend!", "Great team and results!"]
            .map((quote, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-8 bg-gray-800 rounded-2xl shadow-lg hover:shadow-indigo-500/30 transition duration-300"
              >
                <p className="text-gray-300 italic mb-4">“{quote}”</p>
                <h4 className="text-indigo-400 font-semibold">Client {idx + 1}</h4>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-900 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6 text-indigo-400"
        >
          Let's Work Together
        </motion.h2>
        <p className="max-w-xl mx-auto mb-8 text-gray-400">
          Have a project in mind? We’d love to bring your vision to life.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-indigo-500/30 transition"
        >
          Contact Us
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-950 text-center border-t border-gray-800">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Creative Digital Studio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
