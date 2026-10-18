import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SurveyAnswers } from '../types';

interface BackgroundSurveyProps {
  onComplete: (answers: SurveyAnswers) => void;
}

const employmentOptions = [
  { value: 'worker', label: 'Company/Office Worker', icon: '💼' },
  { value: 'housewife', label: 'Housewife/Househusband', icon: '🏠' },
  { value: 'teacher', label: 'Teacher', icon: '👩‍🏫' },
  { value: 'student', label: 'Student', icon: '🎓' },
];

const studentPurposeOptions = [
  { value: 'degree', label: 'Getting a degree', icon: '🎓' },
  { value: 'continuing', label: 'Continuing education', icon: '📚' },
  { value: 'language', label: 'Learning language', icon: '🌐' },
];

const livingOptions = [
  { value: 'alone', label: 'House/Apt (alone)', icon: '🏢' },
  { value: 'roommates', label: 'House/Apt (with friends/roommates)', icon: '🏘️' },
  { value: 'family', label: 'House/Apt (with family)', icon: '👨‍👩‍👧‍👦' },
  { value: 'dormitory', label: 'School dormitory', icon: '🏫' },
  { value: 'military', label: 'Military housing', icon: '🏗️' },
];

// Free Time - Gộp 3 phần vào 1 trang
const dailyActivitiesOptions = [
  { value: 'reading', label: 'Reading books/articles', icon: '📚' },
  { value: 'cooking', label: 'Cooking/Baking', icon: '👨‍🍳' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'gaming', label: 'Playing video games', icon: '🎮' },
  { value: 'socialMedia', label: 'Using social media', icon: '📱' },
  { value: 'watchingTV', label: 'Watching TV/Streaming', icon: '📺' },
  { value: 'learning', label: 'Learning new skills', icon: '🎓' },
  { value: 'volunteering', label: 'Volunteering', icon: '🤝' },
  { value: 'gardening', label: 'Gardening', icon: '🌱' },
  { value: 'crafts', label: 'DIY/Crafts', icon: '🎨' },
  { value: 'photography', label: 'Photography', icon: '📷' },
  { value: 'writing', label: 'Writing/Blogging', icon: '✍️' },
];

const relaxationOptions = [
  { value: 'meditation', label: 'Meditation/Yoga', icon: '🧘' },
  { value: 'spa', label: 'Spa/Massage', icon: '💆' },
  { value: 'music', label: 'Listening to music', icon: '🎵' },
  { value: 'nature', label: 'Walking in nature', icon: '🌳' },
  { value: 'movies', label: 'Watching movies', icon: '🎬' },
  { value: 'sleeping', label: 'Sleeping/Resting', icon: '😴' },
  { value: 'bath', label: 'Taking a bath', icon: '🛁' },
  { value: 'tea', label: 'Drinking tea/coffee', icon: '☕' },
  { value: 'journaling', label: 'Journaling', icon: '📔' },
  { value: 'art', label: 'Drawing/Painting', icon: '🎨' },
  { value: 'puzzles', label: 'Puzzles/Brain games', icon: '🧩' },
  { value: 'pets', label: 'Playing with pets', icon: '🐕' },
];

const sportsOptions = [
  { value: 'basketball', label: 'Basketball', icon: '🏀' },
  { value: 'soccer', label: 'Soccer/Football', icon: '⚽' },
  { value: 'tennis', label: 'Tennis', icon: '🎾' },
  { value: 'swimming', label: 'Swimming', icon: '🏊' },
  { value: 'running', label: 'Running/Jogging', icon: '🏃' },
  { value: 'cycling', label: 'Cycling', icon: '🚴' },
  { value: 'gym', label: 'Gym/Weight training', icon: '💪' },
  { value: 'yoga', label: 'Yoga', icon: '🧘' },
  { value: 'hiking', label: 'Hiking', icon: '🥾' },
  { value: 'badminton', label: 'Badminton', icon: '🏸' },
  { value: 'volleyball', label: 'Volleyball', icon: '🏐' },
  { value: 'martialArts', label: 'Martial arts', icon: '🥋' },
];

const interestOptions = [
  { value: 'reading', label: 'Reading books for children', icon: '📖' },
  { value: 'music', label: 'Listening to music', icon: '🎧' },
  { value: 'instrument', label: 'Playing musical instruments', icon: '🎸' },
  { value: 'singingAlone', label: 'Singing (alone)', icon: '🎤' },
  { value: 'singingGroup', label: 'Singing (with a group)', icon: '🎶' },
  { value: 'danceTeach', label: 'Teaching dance', icon: '💃' },
  { value: 'dancing', label: 'Dancing', icon: '🕺' },
  { value: 'writing', label: 'Writing', icon: '✍️' },
  { value: 'painting', label: 'Painting / Drawing', icon: '🎨' },
  { value: 'sewing', label: 'Sewing', icon: '🧵' },
  { value: 'knitting', label: 'Knitting / Cross-stitching', icon: '🧶' },
  { value: 'cooking', label: 'Cooking', icon: '👨‍🍳' },
  { value: 'gardening', label: 'Gardening', icon: '🌱' },
  { value: 'pets', label: 'Raising pets', icon: '🐕' },
];

const travelOptions = [
  { value: 'domesticBusiness', label: 'Domestic business trip', icon: '💼' },
  { value: 'overseasBusiness', label: 'Overseas business trip', icon: '✈️' },
  { value: 'noTravel', label: 'No traveling (Vacation at home)', icon: '🏠' },
  { value: 'domesticTrip', label: 'Domestic trip', icon: '🗺️' },
  { value: 'overseasTrip', label: 'Overseas trip', icon: '🌍' },
];

// MỚI: Issues you care about
const issuesOptions = [
  { value: 'humanRights', label: 'Human Rights', icon: '⚖️' },
  { value: 'environment', label: 'Environment & Climate Change', icon: '🌍' },
  { value: 'education', label: 'Education', icon: '📚' },
  { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
  { value: 'poverty', label: 'Poverty & Inequality', icon: '💰' },
  { value: 'technology', label: 'Technology & AI', icon: '🤖' },
  { value: 'mentalHealth', label: 'Mental Health', icon: '🧠' },
  { value: 'genderEquality', label: 'Gender Equality', icon: '♀️' },
  { value: 'animalRights', label: 'Animal Rights', icon: '🐾' },
  { value: 'politicalFreedom', label: 'Political Freedom', icon: '🗳️' },
];

export default function BackgroundSurvey({ onComplete }: BackgroundSurveyProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({
    employment: '',
    studentPurpose: '',
    living: '',
    freeTime: [],
    interests: [],
    sports: [],
    travel: [],
  });

  const steps = [
    { title: 'Employment', subtitle: 'What is your job?' },
    { title: 'Living Situation', subtitle: 'Where do you live?' },
    { title: 'Free Time Activities', subtitle: 'Select 6 options for each category below' },
    { title: 'Interests & Hobbies', subtitle: 'What are your interests and hobbies? (Select at least 1)' },
    { title: 'Travel Experience', subtitle: 'Which type of traveling have you done? (Select at least 1)' },
    { title: 'Issues You Care About', subtitle: 'What social issues are you interested in? (Select at least 1)' },
  ];

  const canProceed = () => {
    switch (step) {
      case 0: return answers.employment !== '' && (answers.employment !== 'student' || answers.studentPurpose !== '');
      case 1: return answers.living !== '';
      case 2: {
        // Check if all 3 categories have 6 selections each
        const dailyCount = answers.freeTime.filter(v => dailyActivitiesOptions.some(o => o.value === v)).length;
        const relaxationCount = answers.freeTime.filter(v => relaxationOptions.some(o => o.value === v)).length;
        const sportsCount = answers.freeTime.filter(v => sportsOptions.some(o => o.value === v)).length;
        return dailyCount === 6 && relaxationCount === 6 && sportsCount === 6;
      }
      case 3: return answers.interests.length >= 1;
      case 4: return answers.travel.length >= 1;
      case 5: return answers.sports.length >= 1; // Using sports field to store issues
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const toggleArrayItem = (field: keyof SurveyAnswers, value: string) => {
    const current = answers[field] as string[];
    if (current.includes(value)) {
      setAnswers({ ...answers, [field]: current.filter(v => v !== value) });
    } else {
      setAnswers({ ...answers, [field]: [...current, value] });
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 pb-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      
      {/* Progress bar */}
      <div className="relative z-10 max-w-4xl mx-auto w-full mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                i <= step ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white' : 'bg-slate-700 text-gray-400'
              }`}>
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`hidden md:block w-12 lg:w-20 h-0.5 mx-1 transition-all duration-300 ${
                  i < step ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 'bg-slate-700'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{steps[step].title}</h2>
            <p className="text-gray-400 mb-6">{steps[step].subtitle}</p>

            {/* Step 0: Employment */}
            {step === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {employmentOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setAnswers({ ...answers, employment: opt.value, studentPurpose: opt.value !== 'student' ? '' : answers.studentPurpose })}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
                        answers.employment === opt.value
                          ? 'border-purple-500 bg-purple-500/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-gray-300 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
                {answers.employment === 'student' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                    <p className="text-gray-400 mb-3">What is your purpose of studying?</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {studentPurposeOptions.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => setAnswers({ ...answers, studentPurpose: opt.value })}
                          className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
                            answers.studentPurpose === opt.value
                              ? 'border-cyan-500 bg-cyan-500/10 text-white'
                              : 'border-slate-700 bg-slate-800/50 text-gray-300 hover:border-slate-600'
                          }`}
                        >
                          <span className="text-2xl">{opt.icon}</span>
                          <span className="font-medium text-sm">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 1: Living */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {livingOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setAnswers({ ...answers, living: opt.value })}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
                      answers.living === opt.value
                        ? 'border-purple-500 bg-purple-500/10 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-gray-300 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Free Time - Gộp 3 phần vào 1 trang */}
            {step === 2 && (
              <div className="space-y-8">
                {/* Part 1: Daily Activities */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📅</span>
                    What do you usually do? (Select 6)
                    <span className="text-sm text-gray-400 font-normal">
                      ({answers.freeTime.filter(v => dailyActivitiesOptions.some(o => o.value === v)).length}/6)
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {dailyActivitiesOptions.map(opt => {
                      const isSelected = answers.freeTime.includes(opt.value);
                      const count = answers.freeTime.filter(v => dailyActivitiesOptions.some(o => o.value === v)).length;
                      const canSelect = isSelected || count < 6;
                      
                      return (
                        <button
                          key={opt.value}
                          onClick={() => canSelect && toggleArrayItem('freeTime', opt.value)}
                          disabled={!canSelect}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-2 ${
                            isSelected
                              ? 'border-purple-500 bg-purple-500/10 text-white'
                              : canSelect
                              ? 'border-slate-700 bg-slate-800/50 text-gray-300 hover:border-slate-600'
                              : 'border-slate-800 bg-slate-900/30 text-gray-600 cursor-not-allowed'
                          }`}
                        >
                          <span className="text-xl">{opt.icon}</span>
                          <span className="font-medium text-sm">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Part 2: Relaxation */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🧘</span>
                    How do you relax? (Select 6)
                    <span className="text-sm text-gray-400 font-normal">
                      ({answers.freeTime.filter(v => relaxationOptions.some(o => o.value === v)).length}/6)
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {relaxationOptions.map(opt => {
                      const isSelected = answers.freeTime.includes(opt.value);
                      const count = answers.freeTime.filter(v => relaxationOptions.some(o => o.value === v)).length;
                      const canSelect = isSelected || count < 6;
                      
                      return (
                        <button
                          key={opt.value}
                          onClick={() => canSelect && toggleArrayItem('freeTime', opt.value)}
                          disabled={!canSelect}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-2 ${
                            isSelected
                              ? 'border-cyan-500 bg-cyan-500/10 text-white'
                              : canSelect
                              ? 'border-slate-700 bg-slate-800/50 text-gray-300 hover:border-slate-600'
                              : 'border-slate-800 bg-slate-900/30 text-gray-600 cursor-not-allowed'
                          }`}
                        >
                          <span className="text-xl">{opt.icon}</span>
                          <span className="font-medium text-sm">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Part 3: Sports */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">⚽</span>
                    What sports do you like? (Select 6)
                    <span className="text-sm text-gray-400 font-normal">
                      ({answers.freeTime.filter(v => sportsOptions.some(o => o.value === v)).length}/6)
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sportsOptions.map(opt => {
                      const isSelected = answers.freeTime.includes(opt.value);
                      const count = answers.freeTime.filter(v => sportsOptions.some(o => o.value === v)).length;
                      const canSelect = isSelected || count < 6;
                      
                      return (
                        <button
                          key={opt.value}
                          onClick={() => canSelect && toggleArrayItem('freeTime', opt.value)}
                          disabled={!canSelect}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-2 ${
                            isSelected
                              ? 'border-green-500 bg-green-500/10 text-white'
                              : canSelect
                              ? 'border-slate-700 bg-slate-800/50 text-gray-300 hover:border-slate-600'
                              : 'border-slate-800 bg-slate-900/30 text-gray-600 cursor-not-allowed'
                          }`}
                        >
                          <span className="text-xl">{opt.icon}</span>
                          <span className="font-medium text-sm">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {step === 3 && (
              <div>
                <p className="text-sm text-gray-500 mb-4">Selected: {answers.interests.length} / 1 minimum</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {interestOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => toggleArrayItem('interests', opt.value)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-2 ${
                        answers.interests.includes(opt.value)
                          ? 'border-cyan-500 bg-cyan-500/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-gray-300 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span className="font-medium text-sm">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Travel */}
            {step === 4 && (
              <div>
                <p className="text-sm text-gray-500 mb-4">Selected: {answers.travel.length} / 1 minimum</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {travelOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => toggleArrayItem('travel', opt.value)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
                        answers.travel.includes(opt.value)
                          ? 'border-cyan-500 bg-cyan-500/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-gray-300 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Issues You Care About - MỚI */}
            {step === 5 && (
              <div>
                <p className="text-sm text-gray-500 mb-4">Selected: {answers.sports.length} / 1 minimum</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {issuesOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => toggleArrayItem('sports', opt.value)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
                        answers.sports.includes(opt.value)
                          ? 'border-purple-500 bg-purple-500/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-gray-300 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-[99999999] bg-slate-950/95 backdrop-blur-md border-t border-slate-800 pb-safe">
        <div className="max-w-4xl mx-auto w-full px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => step > 0 && setStep(step - 1)}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              step > 0 ? 'text-white bg-slate-800 hover:bg-slate-700 border border-slate-700' : 'text-gray-600 cursor-not-allowed'
            }`}
            disabled={step === 0}
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              canProceed()
                ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-500 hover:to-cyan-500'
                : 'bg-slate-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            {step === steps.length - 1 ? 'Continue to Self-Assessment →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
