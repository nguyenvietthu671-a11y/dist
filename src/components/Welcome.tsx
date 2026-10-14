import { useState } from 'react';
import { motion } from 'framer-motion';

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-3xl"
      >
        {/* Logo / Title */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 mb-6">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-300 font-medium">OPIc Practice Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            OPIc Trainer
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light">
            Master Advanced Low Speaking Proficiency
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-10 space-y-4"
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            Practice for the Oral Proficiency Interview by Computer with Ava, your virtual interviewer.
            Get real-time feedback on your speaking skills and personalized improvement suggestions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="text-3xl mb-2">🎤</div>
              <h3 className="text-white font-semibold mb-1">Voice Recording</h3>
              <p className="text-gray-400 text-sm">Record and transcribe your spoken responses in real-time</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="text-white font-semibold mb-1">AI Scoring</h3>
              <p className="text-gray-400 text-sm">Get evaluated on function, accuracy, content & text type</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="text-white font-semibold mb-1">Improvement</h3>
              <p className="text-gray-400 text-sm">Receive personalized suggestions to reach your target level</p>
            </div>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={onStart}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative group px-10 py-4 rounded-xl font-semibold text-lg text-white overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 transition-all duration-300 group-hover:scale-105" />
            <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${hovered ? 'opacity-50' : ''}`} />
            <span className="relative z-10 flex items-center gap-2">
              Start Practice
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </motion.div>

        {/* Test info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 text-sm text-gray-500"
        >
          <p>⏱️ Full test takes approximately 20-40 minutes • 🎯 Target: Advanced Low (AL)</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
