import { motion } from 'framer-motion';
import { ScoringResult, TestResponse } from '../types';

interface ResultsProps {
  result: ScoringResult;
  responses: TestResponse[];
  onRestart: () => void;
}

export default function Results({ result, responses, onRestart }: ResultsProps) {
  const totalWords = responses.reduce((acc, r) => acc + r.transcript.split(/\s+/).filter(w => w).length, 0);
  const totalDuration = responses.reduce((acc, r) => acc + r.duration, 0);
  const avgDuration = responses.length > 0 ? totalDuration / responses.length : 0;

  const scoreColor = result.passed 
    ? 'from-green-500 to-emerald-500' 
    : result.overallScore >= 50 
      ? 'from-amber-500 to-yellow-500' 
      : 'from-red-500 to-orange-500';

  const getLevelColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-cyan-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-cyan-500 to-blue-500';
    if (score >= 40) return 'from-amber-500 to-yellow-500';
    return 'from-red-500 to-orange-500';
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-y-auto">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-cyan-900/5" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Test Results</h1>
          <p className="text-gray-400">Your OPIc practice session evaluation</p>
        </motion.div>

        {/* Main Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Score circle */}
              <div className="relative">
                <svg className="w-40 h-40" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#1e293b" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="54"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(result.overallScore / 100) * 339.3} 339.3`}
                    transform="rotate(-90 60 60)"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={result.passed ? '#10b981' : result.overallScore >= 50 ? '#f59e0b' : '#ef4444'} />
                      <stop offset="100%" stopColor={result.passed ? '#059669' : result.overallScore >= 50 ? '#eab308' : '#f97316'} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-bold bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent`}>
                    {result.overallScore}
                  </span>
                  <span className="text-xs text-gray-400">/ 100</span>
                </div>
              </div>

              {/* Score details */}
              <div className="flex-1 text-center md:text-left">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3 ${
                  result.passed ? 'bg-green-500/10 border border-green-500/30' : 'bg-amber-500/10 border border-amber-500/30'
                }`}>
                  <span className="text-lg">{result.passed ? '✅' : '🎯'}</span>
                  <span className={`font-semibold ${result.passed ? 'text-green-400' : 'text-amber-400'}`}>
                    {result.passed ? 'Advanced Low Achieved!' : 'Target: Advanced Low'}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-1">{result.proficiencyLevel}</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Your estimated proficiency level based on ACTFL guidelines
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-sm">
                    <span className="text-gray-400">Responses: </span>
                    <span className="text-white font-medium">{responses.length}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-sm">
                    <span className="text-gray-400">Total Words: </span>
                    <span className="text-white font-medium">{totalWords}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-sm">
                    <span className="text-gray-400">Avg Duration: </span>
                    <span className="text-white font-medium">{Math.round(avgDuration)}s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Assessment Factors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          {[
            { label: 'Function', score: result.functionScore, icon: '🎯', desc: 'Ability to narrate, describe, and support opinions' },
            { label: 'Accuracy', score: result.accuracyScore, icon: '🎤', desc: 'Vocabulary, grammar, pronunciation, and fluency' },
            { label: 'Content & Context', score: result.contentScore, icon: '📝', desc: 'Appropriateness and relevance of responses' },
            { label: 'Text Type', score: result.textTypeScore, icon: '📊', desc: 'Organization and connectedness of discourse' },
          ].map((factor, i) => (
            <motion.div
              key={factor.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{factor.icon}</span>
                <div>
                  <h3 className="text-white font-semibold">{factor.label}</h3>
                  <p className="text-xs text-gray-500">{factor.desc}</p>
                </div>
                <span className={`ml-auto text-2xl font-bold ${getLevelColor(factor.score)}`}>
                  {factor.score}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${getScoreBarColor(factor.score)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${factor.score}%` }}
                  transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>💬</span> Detailed Feedback
            </h3>
            <div className="space-y-3">
              {result.feedback.map((fb, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-700/30"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    fb.includes('Excellent') || fb.includes('Strong') || fb.includes('Well') 
                      ? 'bg-green-400' 
                      : fb.includes('Good') 
                        ? 'bg-cyan-400' 
                        : 'bg-amber-400'
                  }`} />
                  <p className="text-gray-300 text-sm leading-relaxed">{fb}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Improvement Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🚀</span> Improvement Suggestions
            </h3>
            <div className="space-y-3">
              {result.suggestions.map((suggestion, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                >
                  <p className="text-gray-300 text-sm leading-relaxed">{suggestion}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Response Transcripts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mb-8"
        >
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📋</span> Your Responses
            </h3>
            <div className="space-y-4">
              {responses.map((response, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-700/30 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-purple-400 font-medium">Question {i + 1}</span>
                    <span className="text-xs text-gray-500">{response.duration}s</span>
                  </div>
                  <p className="text-gray-500 text-xs mb-1 italic">Q: {response.question}</p>
                  <p className="text-gray-300 text-sm">
                    {response.transcript || <span className="text-amber-400 italic">(No speech detected)</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pb-8"
        >
          <button
            onClick={onRestart}
            className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all"
          >
            🔄 Practice Again
          </button>
        </motion.div>
      </div>
    </div>
  );
}
