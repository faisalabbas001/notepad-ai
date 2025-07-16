"use client"; // Mark as client component for framer-motion

import { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion"; // Use named export



export default function Features() {
  return (
    <div className="min-h-screen main-container  text-white px-4 mt-20 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Features of Notepad AI – Auto Save, No Login, Secure Notes
        </h1>
      </section>

      {/* CTA Section */}
      <section className="text-center mb-16">
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Try Notepad AI Now
        </Link>
      </section>

      {/* Main Features Grid */}
	  <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-14 py-12 sm:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-6 sm:gap-8 mb-16">
        {[
          {
            title: "Smart, AI-Assisted Writing",
            description:
              "Our online notepad uses AI to help you write better, faster. The built-in NLP engine understands your context and suggests improvements in real time—enhancing grammar, structure, and clarity as you type.",
            icon: "✍️",
            delay: 0.1,
          },
          {
            title: "Auto-Save Every Word, Instantly",
            description:
              "Never lose a thought. Real-time auto-save uses NLP-backed detection to identify meaningful text changes and save them instantly—with zero effort on your part. There's no 'Save' button. It just works.",
            icon: "⏳",
            delay: 0.3,
          },
          {
            title: "No Login Required – Private by Design",
            description:
              "Write freely without creating an account. Notepad AI respects your privacy. No email, no sign-up, no tracking. Your content is stored securely in your browser or session—and you're always in control.",
            icon: "🔓",
            delay: 0.5,
          },
          {
            title: "Seamless Cloud Sync (Optional)",
            description:
              "Want to access your notes across devices? Enable secure cloud sync. Your notes are encrypted and synced using contextual tagging, making retrieval fast and intelligent.",
            icon: "☁️",
            delay: 0.7,
          },
          {
            title: "Works on Any Device",
            description:
              "From mobile to desktop, our NLP-powered interface adapts to your screen and input method. Whether typing a note on your phone or pasting code from your laptop, it feels smooth and intuitive.",
            icon: "📱",
            delay: 0.9,
          },
          {
            title: "Context-Aware Note Structuring",
            description:
              "Using NLP, Notepad AI automatically detects lists, headings, and bullet points as you write. It intelligently structures your text, making your notes cleaner and more readable without manual formatting.",
            icon: "📝",
            delay: 1.1,
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
            className="group relative bg-[#1A1A1A] p-4 sm:p-6 rounded-2xl border border-gray-800 overflow-hidden transform-gpu"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            {/* Animated border glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 blur-sm" />
            </div>
            {/* Content */}
            <div className="relative">
              <div className="text-2xl sm:text-3xl mb-4">{card.icon}</div>
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
              className="absolute -right-8 -top-8 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl rotate-12 scale-0 group-hover:scale-100 transition-transform duration-700"
              initial={{ rotate: 45 }}
              whileHover={{ rotate: 90 }}
            />
          </motion.div>
        ))}
      </div>
	   {/* Security Section */}
	   <section className="mb-16 bg-gradient-to-r  p-6 sm:p-8 rounded-2xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Secure & Encrypted</h2>
        <p className="text-white text-center max-w-2xl mx-auto text-sm sm:text-base">
          Your data stays yours. Notes stored via cloud sync are encrypted. Local
          session notes never leave your browser unless you choose to export or
          sync. Our AI runs client-side for maximum privacy.
        </p>
      </section>

      {/* Summary Section */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl text-white font-bold mb-8 text-center">
          Summary of Features
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
            <p className="text-white text-sm sm:text-base">
              AI-Powered Writing Assistant – Improves text clarity, grammar, and
              intent in real time
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
            <p className="text-white text-sm sm:text-base">
              Instant Auto-Save – Notes are saved automatically as you type
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
            <p className="text-white text-sm sm:text-base">
              No Account Needed – Start writing immediately with zero friction
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
            <p className="text-white text-sm sm:text-base">
              Secure Cloud Sync – Optional encrypted storage for access across
              devices
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
            <p className="text-white text-sm sm:text-base">
              Device Adaptive UI – Optimized for mobile, tablet, and desktop
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
            <p className="text-white text-sm sm:text-base">
              NLP Structuring – Automatically formats and organizes notes
              contextually
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 text-blue-600">•</div>
            <p className="text-white text-sm sm:text-base">
              Privacy by Design – No ads, no tracking, no third-party scripts
            </p>
          </div>
        </div>
      </section>
 </div>
     

   
    </div>
  );
}