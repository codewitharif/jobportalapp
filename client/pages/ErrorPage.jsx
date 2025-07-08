import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PremiumErrorPage = () => {
  const navigate = useNavigate();

  // Premium SVG illustration of a traveler with map
  const TravelerIllustration = () => (
    <svg viewBox="0 0 600 400" className="w-full max-w-md mx-auto">
      {/* Background */}
      <rect width="600" height="400" fill="#f0f9ff" />

      {/* Mountains */}
      <path d="M0,400 L200,100 L400,300 L600,200 L600,400 Z" fill="#c7d2fe" />
      <path
        d="M0,400 L150,200 L300,350 L450,150 L600,250 L600,400 Z"
        fill="#a5b4fc"
      />

      {/* Traveler */}
      <motion.g
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Head */}
        <circle cx="300" cy="150" r="30" fill="#fcd34d" />
        {/* Body */}
        <path d="M300,180 L300,280 L280,300 L320,300 Z" fill="#4b5563" />
        {/* Arms */}
        <path
          d="M300,200 L250,220 L230,200"
          stroke="#4b5563"
          strokeWidth="8"
          fill="none"
        />
        <path
          d="M300,200 L350,220 L370,200"
          stroke="#4b5563"
          strokeWidth="8"
          fill="none"
        />
        {/* Legs */}
        <path
          d="M280,300 L270,350 L260,350"
          stroke="#4b5563"
          strokeWidth="8"
          fill="none"
        />
        <path
          d="M320,300 L330,350 L340,350"
          stroke="#4b5563"
          strokeWidth="8"
          fill="none"
        />
        {/* Backpack */}
        <rect x="270" y="200" width="30" height="40" rx="5" fill="#7c3aed" />
        {/* Map */}
        <motion.g
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <rect x="230" y="170" width="60" height="40" rx="3" fill="#fef3c7" />
          <path
            d="M230,190 L290,190 M260,170 L260,210"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <circle cx="250" cy="180" r="2" fill="#ef4444" />
        </motion.g>
        {/* Confused face */}
        <circle cx="290" cy="140" r="3" fill="#1f2937" />
        <path
          d="M310,140 Q320,150 310,150"
          stroke="#1f2937"
          strokeWidth="2"
          fill="none"
        />
      </motion.g>

      {/* Animated path marks */}
      {[...Array(5)].map((_, i) => (
        <motion.path
          key={i}
          d={`M${100 + i * 80},380 L${120 + i * 80},360`}
          stroke="#7c3aed"
          strokeWidth="2"
          strokeDasharray="0 10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: i * 0.2 }}
        />
      ))}

      {/* Floating question mark */}
      <motion.text
        x="500"
        y="100"
        fontSize="60"
        fontWeight="bold"
        fill="#7c3aed"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        ?
      </motion.text>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="p-8 md:p-12 text-center">
          <div className="mb-2">
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="text-8xl font-bold text-indigo-600 inline-block"
            >
              4
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                0
              </motion.span>
              4
            </motion.h1>
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-800 mb-3"
          >
            Lost Your Way?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-8 max-w-md mx-auto"
          >
            The page you're looking for isn't here. Maybe our traveler took a
            wrong turn.
          </motion.p>

          {/* Premium Illustration */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <TravelerIllustration />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-medium transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Return Home
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumErrorPage;
