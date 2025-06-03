import React from 'react'
import { motion } from 'framer-motion'
const Cards = () => {
  return (
    
    <div className="max-w-[1370px] mx-auto px-6 py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "AI-Powered Online Notepad",
          description: "Notepad AI is a free online notepad designed for intelligent note-taking. With built-in Natural Language Processing, it helps you write, organize, and save your ideas in real-time.",
          delay: 0.1
        },
        {
          title: "No Login, No Hassle",
          description: "Start writing instantly with our no-login online notepad. It respects your privacy and keeps your notes secure using local storage and NLP-enhanced autosave.",
          delay: 0.3
        },
        {
          title: "Autosave & Local Privacy",
          description: "All content is autosaved automatically and stored locally in your browser. This secure online notepad ensures that your notes are never lost or sent anywhere.",
          delay: 0.5
        }
      ].map((card, index) => (
        <motion.div
          key={index}
          initial={{ 
            opacity: 0, 
            x: 100,
            rotateY: 10
          }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            rotateY: 0
          }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8, 
            delay: card.delay,
            type: "spring",
            stiffness: 50,
            damping: 20
          }}
          whileHover={{ 
            scale: 1.02,
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
          className="group relative bg-[#1A1A1A] p-8 rounded-2xl border border-gray-800 overflow-hidden transform-gpu"
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
              className="text-xl font-semibold text-blue-400 mb-4"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: card.delay + 0.2 }}
            >
              {card.title}
            </motion.h3>
            <motion.p 
              className="text-gray-400"
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
  )
}

export default Cards