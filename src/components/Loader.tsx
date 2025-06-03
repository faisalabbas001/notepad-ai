"use client"; // Mark as client component

import { motion } from "framer-motion"; // Ensure framer-motion is installed

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
        {/* Central Node (AI Core) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-lg"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Glowing Halo Effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              background: "linear-gradient(45deg, #3b82f6, #a855f7, #ec4899, #3b82f6)",
              backgroundSize: "200%",
              filter: "blur(12px)",
              opacity: 0.5,
            }}
            animate={{
              backgroundPosition: ["0%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Neural Network Nodes */}
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-blue-400 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              transformOrigin: "center",
              animation: `orbit-${index} ${2 + index * 0.3}s linear infinite`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 1 + index * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Connecting Lines (Neural Links) */}
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={`line-${index}`}
            className="absolute w-px h-16 sm:h-20 md:h-24 bg-gradient-to-b from-blue-500/50 to-purple-500/50"
            style={{
              left: "50%",
              top: "50%",
              transformOrigin: "center",
              animation: `orbit-${index} ${2 + index * 0.3}s linear infinite`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle Particle Effects */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 md:w-2 md:h-2 bg-white rounded-full"
            style={{
              left: "50%",
              top: "50%",
              transformOrigin: "center",
              animation: `particle-${index} ${3 + index * 0.2}s linear infinite`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Styled-jsx for animations */}
      <style jsx>{`
        ${Array.from({ length: 6 })
          .map(
            (_, index) => `
              @keyframes orbit-${index} {
                from {
                  transform: translate(-50%, -50%) rotate(${
                    index * 60
                  }deg) translateX(40px) rotate(0deg);
                }
                to {
                  transform: translate(-50%, -50%) rotate(${
                    index * 60 + 360
                  }deg) translateX(40px) rotate(360deg);
                }
              }
            `
          )
          .join("")}
        ${Array.from({ length: 8 })
          .map(
            (_, index) => `
              @keyframes particle-${index} {
                from {
                  transform: translate(-50%, -50%) rotate(${
                    index * 45
                  }deg) translateX(60px) scale(0);
                }
                to {
                  transform: translate(-50%, -50%) rotate(${
                    index * 45 + 360
                  }deg) translateX(60px) scale(1);
                }
              }
            `
          )
          .join("")}
      `}</style>
    </div>
  );
};

export default Loader;

// Example usage in your component
