"use client";
import Link from "next/link";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import { motion } from "framer-motion"; // Ensure framer-motion is installed


export default function About() {
  return (
    <div className="min-h-screen  text-white px-4 mt-20 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About Us – Why Notepad AI Exists
        </h1>
      </section>

      {/* Introduction */}
      <section className="mb-16 max-w-3xl mx-auto">
        <p className="text-base sm:text-lg text-gray-400 mb-6">
          It started with frustration.
        </p>
        <p className="text-base sm:text-lg text-gray-400 mb-6">
          I needed a quick, simple way to take notes online - something
          distraction-free, fast, and reliable. But every tool I tried either
          felt bloated, asked for an account, bombarded me with ads, or missed
          something essential: it didn&apos;t understand how I wanted to write.
        </p>
        <p className="text-base sm:text-lg text-gray-400 mb-6">
          That&apos;s when I realized the real problem wasn&apos;t just missing
          features - it was missing understanding. No tool adapted to how I
          write. No tool used language as a guide. So I built Notepad AI - a
          place where writing feels natural, intelligent, and private.
        </p>
      </section>

      {/* Main Sections (Card Layout) */}
	  <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-14 py-12 sm:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-6 sm:gap-8">
        {[
          {
            title: "Built for Writers, Not Accounts",
            description:
              "You don&apos;t have to log in. You don&apos;t have to sign up. You just start writing. Notepad AI is designed for people who value clarity over clutter, ideas over interfaces.",
            icon: "✍️",
            delay: 0.1,
          },
          {
            title: "NLP at the Core",
            description:
              "This isn&apos;t just a digital scratchpad. It&apos;s powered by Natural Language Processing, which understands your writing context, adapting quietly to support you.",
            icon: "🧠",
            delay: 0.3,
          },
          {
            title: "Writing Should Be Private",
            description:
              "Everything happens in your browser. Nothing is stored unless you choose to save it. No tracking, no surveillance, just you and your thoughts.",
            icon: "🔒",
            delay: 0.5,
          },
          {
            title: "Why I Keep Building It",
            description:
              "Because I still write notes every day. Each user who says, ‘This is what I needed,’ reminds me why I built it: to solve a real need simply and intelligently.",
            icon: "🌱",
            delay: 0.7,
          },
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

      {/* Closing Message */}
      <section className="mt-16 text-center max-w-2xl mx-auto">
        <p className="text-base sm:text-lg text-gray-400 mb-4">
          Thank you for using Notepad AI.
        </p>
        <p className="text-base sm:text-lg text-gray-400">
          This tool is personal. I hope it feels that way when you use it, too.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-12 text-center">
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Start Writing Now
        </Link>
      </section>
     
    </div>
	</div>
  );
}