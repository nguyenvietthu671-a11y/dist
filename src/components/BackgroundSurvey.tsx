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

const freeTimeOptions = [
  { value: 'movies', label: 'Watching movies (at cinema)', icon: '🎬' },
  { value: 'clubbing', label: 'Clubbing (Night Club)', icon: '🎉' },
  { value: 'performance', label: 'Watching performance/play', icon: '🎭' },
  { value: 'concert', label: 'Going to a concert', icon: '🎵' },
  { value: 'park', label: 'Going to a Park', icon: '🌳' },
  { value: 'camping', label: 'Camping', icon: '⛺' },
  { value: 'beach', label: 'Going to the beach', icon: '🏖️' },
  { value: 'watchSports', label: 'Watching sports', icon: '📺' },
  { value: 'kidsSports', label: 'Watching your kids play sports', icon: '👀' },
  { value: 'coaching', label: 'Coaching sports', icon: '🏋️' },
  { value: 'soloGames', label: 'Playing games by yourself', icon: '🎮' },
  { value: 'groupGames', label: 'Playing games with adults', icon: '🎲' },
  { value: 'kidsGames', label: 'Playing with kids', icon: '🧩' },
  { value: 'homework', label: "Helping with child's homework", icon: '📝' },
  { value: 'housework', label: 'Helping with housework', icon: '🧹' },
  { value: 'carMaintenance', label: 'Maintenance of car', icon: '🔧' },
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

const sportsOptions = [
  { value: 'basketball', label: 'Basketball', icon: '🏀' },
  { value: 'baseball', label: 'Baseball / Softball', icon: '⚾' },
  { value: 'soccer', label: 'Soccer', icon: '⚽' },
  { value: 'football', label: 'Football', icon: '🏈' },
  { value: 'rugby', label: 'Rugby', icon: '🏉' },
  { value: 'golf', label: 'Golf', icon: '⛳' },
  { value: 'volleyball', label: 'Volleyball', icon: '🏐' },
  { value: 'tennis', label: 'Tennis', icon: '🎾' },
  { value: 'badminton', label: 'Badminton', icon: '🏸' },
  { value: 'pingpong', label: 'Table Tennis / Ping Pong', icon: '🏓' },
  { value: 'swimming', label: 'Swimming', icon: '🏊' },
  { value: 'biking', label: 'Biking', icon: '🚴' },
  { value: 'motorbiking', label: 'Motor Biking', icon: '🏍️' },
  { value: 'skiing', label: 'Skiing / Snowboarding', icon: '⛷️' },
  { value: 'waterskiing', label: 'Water Skiing', icon: '🚤' },
  { value: 'iceskating', label: 'Ice Skating', icon: '⛸️' },
  { value: 'rollerblading', label: 'Roller Blading', icon: '🛼' },
  { value: 'horseriding', label: 'Horse riding', icon: '🏇' },
  { value: 'jogging', label: 'Jogging', icon: '🏃' },
  { value: 'walking', label: 'Walking', icon: '🚶' },
  { value: 'yoga', label: 'Doing Yoga', icon: '🧘' },
  { value: 'hiking', label: 'Hiking / Trekking', icon: '🥾' },
  { value: 'fishing', label: 'Fishing', icon: '🎣' },
  { value: 'boating', label: 'Riding a boat', icon: '⛵' },
  { value: 'workout', label: 'Working out (gym)', icon: '💪' },
  { value: 'gymnastics', label: 'Gymnastics', icon: '🤸' },
  { value: 'none', label: "I don't do any physical activity", icon: '🛋️' },
];

const travelOptions = [
  { value: 'domesticBusiness', label: 'Domestic business trip', icon: '💼' },
  { value: 'overseasBusiness', label: 'Overseas business trip', icon: '✈️' },
  { value: 'noTravel', label: 'No traveling (Vacation at home)', icon: '🏠' },
  { value: 'domesticTrip', label: 'Domestic trip', icon: '🗺️' },
  { value: 'overseasTrip', label: 'Overseas trip', icon: '🌍' },
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
    { title: 'Free Time', subtitle: 'What do you do in your free time? (Select at least 12)' },
    { title: 'Interests & Hobbies', subtitle: 'What are your interests and hobbies? (Select at least 1)' },
    { title: 'Sports & Exercise', subtitle: 'What sports or exercise do you enjoy? (Select at least 1)' },
    { title: 'Travel Experience', subtitle: 'Which type of traveling have you done? (Select at least 1)' },
  ];

  const canProceed = () => {
    switch (step) {
      case 0: return answers.employment !== '' && (answers.employment !== 'student' || answers.studentPurpose !== '');
      case 1: return answers.living !== '';
      case 2: return answers.freeTime.length >= 12;
      case 3: return answers.interests.length >= 1;
      case 4: return answers.sports.length >= 1;
      case 5: return answers.travel.length >= 1;
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
    <div className="min-h-screen flex flex-col p-6 relative">
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

            {/* Step 2: Free Time */}
            {step === 2 && (
              <div>
                <p className="text-sm text-gray-500 mb-4">Selected: {answers.freeTime.length} / 12 minimum</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {freeTimeOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => toggleArrayItem('freeTime', opt.value)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-2 ${
                        answers.freeTime.includes(opt.value)
                          ? 'border-purple-500 bg-purple-500/10 text-white'
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

            {/* Step 4: Sports */}
            {step === 4 && (
              <div>
                <p className="text-sm text-gray-500 mb-4">Selected: {answers.sports.length} / 1 minimum</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto pr-2">
                  {sportsOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => toggleArrayItem('sports', opt.value)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-2 ${
                        answers.sports.includes(opt.value)
                          ? 'border-purple-500 bg-purple-500/10 text-white'
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

            {/* Step 5: Travel */}
            {step === 5 && (
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="relative z-10 max-w-4xl mx-auto w-full mt-8 flex justify-between">
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
  );
}
