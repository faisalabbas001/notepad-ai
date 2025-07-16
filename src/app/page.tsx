"use client";
import { Suspense } from 'react';
import Editor from "@/components/Editor";
import Link from "next/link";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Viewport Meta Tag (Add to <head> in your layout.js or _document.js) */}
      {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}

      <motion.div
        // initial={{ opacity: 0, y: 20 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.5 }}
        className="relative min-h-[calc(100vh-72px)] mb-12"
      >
        <div className="absolute inset-0 h-full bg-grid-pattern opacity-[0.05] pointer-events-none " />
        <Suspense fallback={<div><Loader /></div>}>
          <Editor />
        </Suspense>
      </motion.div>

      {/* What is Online Notepad Section */}
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-14 relative">
  <div className="flex flex-row flex-wrap items-center gap-6 sm:gap-8 lg:gap-12">
    {/* Text Content */}
    <div className="flex-1 min-w-[300px]">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 sm:mb-8">
        What is an online notepad?
      </h2>
      <div className="space-y-4 sm:space-y-6">
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
          An online notepad is a versatile, browser-based text editor that allows you to create, save,
          and share notes instantly without needing software installation or account creation. Unlike
          traditional note-taking tools, online notepads are accessible from any device with an
          internet connection, making them the perfect solution for people who require a flexible
          and portable workspace.
        </p>
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
          Whether you're jotting down quick ideas, managing projects, or drafting documents, our
          online notepad is designed to make your life easier.
        </p>
      </div>
    </div>

    {/* Image/Logo Section */}
    <div className="flex-1 flex justify-center items-center min-w-[250px]">
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-72 lg:h-72">
        {/* Animated glow effect */}
        <div className="absolute inset-0 animate-glow">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl animate-spin-slow" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-xl animate-pulse" />
        </div>

        {/* Animated circle border */}
        <div className="absolute inset-0 rounded-full border-2 border-gray-700/50 backdrop-blur-sm">
          <div className="absolute inset-0 rounded-full border-t-2 border-blue-500/50 animate-spin-slower" />
        </div>

        {/* Center AI symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 bg-[#1A1A1A]/80 rounded-2xl backdrop-blur-sm flex items-center justify-center overflow-hidden group">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
            {/* AI Symbol */}
            <div className="relative flex space-x-1">
              <div className="w-2 h-10 sm:w-3 sm:h-12 lg:w-4 lg:h-16 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full animate-pulse-slow" />
              <div className="w-2 h-10 sm:w-3 sm:h-12 lg:w-4 lg:h-16 bg-gradient-to-t from-purple-500 to-blue-400 rounded-full animate-pulse-slow delay-75" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Features Section */}
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-14 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 sm:mb-8">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "AI-Powered Online Notepad",
              description: "Notepad AI is a free online notepad designed for intelligent note-taking. With built-in Natural Language Processing, it helps you write, organize, and save your ideas in real-time.",
              delay: 0.1,
            },
            {
              title: "No Login, No Hassle",
              description: "Start writing instantly with our no-login online notepad. It respects your privacy and keeps your notes secure using local storage and NLP-enhanced autosave.",
              delay: 0.3,
            },
            {
              title: "Autosave & Local Privacy",
              description: "All content is autosaved automatically and stored locally in your browser. This secure online notepad ensures that your notes are never lost or sent anywhere.",
              delay: 0.5,
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: 100,
                rotateY: 10,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                rotateY: 0,
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: card.delay,
                type: "spring",
                stiffness: 50,
                damping: 20,
              }}
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className="group relative bg-[#1A1A1A] p-6 sm:p-8 rounded-2xl border border-gray-800 overflow-hidden transform-gpu"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              {/* Animated border glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 blur-sm" />
              </div>
              {/* Content */}
              <div className="relative">
                <motion.h3
                  className="text-lg sm:text-xl font-semibold text-blue-400 mb-4"
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: card.delay + 0.2 }}
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  className="text-sm sm:text-base text-gray-400"
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: card.delay + 0.4 }}
                >
                  {card.description}
                </motion.p>
              </div>
              {/* Animated corner accent */}
              <motion.div
                className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl rotate-12 scale-0 group-hover:scale-100 transition-transform duration-700"
                initial={{ rotate: 45 }}
                whileHover={{ rotate: 90 }}
              />
            </motion.div>
          ))}
        </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-6 sm:gap-8">
          {[
  {
    title: "Smart AI-Enhanced Notepad",
    description: "Experience seamless, intelligent note-taking with our AI-powered notepad. Backed by advanced NLP, it helps you write, organize, and refine your thoughts in real-time — all for free.",
    delay: 0.1,
  },
  {
    title: "Instant Access, Zero Sign-Up",
    description: "Start typing immediately — no accounts, no barriers. Our notepad is designed for speed, simplicity, and privacy, letting you focus on your thoughts without distractions.",
    delay: 0.3,
  },
  {
    title: "Private by Design, Auto-Saved Locally",
    description: "Your notes are automatically saved in your browser and never leave your device. With local storage and built-in autosave, your content stays private and protected.",
    delay: 0.5,
  },
]
.map((card, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: 100,
                rotateY: 10,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                rotateY: 0,
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: card.delay,
                type: "spring",
                stiffness: 50,
                damping: 20,
              }}
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className="group relative bg-[#1A1A1A] p-6 sm:p-8 rounded-2xl border border-gray-800 overflow-hidden transform-gpu"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              {/* Animated border glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 blur-sm" />
              </div>
              {/* Content */}
              <div className="relative">
                <motion.h3
                  className="text-lg sm:text-xl font-semibold text-blue-400 mb-4"
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: card.delay + 0.2 }}
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  className="text-sm sm:text-base text-gray-400"
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: card.delay + 0.4 }}
                >
                  {card.description}
                </motion.p>
              </div>
              {/* Animated corner accent */}
              <motion.div
                className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl rotate-12 scale-0 group-hover:scale-100 transition-transform duration-700"
                initial={{ rotate: 45 }}
                whileHover={{ rotate: 90 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Remove Duplicate Features Section */}
      {/* The second features section was identical, so I've removed it to avoid redundancy. If it was intentional, you can add it back with a unique identifier. */}

    </main>
  );
}