import { useState } from 'react';
import { motion } from 'framer-motion';
import { SelfAssessmentData } from '../types';
import { formDescriptions } from '../data/testQuestions';

interface SelfAssessmentProps {
  onComplete: (data: SelfAssessmentData) => void;
}

const assessmentLevels = [
  {
    level: 'novice',
    form: 1,
    title: 'Novice',
    description: 'I can communicate using simple words and phrases. I can ask and answer simple questions on familiar topics. My sentences are short and often incomplete.',
    examples: ['Order food at a restaurant', 'Introduce myself', 'Talk about my family'],
    color: 'from-blue-500 to-blue-600',
    icon: '🌱',
  },
  {
    level: 'intermediate',
    form: 2,
    title: 'Intermediate',
    description: 'I can handle simple everyday situations. I can create with the language by asking questions and forming simple sentences. I can talk about familiar topics in short paragraphs.',
    examples: ['Describe my daily routine', 'Talk about a recent experience', 'Express simple opinions'],
    color: 'from-green-500 to-green-600',
    icon: '🌿',
  },
  {
    level: 'advanced',
    form: 3,
    title: 'Advanced',
    description: 'I can narrate and describe in major time frames (past, present, future). I can handle complicated situations and produce paragraph-level connected discourse. I can support my opinions.',
    examples: ['Narrate a story in detail', 'Describe and compare experiences', 'Support opinions with reasons'],
    color: 'from-purple-500 to-purple-600',
    icon: '🌳',
  },
  {
    level: 'superior',
    form: 4,
    title: 'Superior',
    description: 'I can discuss abstract topics at length. I can support my opinions with detailed explanations and hypotheses. I can handle unfamiliar situations with ease.',
    examples: ['Debate social issues', 'Present complex arguments', 'Discuss hypothetical scenarios'],
    color: 'from-amber-500 to-amber-600',
    icon: '🏔️',
  },
  {
    level: 'distinguished',
    form: 5,
    title: 'Distinguished',
    description: 'I can communicate with precision and sophistication. I can use language creatively and precisely. I can persuade, counsel, and negotiate effectively.',
    examples: ['Negotiate complex agreements', 'Use humor and irony', 'Adapt style to audience'],
    color: 'from-red-500 to-red-600',
    icon: '⭐',
  },
];

export default function SelfAssessment({ onComplete }: SelfAssessmentProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);

  const selectedData = assessmentLevels.find(l => l.level === selectedLevel);

  const handleConfirm = () => {
    if (selectedData) {
      onComplete({
        selectedLevel: selectedData.title,
        formNumber: selectedData.form,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-5xl w-full"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Self-Assessment</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select the description that best matches your current speaking ability. 
            This will determine which test form you receive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {assessmentLevels.map((level, index) => (
            <motion.button
              key={level.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => { setSelectedLevel(level.level); setShowConfirm(false); }}
              className={`p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                selectedLevel === level.level
                  ? 'border-purple-500 bg-purple-500/10 scale-[1.02]'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800/80'
              }`}
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${level.color} opacity-60`} />
              
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{level.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{level.title}</h3>
                  <p className="text-xs text-gray-500">{formDescriptions[level.form].label}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">{level.description}</p>
              
              <div className="space-y-1.5">
                <p className="text-xs text-gray-500 font-medium">Examples of what you can do:</p>
                {level.examples.map((ex, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${level.color}`} />
                    {ex}
                  </div>
                ))}
              </div>

              {selectedLevel === level.level && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Confirmation */}
        {selectedLevel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {!showConfirm ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all"
              >
                Continue with "{selectedData?.title}" level →
              </button>
            ) : (
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 max-w-md mx-auto">
                <p className="text-white mb-2 font-medium">Confirm your selection?</p>
                <p className="text-gray-400 text-sm mb-4">
                  You selected <span className="text-purple-400 font-semibold">{selectedData?.title}</span> level.
                  You will receive {formDescriptions[selectedData!.form].label} test form.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-5 py-2 rounded-lg border border-slate-600 text-gray-300 hover:bg-slate-700 transition-all"
                  >
                    Change
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:from-purple-500 hover:to-cyan-500 transition-all"
                  >
                    Start Test →
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
