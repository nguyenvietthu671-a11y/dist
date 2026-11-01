/**
 * OPIc AI Simulator - Complete Authentic ACTFL Simulation
 * Synchronized with English OPIc Test's 5-Part Background Survey, Self Assessment, Setup, Sample & 15 Combos
 * Fully Accessible (WCAG 2.1 / 2.2 AA) & Responsive
 */

// --- 1. FULL TOPIC CATALOG (Extracted from REA) ---
const TOPICS_CATALOG = {
  al: [
    "Appointment", "Bank", "Bar", "Bicycle", "Building", "Business_Trip",
    "Camp", "Cinema", "City", "Clothing", "Communication", "Concert",
    "Cooking", "Country", "Dance", "Dentist", "Device", "Doctor",
    "Environment", "Furniture", "Gathering", "Geography", "Grocery", "Gym",
    "Hair_Salon", "Holiday", "Hotel", "House", "Housework", "Industry",
    "Internet", "Jogging", "Library", "Memory", "Movie", "Music",
    "Neighbor", "News", "Park", "Pet", "Phone", "Problem_Resolution",
    "Recycling", "Restaurant", "Roleplay_Appointment", "Roleplay_Bank",
    "Roleplay_Bar", "Roleplay_Bicycle", "Roleplay_Building", "Roleplay_Business_Trip",
    "Roleplay_Camp", "Roleplay_Cinema", "Roleplay_City", "Roleplay_Clothing",
    "Roleplay_Communication", "Roleplay_Concert", "Roleplay_Cooking", "Roleplay_Country",
    "Roleplay_Dance", "Roleplay_Dentist", "Roleplay_Device", "Roleplay_Doctor",
    "Roleplay_Environment", "Roleplay_Furniture", "Roleplay_Gathering", "Roleplay_Geography",
    "Roleplay_Grocery", "Roleplay_Gym", "Roleplay_Hair_Salon", "Roleplay_Holiday",
    "Roleplay_Hotel", "Roleplay_House", "Roleplay_Housework", "Roleplay_Industry",
    "Roleplay_Internet", "Roleplay_Jogging", "Roleplay_Library", "Roleplay_Memory",
    "Roleplay_Movie", "Roleplay_Music", "Roleplay_Neighbor", "Roleplay_News",
    "Roleplay_Park", "Roleplay_Pet", "Roleplay_Phone", "Roleplay_Problem_Resolution",
    "Roleplay_Recycling", "Roleplay_Restaurant", "Roleplay_School", "Roleplay_Shopping",
    "Roleplay_Social_Media", "Roleplay_Society", "Roleplay_Stay_at_Home", "Roleplay_Swimming",
    "Roleplay_Technology", "Roleplay_Transportation", "Roleplay_Travel_Domestic",
    "Roleplay_Travel_Overseas", "Roleplay_TV", "Roleplay_Walking", "Roleplay_Weather",
    "Roleplay_Workplace", "School", "Shopping", "Social_Media", "Society",
    "Stay_at_Home", "Swimming", "Technology", "Transportation", "Travel_Domestic",
    "Travel_Overseas", "TV", "Walking", "Weather", "Workplace"
  ],
  im: [
    "Appointment", "Bank", "Bicycle", "Camp", "Cinema", "City",
    "Clothing", "Concert", "Cooking", "Country", "Dance", "Dentist",
    "Doctor", "Furniture", "Gathering", "Geography", "Grocery", "Gym",
    "Hair_Salon", "Holiday", "Hotel", "House", "Housework", "Internet",
    "Jogging", "Library", "Movie", "Music", "Neighbor", "Park",
    "Pet", "Phone", "Restaurant", "School", "Shopping", "Social_Media",
    "Stay_at_Home", "Swimming", "Technology", "Transportation", "Travel_Domestic",
    "Travel_Overseas", "TV", "Walking", "Weather", "Workplace"
  ]
};

// --- 2. AUTHENTIC SURVEY DATA DEFINITIONS (Extracted from REA main.dart.js) ---
const SURVEY_DEFINITIONS = {
  part1: {
    workFields: [
      "Business / Corporation",
      "Home Business",
      "Teacher / Educator",
      "No work experience"
    ],
    experienceCorp: [
      "This is my first job - less than 2 months",
      "This is my first job - more than 2 months",
      "Not my first job - more than 2 months"
    ],
    teachLevels: [
      "Higher Education / University",
      "Secondary / Elementary Education",
      "Continuing Education"
    ],
    teachDurations: [
      "Fewer than 2 months; this is my first job.",
      "Fewer than 2 months; this is my first job teaching, but I have other work experience.",
      "I have been teaching for more than 2 months."
    ]
  },
  part2: {
    studentStatus: [
      "Yes, Full-time or Part-time",
      "No"
    ],
    classesTaking: [
      "College or university to earn a degree",
      "Continuing education to improve professional skills",
      "Language classes"
    ],
    lastEducation: [
      "College or university to earn a degree",
      "Continuing education to improve professional skills",
      "Language classes",
      "It has been more than 5 years since I took a class"
    ]
  },
  part3: {
    housingOptions: [
      "I live alone in a house or an apartment.",
      "I live with family members in a house or an apartment.",
      "I live with non-family members in a house or an apartment.",
      "I live in a school dormitory.",
      "I live in military barracks."
    ]
  },
  part4: {
    activities: [
      "go to the movies", "go to clubs/nightclubs", "go to the theater", "go to concerts",
      "go to museums", "go to parks", "watch TV", "go camping", "go to the beach",
      "watch professional sports", "watch your children play sports", "coach sports",
      "play games by yourself (cards, video games, etc.)",
      "play games with adults (cards, billiards, board games, etc.)",
      "play games with children (cards, board games, etc.)",
      "help your children with school assignments", "do home improvement projects",
      "maintain your car", "go shopping"
    ],
    hobbies: [
      "read to children", "listen to music", "play a musical instrument", "sing alone",
      "sing with a group", "take dance class/lessons", "go out dancing",
      "write creatively (letters, short stories, poetry)", "draw, paint", "sew, embroider",
      "knit, crochet", "cook", "garden", "have pets", "read or listen to news"
    ],
    sports: [
      "play basketball", "play baseball/softball", "play soccer", "play football",
      "play rugby", "play ice hockey", "play field hockey", "play cricket", "play golf",
      "play volleyball", "play tennis", "play badminton", "play table tennis", "swim",
      "bike", "ride a motorcycle", "scuba dive/snorkel", "ski/snowboard", "waterski",
      "ice skate", "inline skate", "go horseback riding", "jog", "walk", "do martial arts",
      "do yoga", "go hiking/trekking", "go fishing", "go boating", "go to a health club or gym",
      "exercise", "do not participate in sports or physical activities"
    ],
    travel: [
      "travel for business domestically", "travel for business internationally",
      "stay at home for vacation", "take vacation domestically", "take vacation internationally"
    ]
  },
  part5: {
    topics: [
      "Environment",
      "Human Rights",
      "Global Workplace",
      "Social Culture",
      "Communication"
    ]
  },
  selfAssessment: [
    {
      level: 1,
      grade: "NM",
      text: "I can speak in 10 words or less."
    },
    {
      level: 2,
      grade: "NH",
      text: "I can name basic objects, colors, days of the week, foods, clothing items, numbers, etc. I cannot make a complete sentence or ask simple questions."
    },
    {
      level: 3,
      grade: "IL",
      text: "I can give some basic information about myself, work, familiar people and places, and daily routines while speaking in simple sentences. I can ask some simple questions."
    },
    {
      level: 4,
      grade: "IM",
      text: "I can participate in simple conversations about familiar topics and routines. I can talk about things that have happened, but sometimes my forms are incorrect. I can handle a range of everyday transactions to get what I need."
    },
    {
      level: 5,
      grade: "IH",
      text: "I can participate fully and confidently in all conversations about topics and activities related to home, work/school, personal and community interests. I can speak in connected discourse about things that have happened, are happening, and will happen. I can explain and elaborate when necessary. I can handle routine situations, even when there may be an unexpected complication."
    },
    {
      level: 6,
      grade: "AL",
      text: "I can engage in all informal and formal discussions on issues related to personal, general or professional interests. I can deal with these issues abstractly, support my opinion, and construct hypotheses to explore alternatives. I am able to elaborate at length and in detail on most topics with a high level of accuracy and a wide range of precise vocabulary."
    }
  ]
};

// Mapping from survey activities to question bank topics
const SURVEY_TOPIC_MAP = {
  // Part 1
  "Business / Corporation": ["Workplace", "Appointment"],
  "Home Business": ["Workplace"],
  "Teacher / Educator": ["Workplace"],
  
  // Part 2
  "College or university to earn a degree": ["School", "Library"],
  "Language classes": ["School"],
  
  // Part 3
  "I live alone in a house or an apartment.": ["House", "Housework", "Furniture", "Neighbor"],
  "I live with family members in a house or an apartment.": ["House", "Housework", "Neighbor"],
  "I live with non-family members in a house or an apartment.": ["House", "Neighbor"],
  "I live in a school dormitory.": ["House", "Neighbor"],
  
  // Part 4 Activities
  "go to the movies": ["Movie", "Cinema"],
  "go to clubs/nightclubs": ["Bar"],
  "go to the theater": ["Movie", "Cinema"],
  "go to concerts": ["Concert"],
  "go to museums": ["Building"],
  "go to parks": ["Park"],
  "watch TV": ["TV"],
  "go camping": ["Camp"],
  "go to the beach": ["Beach"],
  "go shopping": ["Shopping", "Grocery"],
  
  // Part 4 Hobbies
  "listen to music": ["Music"],
  "play a musical instrument": ["Music"],
  "sing alone": ["Music"],
  "sing with a group": ["Music"],
  "take dance class/lessons": ["Dance"],
  "go out dancing": ["Dance"],
  "cook": ["Cooking"],
  "have pets": ["Pet"],
  
  // Part 4 Sports
  "swim": ["Swimming"],
  "bike": ["Bicycle"],
  "jog": ["Jogging"],
  "walk": ["Walking"],
  "go to a health club or gym": ["Gym"],
  
  // Part 4 Travel
  "travel for business domestically": ["Business_Trip"],
  "travel for business internationally": ["Travel_Overseas"],
  "stay at home for vacation": ["Stay_at_Home"],
  "take vacation domestically": ["Travel_Domestic"],
  "take vacation internationally": ["Travel_Overseas"],
  
  // Part 5
  "Environment": ["Environment", "Recycling", "Weather"],
  "Human Rights": ["News", "Society"],
  "Global Workplace": ["Industry", "Workplace"],
  "Social Culture": ["Social_Media", "Holiday"],
  "Communication": ["Communication", "Phone", "Internet", "Technology"]
};

// Fallback core bank (if assets/questions_all.json is loading or offline)
const EMBEDDED_CORE_BANK = [
  {
    topic: "Introduction",
    text: "Let's start the interview now. Tell me something about yourself.",
    audio_path: "assets/01_Q1.mp3",
    roleplay: false,
    duration: 120
  }
];

// --- 3. APPLICATION STATE ---
const state = {
  // Current app stage: "survey" | "assessment" | "setup" | "sample" | "begin" | "exam" | "report"
  currentStage: "survey",
  surveyPart: 1, // 1 to 5

  // Background Survey Answers
  surveyAnswers: {
    // Part 1
    workField: null,
    workCurrently: null,
    workExperience: null,
    workSupervise: null,
    teachLevel: null,
    teachDuration: null,
    teachSupervise: null,
    // Part 2
    studentStatus: null,
    classesTaking: null,
    lastEducation: null,
    // Part 3
    housing: null,
    // Part 4
    activities: new Set(),
    // Part 5
    topics: new Set()
  },

  // Self Assessment
  assessmentLevel: 6, // Default 6 (AL)
  track: "al",        // "al" | "im"

  // Question database & combo generation
  allQuestions: [],
  questionsByTopic: {},
  examQuestions: [],
  currentIndex: 0,

  // Exam runtime
  examState: "initial",
  hasReplayed: false,
  speakingSecondsRemaining: 120,
  maxQuestionSeconds: 120,
  speakingTimerInterval: null,

  // Total timer (30 minutes)
  totalSecondsRemaining: 1800,
  totalTimerInterval: null,

  // Audio & Mic
  audioPlayer: null,
  mediaRecorder: null,
  audioChunks: [],
  audioContext: null,
  analyser: null,
  animFrameId: null,

  // Live Speech Recognition
  speechRecognizer: null,
  currentTranscript: "",

  // Collected answers
  answers: []
};

// --- 4. DOM ELEMENTS CACHE ---
const dom = {
  // Flow Steppers
  flowStepper: document.getElementById("flowStepper"),
  stepIndicatorSurvey: document.getElementById("stepIndicatorSurvey"),
  stepIndicatorAssessment: document.getElementById("stepIndicatorAssessment"),
  stepIndicatorSetup: document.getElementById("stepIndicatorSetup"),
  stepIndicatorSample: document.getElementById("stepIndicatorSample"),
  stepIndicatorBegin: document.getElementById("stepIndicatorBegin"),
  stepIndicatorExam: document.getElementById("stepIndicatorExam"),
  stepIndicatorReport: document.getElementById("stepIndicatorReport"),

  // Header
  currentTrackBadge: document.getElementById("currentTrackBadge"),
  examHeaderInfo: document.getElementById("examHeaderInfo"),
  currentQuestionNum: document.getElementById("currentQuestionNum"),
  totalTimerContainer: document.getElementById("totalTimerContainer"),
  totalTimeDisplay: document.getElementById("totalTimeDisplay"),
  btnRestart: document.getElementById("btnRestart"),

  // Views
  viewSurvey: document.getElementById("viewSurvey"),
  viewSelfAssessment: document.getElementById("viewSelfAssessment"),
  viewDeviceCheck: document.getElementById("viewDeviceCheck"),
  viewSampleQuestion: document.getElementById("viewSampleQuestion"),
  viewBeginTest: document.getElementById("viewBeginTest"),
  viewExam: document.getElementById("viewExam"),
  viewReport: document.getElementById("viewReport"),

  // Survey Subpages & Controls
  surveyPartTag: document.getElementById("surveyPartTag"),
  surveySubtitle: document.getElementById("surveySubtitle"),
  dotPart1: document.getElementById("dotPart1"),
  dotPart2: document.getElementById("dotPart2"),
  dotPart3: document.getElementById("dotPart3"),
  dotPart4: document.getElementById("dotPart4"),
  dotPart5: document.getElementById("dotPart5"),
  surveySubpage1: document.getElementById("surveySubpage1"),
  surveySubpage2: document.getElementById("surveySubpage2"),
  surveySubpage3: document.getElementById("surveySubpage3"),
  surveySubpage4: document.getElementById("surveySubpage4"),
  surveySubpage5: document.getElementById("surveySubpage5"),
  q1WorkFieldGroup: document.getElementById("q1WorkFieldGroup"),
  q1SubQuestionsContainer: document.getElementById("q1SubQuestionsContainer"),
  q2SchoolGroup: document.getElementById("q2SchoolGroup"),
  q2SubQuestionsContainer: document.getElementById("q2SubQuestionsContainer"),
  q3HousingGroup: document.getElementById("q3HousingGroup"),
  part4CounterBadge: document.getElementById("part4CounterBadge"),
  part4Count: document.getElementById("part4Count"),
  part4ActivitiesGrid: document.getElementById("part4ActivitiesGrid"),
  part4HobbiesGrid: document.getElementById("part4HobbiesGrid"),
  part4SportsGrid: document.getElementById("part4SportsGrid"),
  part4TravelGrid: document.getElementById("part4TravelGrid"),
  part5CounterBadge: document.getElementById("part5CounterBadge"),
  part5Count: document.getElementById("part5Count"),
  part5TopicsGrid: document.getElementById("part5TopicsGrid"),
  btnSurveyBack: document.getElementById("btnSurveyBack"),
  btnSurveyNext: document.getElementById("btnSurveyNext"),

  // Self Assessment
  selfAssessmentGrid: document.getElementById("selfAssessmentGrid"),
  btnAssessmentBack: document.getElementById("btnAssessmentBack"),
  btnConfirmAssessment: document.getElementById("btnConfirmAssessment"),

  // Device Check
  btnPlayTestAudio: document.getElementById("btnPlayTestAudio"),
  testAudioElement: document.getElementById("testAudioElement"),
  btnTestMic: document.getElementById("btnTestMic"),
  meterBar: document.getElementById("meterBar"),
  micMeter: document.getElementById("micMeter"),
  micStatusText: document.getElementById("micStatusText"),
  btnBackToAssessment: document.getElementById("btnBackToAssessment"),
  btnStartSample: document.getElementById("btnStartSample"),

  // Sample Question
  btnSamplePlay: document.getElementById("btnSamplePlay"),
  btnSampleReplay: document.getElementById("btnSampleReplay"),
  sampleReplayCount: document.getElementById("sampleReplayCount"),
  sampleAudioPlayer: document.getElementById("sampleAudioPlayer"),
  sampleStatePill: document.getElementById("sampleStatePill"),
  sampleStateText: document.getElementById("sampleStateText"),
  sampleSoundWave: document.getElementById("sampleSoundWave"),
  sampleRecordingBox: document.getElementById("sampleRecordingBox"),
  btnSampleStopRec: document.getElementById("btnSampleStopRec"),
  btnSampleBack: document.getElementById("btnSampleBack"),
  btnProceedToBegin: document.getElementById("btnProceedToBegin"),

  // Begin Test
  testConfigSummary: document.getElementById("testConfigSummary"),
  btnBeginBack: document.getElementById("btnBeginBack"),
  btnRealBegin: document.getElementById("btnRealBegin"),

  // Exam
  avaImg: document.getElementById("avaImg"),
  soundWaveRing: document.getElementById("soundWaveRing"),
  examStatePill: document.getElementById("examStatePill"),
  examStateText: document.getElementById("examStateText"),
  btnReplay: document.getElementById("btnReplay"),
  replayCountText: document.getElementById("replayCountText"),
  promptAudioWaves: document.getElementById("promptAudioWaves"),
  examAudioPlayer: document.getElementById("examAudioPlayer"),
  btnToggleTranscript: document.getElementById("btnToggleTranscript"),
  transcriptBox: document.getElementById("transcriptBox"),
  promptTextDisplay: document.getElementById("promptTextDisplay"),
  recordingPanel: document.getElementById("recordingPanel"),
  liveVisualizer: document.getElementById("liveVisualizer"),
  speakingTimerLabel: document.getElementById("speakingTimerLabel"),
  speakingTimerDigits: document.getElementById("speakingTimerDigits"),
  timerProgressTrack: document.getElementById("timerProgressTrack"),
  timerProgressFill: document.getElementById("timerProgressFill"),
  btnNextQuestion: document.getElementById("btnNextQuestion"),

  // Report
  finalOPIcLevel: document.getElementById("finalOPIcLevel"),
  finalLevelTitle: document.getElementById("finalLevelTitle"),
  reportTotalAnswers: document.getElementById("reportTotalAnswers"),
  reportTimeSpent: document.getElementById("reportTimeSpent"),
  reportAvgScore: document.getElementById("reportAvgScore"),
  scoreFluency: document.getElementById("scoreFluency"),
  barFluency: document.getElementById("barFluency"),
  progFluency: document.getElementById("progFluency"),
  scoreVocabulary: document.getElementById("scoreVocabulary"),
  barVocabulary: document.getElementById("barVocabulary"),
  progVocab: document.getElementById("progVocab"),
  scoreGrammar: document.getElementById("scoreGrammar"),
  barGrammar: document.getElementById("barGrammar"),
  progGrammar: document.getElementById("progGrammar"),
  scoreRelevance: document.getElementById("scoreRelevance"),
  barRelevance: document.getElementById("barRelevance"),
  progRelevance: document.getElementById("progRelevance"),
  breakdownList: document.getElementById("breakdownList"),
  btnRetakeExam: document.getElementById("btnRetakeExam")
};

// --- 5. DATA LOADING (578 Questions Bank) ---
async function loadAllQuestions() {
  try {
    const res = await fetch("assets/questions_all.json");
    if (!res.ok) throw new Error("assets/questions_all.json not found");
    state.allQuestions = await res.json();
  } catch (err) {
    console.warn("Falling back to core bank:", err);
    state.allQuestions = [...EMBEDDED_CORE_BANK];
  }
  
  state.questionsByTopic = {};
  state.allQuestions.forEach(q => {
    if (!state.questionsByTopic[q.topic]) {
      state.questionsByTopic[q.topic] = [];
    }
    state.questionsByTopic[q.topic].push(q);
  });
  console.log(`Loaded ${state.allQuestions.length} questions across ${Object.keys(state.questionsByTopic).length} topics.`);
}

// --- 6. VIEW SWITCHING & STEP PROGRESSION (WCAG 2.4.3) ---
function switchStage(stageName) {
  state.currentStage = stageName;

  const views = [
    { name: "survey", el: dom.viewSurvey, ind: dom.stepIndicatorSurvey },
    { name: "assessment", el: dom.viewSelfAssessment, ind: dom.stepIndicatorAssessment },
    { name: "setup", el: dom.viewDeviceCheck, ind: dom.stepIndicatorSetup },
    { name: "sample", el: dom.viewSampleQuestion, ind: dom.stepIndicatorSample },
    { name: "begin", el: dom.viewBeginTest, ind: dom.stepIndicatorBegin },
    { name: "exam", el: dom.viewExam, ind: dom.stepIndicatorExam },
    { name: "report", el: dom.viewReport, ind: dom.stepIndicatorReport }
  ];

  let passedCurrent = false;
  views.forEach(v => {
    if (v.name === stageName) {
      v.el.style.display = "block";
      v.el.classList.add("active");
      v.el.setAttribute("tabindex", "-1");
      v.el.focus({ preventScroll: true });
      v.ind.classList.add("active");
      v.ind.classList.remove("completed");
      passedCurrent = true;
    } else {
      v.el.style.display = "none";
      v.el.classList.remove("active");
      v.el.removeAttribute("tabindex");
      v.ind.classList.remove("active");
      if (!passedCurrent) {
        v.ind.classList.add("completed");
      } else {
        v.ind.classList.remove("completed");
      }
    }
  });

  // Top header status
  if (stageName === "exam") {
    dom.examHeaderInfo.style.display = "flex";
    dom.totalTimerContainer.style.display = "flex";
  } else {
    dom.examHeaderInfo.style.display = "none";
    dom.totalTimerContainer.style.display = "none";
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 7. AUTHENTIC SURVEY RENDERING & BRANCHING LOGIC ---

// Helper: Render simple single-choice vertical options
function renderChoiceGroup(container, options, selectedValue, onSelect) {
  container.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `choice-card-button ${selectedValue === opt ? 'selected' : ''}`;
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", selectedValue === opt ? "true" : "false");
    btn.innerHTML = `
      <div class="choice-radio-circle" aria-hidden="true"></div>
      <span class="choice-card-title">${opt}</span>
    `;
    btn.addEventListener("click", () => {
      onSelect(opt);
    });
    container.appendChild(btn);
  });
}

// Render Part 1: Work Experience
function renderSurveyPart1() {
  renderChoiceGroup(
    dom.q1WorkFieldGroup,
    SURVEY_DEFINITIONS.part1.workFields,
    state.surveyAnswers.workField,
    (val) => {
      state.surveyAnswers.workField = val;
      // Reset sub-questions
      state.surveyAnswers.workCurrently = null;
      state.surveyAnswers.workExperience = null;
      state.surveyAnswers.workSupervise = null;
      state.surveyAnswers.teachLevel = null;
      state.surveyAnswers.teachDuration = null;
      state.surveyAnswers.teachSupervise = null;
      renderSurveyPart1();
    }
  );

  dom.q1SubQuestionsContainer.innerHTML = "";

  const field = state.surveyAnswers.workField;
  if (field === "Business / Corporation" || field === "Home Business") {
    // Sub-question 1: Are you currently working?
    const block1 = document.createElement("div");
    block1.className = "subquestion-block";
    block1.innerHTML = `<span class="subquestion-label">Are you currently working?</span>`;
    const grp1 = document.createElement("div");
    grp1.className = "options-vertical-grid";
    renderChoiceGroup(grp1, ["Yes", "No"], state.surveyAnswers.workCurrently, (v) => {
      state.surveyAnswers.workCurrently = v;
      state.surveyAnswers.workExperience = null;
      state.surveyAnswers.workSupervise = null;
      renderSurveyPart1();
    });
    block1.appendChild(grp1);
    dom.q1SubQuestionsContainer.appendChild(block1);

    if (state.surveyAnswers.workCurrently === "Yes") {
      // Sub-question 2: Work experience
      const block2 = document.createElement("div");
      block2.className = "subquestion-block";
      block2.innerHTML = `<span class="subquestion-label">What best describes your work experience?</span>`;
      const grp2 = document.createElement("div");
      grp2.className = "options-vertical-grid";
      renderChoiceGroup(grp2, SURVEY_DEFINITIONS.part1.experienceCorp, state.surveyAnswers.workExperience, (v) => {
        state.surveyAnswers.workExperience = v;
        state.surveyAnswers.workSupervise = null;
        renderSurveyPart1();
      });
      block2.appendChild(grp2);
      dom.q1SubQuestionsContainer.appendChild(block2);

      if (state.surveyAnswers.workExperience === "Not my first job - more work experience" ||
          state.surveyAnswers.workExperience === "This is my first job - more than 2 months") {
        // Sub-question 3: Supervise
        const block3 = document.createElement("div");
        block3.className = "subquestion-block";
        block3.innerHTML = `<span class="subquestion-label">Are you a manager/director who supervises other people?</span>`;
        const grp3 = document.createElement("div");
        grp3.className = "options-vertical-grid";
        renderChoiceGroup(grp3, ["Yes", "No"], state.surveyAnswers.workSupervise, (v) => {
          state.surveyAnswers.workSupervise = v;
          renderSurveyPart1();
        });
        block3.appendChild(grp3);
        dom.q1SubQuestionsContainer.appendChild(block3);
      }
    }
  } else if (field === "Teacher / Educator") {
    // Teacher Level
    const block1 = document.createElement("div");
    block1.className = "subquestion-block";
    block1.innerHTML = `<span class="subquestion-label">What level do you teach?</span>`;
    const grp1 = document.createElement("div");
    grp1.className = "options-vertical-grid";
    renderChoiceGroup(grp1, SURVEY_DEFINITIONS.part1.teachLevels, state.surveyAnswers.teachLevel, (v) => {
      state.surveyAnswers.teachLevel = v;
      state.surveyAnswers.teachDuration = null;
      state.surveyAnswers.teachSupervise = null;
      renderSurveyPart1();
    });
    block1.appendChild(grp1);
    dom.q1SubQuestionsContainer.appendChild(block1);

    if (state.surveyAnswers.teachLevel === "Higher Education / University") {
      const block2 = document.createElement("div");
      block2.className = "subquestion-block";
      block2.innerHTML = `<span class="subquestion-label">How long have you been teaching?</span>`;
      const grp2 = document.createElement("div");
      grp2.className = "options-vertical-grid";
      renderChoiceGroup(grp2, SURVEY_DEFINITIONS.part1.teachDurations, state.surveyAnswers.teachDuration, (v) => {
        state.surveyAnswers.teachDuration = v;
        state.surveyAnswers.teachSupervise = null;
        renderSurveyPart1();
      });
      block2.appendChild(grp2);
      dom.q1SubQuestionsContainer.appendChild(block2);

      if (state.surveyAnswers.teachDuration === "I have been teaching for more than 2 months.") {
        const block3 = document.createElement("div");
        block3.className = "subquestion-block";
        block3.innerHTML = `<span class="subquestion-label">Are you a manager/director who supervises other people?</span>`;
        const grp3 = document.createElement("div");
        grp3.className = "options-vertical-grid";
        renderChoiceGroup(grp3, ["Yes", "No"], state.surveyAnswers.teachSupervise, (v) => {
          state.surveyAnswers.teachSupervise = v;
          renderSurveyPart1();
        });
        block3.appendChild(grp3);
        dom.q1SubQuestionsContainer.appendChild(block3);
      }
    }
  }

  validateSurveyStep();
}

// Render Part 2: Education
function renderSurveyPart2() {
  renderChoiceGroup(
    dom.q2SchoolGroup,
    SURVEY_DEFINITIONS.part2.studentStatus,
    state.surveyAnswers.studentStatus,
    (val) => {
      state.surveyAnswers.studentStatus = val;
      state.surveyAnswers.classesTaking = null;
      state.surveyAnswers.lastEducation = null;
      renderSurveyPart2();
    }
  );

  dom.q2SubQuestionsContainer.innerHTML = "";
  if (state.surveyAnswers.studentStatus === "Yes, Full-time or Part-time") {
    const block = document.createElement("div");
    block.className = "subquestion-block";
    block.innerHTML = `<span class="subquestion-label">What best describes the classes you are taking?</span>`;
    const grp = document.createElement("div");
    grp.className = "options-vertical-grid";
    renderChoiceGroup(grp, SURVEY_DEFINITIONS.part2.classesTaking, state.surveyAnswers.classesTaking, (v) => {
      state.surveyAnswers.classesTaking = v;
      renderSurveyPart2();
    });
    block.appendChild(grp);
    dom.q2SubQuestionsContainer.appendChild(block);
  } else if (state.surveyAnswers.studentStatus === "No") {
    const block = document.createElement("div");
    block.className = "subquestion-block";
    block.innerHTML = `<span class="subquestion-label">What best describes your last educational experience?</span>`;
    const grp = document.createElement("div");
    grp.className = "options-vertical-grid";
    renderChoiceGroup(grp, SURVEY_DEFINITIONS.part2.lastEducation, state.surveyAnswers.lastEducation, (v) => {
      state.surveyAnswers.lastEducation = v;
      renderSurveyPart2();
    });
    block.appendChild(grp);
    dom.q2SubQuestionsContainer.appendChild(block);
  }

  validateSurveyStep();
}

// Render Part 3: Housing
function renderSurveyPart3() {
  renderChoiceGroup(
    dom.q3HousingGroup,
    SURVEY_DEFINITIONS.part3.housingOptions,
    state.surveyAnswers.housing,
    (val) => {
      state.surveyAnswers.housing = val;
      renderSurveyPart3();
    }
  );
  validateSurveyStep();
}

// Helper: Render multi-select chip grid
function renderMultiSelectChips(container, items, selectedSet, onToggle) {
  container.innerHTML = "";
  items.forEach(item => {
    const isSelected = selectedSet.has(item);
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `chip-item-button ${isSelected ? 'selected' : ''}`;
    chip.setAttribute("role", "checkbox");
    chip.setAttribute("aria-checked", isSelected ? "true" : "false");
    chip.innerHTML = `
      <div class="chip-checkbox" aria-hidden="true"></div>
      <span>${item}</span>
    `;
    chip.addEventListener("click", () => {
      onToggle(item);
    });
    container.appendChild(chip);
  });
}

// Render Part 4: Activities, Hobbies, Sports, Travel (At least 6 items)
function renderSurveyPart4() {
  const toggleActivity = (item) => {
    if (state.surveyAnswers.activities.has(item)) {
      state.surveyAnswers.activities.delete(item);
    } else {
      state.surveyAnswers.activities.add(item);
    }
    renderSurveyPart4();
  };

  renderMultiSelectChips(dom.part4ActivitiesGrid, SURVEY_DEFINITIONS.part4.activities, state.surveyAnswers.activities, toggleActivity);
  renderMultiSelectChips(dom.part4HobbiesGrid, SURVEY_DEFINITIONS.part4.hobbies, state.surveyAnswers.activities, toggleActivity);
  renderMultiSelectChips(dom.part4SportsGrid, SURVEY_DEFINITIONS.part4.sports, state.surveyAnswers.activities, toggleActivity);
  renderMultiSelectChips(dom.part4TravelGrid, SURVEY_DEFINITIONS.part4.travel, state.surveyAnswers.activities, toggleActivity);

  const count = state.surveyAnswers.activities.size;
  dom.part4Count.textContent = count;
  if (count >= 6) {
    dom.part4CounterBadge.classList.add("met");
    dom.part4CounterBadge.textContent = `${count} Items Selected (Đã đạt tối thiểu 6 ✓)`;
  } else {
    dom.part4CounterBadge.classList.remove("met");
    dom.part4CounterBadge.textContent = `${count} Items Selected (Chọn thêm ${6 - count} mục nữa)`;
  }

  validateSurveyStep();
}

// Render Part 5: 3 Topics Interested (Choose exactly 3)
function renderSurveyPart5() {
  dom.part5TopicsGrid.innerHTML = "";
  const count = state.surveyAnswers.topics.size;

  SURVEY_DEFINITIONS.part5.topics.forEach(t => {
    const isSelected = state.surveyAnswers.topics.has(t);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `topic-large-card ${isSelected ? 'selected' : ''} ${!isSelected && count >= 3 ? 'disabled-unselected' : ''}`;
    btn.setAttribute("role", "checkbox");
    btn.setAttribute("aria-checked", isSelected ? "true" : "false");
    btn.innerHTML = `
      <div class="chip-checkbox" aria-hidden="true"></div>
      <span class="topic-large-name">${t}</span>
    `;

    btn.addEventListener("click", () => {
      if (isSelected) {
        state.surveyAnswers.topics.delete(t);
      } else {
        if (count < 3) {
          state.surveyAnswers.topics.add(t);
        }
      }
      renderSurveyPart5();
    });

    dom.part5TopicsGrid.appendChild(btn);
  });

  dom.part5Count.textContent = state.surveyAnswers.topics.size;
  if (state.surveyAnswers.topics.size === 3) {
    dom.part5CounterBadge.classList.add("met");
    dom.part5CounterBadge.textContent = "3 / 3 Topics Selected (Đã chọn đủ 3 ✓)";
  } else {
    dom.part5CounterBadge.classList.remove("met");
    dom.part5CounterBadge.textContent = `${state.surveyAnswers.topics.size} / 3 Topics Selected`;
  }

  validateSurveyStep();
}

// Validation logic for current Survey subpage
function validateSurveyStep() {
  let isValid = false;

  if (state.surveyPart === 1) {
    const f = state.surveyAnswers.workField;
    if (f === "No work experience") isValid = true;
    else if (f === "Business / Corporation" || f === "Home Business") {
      if (state.surveyAnswers.workCurrently === "No") isValid = true;
      else if (state.surveyAnswers.workCurrently === "Yes") {
        const exp = state.surveyAnswers.workExperience;
        if (exp === "This is my first job - less than 2 months") isValid = true;
        else if (exp && state.surveyAnswers.workSupervise) isValid = true;
      }
    } else if (f === "Teacher / Educator") {
      const lvl = state.surveyAnswers.teachLevel;
      if (lvl === "Secondary / Elementary Education" || lvl === "Continuing Education") isValid = true;
      else if (lvl === "Higher Education / University") {
        const dur = state.surveyAnswers.teachDuration;
        if (dur === "Fewer than 2 months; this is my first job." ||
            dur === "Fewer than 2 months; this is my first job teaching, but I have other work experience.") isValid = true;
        else if (dur === "I have been teaching for more than 2 months." && state.surveyAnswers.teachSupervise) isValid = true;
      }
    }
  } else if (state.surveyPart === 2) {
    if (state.surveyAnswers.studentStatus === "Yes, Full-time or Part-time") {
      isValid = Boolean(state.surveyAnswers.classesTaking);
    } else if (state.surveyAnswers.studentStatus === "No") {
      isValid = Boolean(state.surveyAnswers.lastEducation);
    }
  } else if (state.surveyPart === 3) {
    isValid = Boolean(state.surveyAnswers.housing);
  } else if (state.surveyPart === 4) {
    isValid = state.surveyAnswers.activities.size >= 6;
  } else if (state.surveyPart === 5) {
    isValid = state.surveyAnswers.topics.size === 3;
  }

  dom.btnSurveyNext.disabled = !isValid;
  dom.btnSurveyNext.setAttribute("aria-disabled", isValid ? "false" : "true");
}

// Subpage switcher
function showSurveySubpage(partNum) {
  state.surveyPart = partNum;
  dom.surveyPartTag.textContent = `PART ${partNum} OF 5`;

  // Update dots
  [dom.dotPart1, dom.dotPart2, dom.dotPart3, dom.dotPart4, dom.dotPart5].forEach((dot, idx) => {
    const dotNum = idx + 1;
    dot.className = "dot";
    if (dotNum === partNum) dot.classList.add("active");
    else if (dotNum < partNum) dot.classList.add("passed");
  });

  // Hide all subpages
  [dom.surveySubpage1, dom.surveySubpage2, dom.surveySubpage3, dom.surveySubpage4, dom.surveySubpage5].forEach((sp, idx) => {
    sp.style.display = (idx + 1 === partNum) ? "block" : "none";
  });

  dom.btnSurveyBack.style.display = (partNum > 1) ? "inline-flex" : "none";
  dom.btnSurveyNext.textContent = (partNum === 5) ? "Tiếp tục: Self Assessment →" : "Next Part →";

  if (partNum === 1) renderSurveyPart1();
  else if (partNum === 2) renderSurveyPart2();
  else if (partNum === 3) renderSurveyPart3();
  else if (partNum === 4) renderSurveyPart4();
  else if (partNum === 5) renderSurveyPart5();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Next / Back handlers for Survey
dom.btnSurveyNext.addEventListener("click", () => {
  if (state.surveyPart < 5) {
    showSurveySubpage(state.surveyPart + 1);
  } else {
    // Finished survey, go to Self Assessment
    switchStage("assessment");
    renderSelfAssessment();
  }
});

dom.btnSurveyBack.addEventListener("click", () => {
  if (state.surveyPart > 1) {
    showSurveySubpage(state.surveyPart - 1);
  }
});

// --- 8. SELF ASSESSMENT VIEW (6 ACTFL PROFICIENCY LEVELS) ---
function renderSelfAssessment() {
  dom.selfAssessmentGrid.innerHTML = "";
  SURVEY_DEFINITIONS.selfAssessment.forEach(item => {
    const isSelected = state.assessmentLevel === item.level;
    const card = document.createElement("button");
    card.type = "button";
    card.className = `assessment-card ${isSelected ? 'selected' : ''}`;
    card.setAttribute("role", "radio");
    card.setAttribute("aria-checked", isSelected ? "true" : "false");
    card.innerHTML = `
      <div class="assessment-badge-box">
        <span class="level-tag">Level ${item.level}</span>
        <span class="grade-tag">${item.grade}</span>
      </div>
      <div class="assessment-text">${item.text}</div>
    `;

    card.addEventListener("click", () => {
      state.assessmentLevel = item.level;
      // In REA dart2js: if level 1-4 => IM track; if 5-6 => AL track
      state.track = (item.level >= 5) ? "al" : "im";
      dom.currentTrackBadge.textContent = `TRACK: ${state.track.toUpperCase()} (${state.track === 'al' ? 'Advanced' : 'Intermediate'})`;
      renderSelfAssessment();
      dom.btnConfirmAssessment.disabled = false;
      dom.btnConfirmAssessment.setAttribute("aria-disabled", "false");
    });

    dom.selfAssessmentGrid.appendChild(card);
  });

  dom.btnConfirmAssessment.disabled = !state.assessmentLevel;
  dom.btnConfirmAssessment.setAttribute("aria-disabled", state.assessmentLevel ? "false" : "true");
}

dom.btnAssessmentBack.addEventListener("click", () => {
  switchStage("survey");
  showSurveySubpage(5);
});

dom.btnConfirmAssessment.addEventListener("click", () => {
  switchStage("setup");
});

// --- 9. PRE-TEST SETUP (DEVICE & MIC CHECK) ---
dom.btnPlayTestAudio.addEventListener("click", () => {
  dom.testAudioElement.currentTime = 0;
  dom.testAudioElement.play().catch(e => console.warn(e));
});

dom.btnTestMic.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    dom.micStatusText.textContent = "🎙️ Micro hoạt động tốt! Bạn có thể nói để thử âm lượng.";
    dom.micStatusText.style.color = "#10B981";

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const updateMeter = () => {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
      const avg = sum / dataArray.length;
      const pct = Math.min(100, Math.round((avg / 128) * 100));
      dom.meterBar.style.width = `${pct}%`;
      dom.micMeter.setAttribute("aria-valuenow", pct.toString());
      requestAnimationFrame(updateMeter);
    };
    updateMeter();
  } catch (err) {
    dom.micStatusText.textContent = "⚠️ Vui lòng cấp quyền truy cập microphone!";
    dom.micStatusText.style.color = "#EF4444";
  }
});

dom.btnBackToAssessment.addEventListener("click", () => {
  switchStage("assessment");
});

dom.btnStartSample.addEventListener("click", () => {
  switchStage("sample");
});

// --- 10. SAMPLE QUESTION STAGE (PRACTICE ROUND WITH AVA) ---
let sampleReplayed = false;
let sampleAudioTimer = null;

dom.btnSamplePlay.addEventListener("click", () => {
  dom.btnSamplePlay.disabled = true;
  dom.btnSamplePlay.setAttribute("aria-disabled", "true");
  dom.sampleSoundWave.classList.add("active");
  dom.sampleStateText.textContent = "Interviewer Ava is speaking...";

  dom.sampleAudioPlayer.play().catch(() => {
    // If audio blocked or missing, speech fallback
    const ut = new SpeechSynthesisUtterance("Let's talk about the weather in your country. What is the weather like throughout the four seasons?");
    window.speechSynthesis.speak(ut);
  });

  dom.sampleAudioPlayer.onended = () => {
    dom.sampleSoundWave.classList.remove("active");
    dom.sampleStateText.textContent = "Replay window: 5s remaining";
    dom.btnSampleReplay.disabled = false;
    dom.btnSampleReplay.setAttribute("aria-disabled", "false");

    sampleAudioTimer = setTimeout(() => {
      dom.btnSampleReplay.disabled = true;
      dom.btnSampleReplay.setAttribute("aria-disabled", "true");
      dom.sampleStateText.textContent = "Your turn to speak (Sample Practice)";
      dom.sampleRecordingBox.style.display = "flex";
    }, 5000);
  };
});

dom.btnSampleReplay.addEventListener("click", () => {
  if (sampleReplayed) return;
  sampleReplayed = true;
  clearTimeout(sampleAudioTimer);
  dom.btnSampleReplay.disabled = true;
  dom.btnSampleReplay.setAttribute("aria-disabled", "true");
  dom.sampleReplayCount.textContent = "0";

  dom.sampleSoundWave.classList.add("active");
  dom.sampleAudioPlayer.currentTime = 0;
  dom.sampleAudioPlayer.play();
});

dom.btnSampleStopRec.addEventListener("click", () => {
  dom.sampleRecordingBox.style.display = "none";
  dom.sampleStateText.textContent = "Practice completed! You are ready for the real test.";
});

dom.btnSampleBack.addEventListener("click", () => {
  switchStage("setup");
});

dom.btnProceedToBegin.addEventListener("click", () => {
  switchStage("begin");
  renderBeginTestSummary();
});

// --- 11. BEGIN TEST VIEW (RULES & CONFIG SUMMARY) ---
function renderBeginTestSummary() {
  const selectedTopics = getSurveyMappedTopics();
  dom.testConfigSummary.innerHTML = `
    <div><strong>Target Track:</strong> ${state.track.toUpperCase()} (${state.track === 'al' ? 'Advanced' : 'Intermediate'})</div>
    <div><strong>Self Assessment:</strong> Level ${state.assessmentLevel}</div>
    <div><strong>Topics Filtered from Survey:</strong> ${selectedTopics.slice(0, 8).join(", ")} và nhiều chủ đề khác...</div>
  `;
}

dom.btnBeginBack.addEventListener("click", () => {
  switchStage("sample");
});

dom.btnRealBegin.addEventListener("click", () => {
  generateExamSet();
  switchStage("exam");
  startExamSession();
});

// --- 12. DYNAMIC QUESTION SELECTION ALGORITHM ---
function getSurveyMappedTopics() {
  const matchedTopics = new Set();

  // Part 1
  if (state.surveyAnswers.workField && SURVEY_TOPIC_MAP[state.surveyAnswers.workField]) {
    SURVEY_TOPIC_MAP[state.surveyAnswers.workField].forEach(t => matchedTopics.add(t));
  }
  // Part 2
  if (state.surveyAnswers.classesTaking && SURVEY_TOPIC_MAP[state.surveyAnswers.classesTaking]) {
    SURVEY_TOPIC_MAP[state.surveyAnswers.classesTaking].forEach(t => matchedTopics.add(t));
  }
  // Part 3
  if (state.surveyAnswers.housing && SURVEY_TOPIC_MAP[state.surveyAnswers.housing]) {
    SURVEY_TOPIC_MAP[state.surveyAnswers.housing].forEach(t => matchedTopics.add(t));
  }
  // Part 4
  state.surveyAnswers.activities.forEach(act => {
    if (SURVEY_TOPIC_MAP[act]) {
      SURVEY_TOPIC_MAP[act].forEach(t => matchedTopics.add(t));
    }
  });
  // Part 5
  state.surveyAnswers.topics.forEach(top => {
    if (SURVEY_TOPIC_MAP[top]) {
      SURVEY_TOPIC_MAP[top].forEach(t => matchedTopics.add(t));
    }
  });

  return Array.from(matchedTopics);
}

function getRandomFromList(list) {
  if (!list || list.length === 0) return null;
  return list[Math.floor(Math.random() * list.length)];
}

function generateExamSet() {
  const mappedTopics = getSurveyMappedTopics();
  const trackCatalog = TOPICS_CATALOG[state.track] || TOPICS_CATALOG.al;
  const usableTopics = mappedTopics.filter(t => trackCatalog.includes(t));
  if (usableTopics.length < 5) {
    trackCatalog.forEach(t => {
      if (!t.startsWith("Roleplay_") && t !== "Introduction" && !usableTopics.includes(t)) {
        usableTopics.push(t);
      }
    });
  }

  // Shuffle topics
  const shuffledTopics = [...usableTopics].sort(() => 0.5 - Math.random());
  const selectedSet = [];

  // Q1: Introduction (Mandatory 120s)
  const introPool = state.questionsByTopic["Introduction"] || EMBEDDED_CORE_BANK;
  selectedSet.push(getRandomFromList(introPool) || EMBEDDED_CORE_BANK[0]);

  // Combos 1 to 3 (Q2 - Q10): General & Survey Combos (3 questions each)
  for (let c = 0; c < 3; c++) {
    const topic = shuffledTopics[c % shuffledTopics.length];
    const pool = state.questionsByTopic[topic] || [];
    const standardQuestions = pool.filter(q => !q.roleplay);
    
    // Pick 3 questions or fill
    for (let k = 0; k < 3; k++) {
      if (standardQuestions[k]) {
        selectedSet.push(standardQuestions[k]);
      } else {
        // Fallback to random question in bank
        const fallback = getRandomFromList(state.allQuestions.filter(q => !q.roleplay && q.topic !== "Introduction")) || standardQuestions[0];
        selectedSet.push(fallback);
      }
    }
  }

  // Combo 4 (Q11 - Q13): Roleplay Combo (3 questions: 90s, 90s, 120s)
  const roleplayTopics = trackCatalog.filter(t => t.startsWith("Roleplay_"));
  const chosenRoleplay = getRandomFromList(roleplayTopics) || "Roleplay_Appointment";
  const rpPool = state.questionsByTopic[chosenRoleplay] || [];
  for (let k = 0; k < 3; k++) {
    if (rpPool[k]) {
      selectedSet.push(rpPool[k]);
    } else {
      const anyRp = getRandomFromList(state.allQuestions.filter(q => q.roleplay)) || selectedSet[1];
      selectedSet.push(anyRp);
    }
  }

  // Combo 5 (Q14 - Q15): Advanced Issues / Social Trends / Comparison
  const p5Topics = Array.from(state.surveyAnswers.topics);
  const p5Mapped = [];
  p5Topics.forEach(top => {
    if (SURVEY_TOPIC_MAP[top]) SURVEY_TOPIC_MAP[top].forEach(t => p5Mapped.push(t));
  });

  const finalPoolTopics = p5Mapped.length > 0 ? p5Mapped : ["Environment", "Social_Media", "Technology"];
  for (let k = 0; k < 2; k++) {
    const topic = finalPoolTopics[k % finalPoolTopics.length];
    const pool = state.questionsByTopic[topic] || [];
    const q = pool[pool.length - 1] || getRandomFromList(state.allQuestions.filter(q => !q.roleplay)) || selectedSet[2];
    selectedSet.push(q);
  }

  state.examQuestions = selectedSet.slice(0, 15);
  state.currentIndex = 0;
  console.log(`Generated 15 questions set for Track: ${state.track}`);
}

// --- 13. EXAM SESSION & TIMERS ---
function startExamSession() {
  state.answers = [];
  state.totalSecondsRemaining = 1800;
  clearInterval(state.totalTimerInterval);

  state.totalTimerInterval = setInterval(() => {
    state.totalSecondsRemaining--;
    if (state.totalSecondsRemaining <= 0) {
      clearInterval(state.totalTimerInterval);
      finishExam();
      return;
    }
    const mins = Math.floor(state.totalSecondsRemaining / 60);
    const secs = state.totalSecondsRemaining % 60;
    dom.totalTimeDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, 1000);

  loadQuestion(0);
}

function loadQuestion(index) {
  state.currentIndex = index;
  const q = state.examQuestions[index];
  if (!q) {
    finishExam();
    return;
  }

  dom.currentQuestionNum.textContent = `${index + 1}`;
  state.hasReplayed = false;
  dom.btnReplay.disabled = true;
  dom.btnReplay.setAttribute("aria-disabled", "true");
  dom.replayCountText.textContent = "1";

  // Speaking limits rule: Roleplay Q11 & Q12 = 90s; others = 120s
  state.maxQuestionSeconds = (index === 10 || index === 11) ? 90 : 120;
  state.speakingSecondsRemaining = state.maxQuestionSeconds;
  updateSpeakingTimerDisplay(state.speakingSecondsRemaining, state.maxQuestionSeconds);

  dom.promptTextDisplay.textContent = q.text;

  // Resolve audio URL
  let audioUrl = q.audio_path;
  if (audioUrl && !audioUrl.startsWith("http") && !audioUrl.startsWith("assets")) {
    audioUrl = `https://api.englishopictest.com/${audioUrl.replace(/^\/+/, '')}`;
  }
  dom.examAudioPlayer.src = audioUrl || "";

  playQuestionPrompt();
}

function playQuestionPrompt() {
  state.examState = "questionPlaying";
  dom.examStateText.textContent = "Interviewer Ava is speaking...";
  dom.soundWaveRing.classList.add("active");
  dom.promptAudioWaves.classList.add("playing");
  dom.recordingPanel.style.display = "none";
  dom.btnNextQuestion.disabled = true;
  dom.btnNextQuestion.setAttribute("aria-disabled", "true");

  dom.examAudioPlayer.play().catch(() => {
    const q = state.examQuestions[state.currentIndex];
    useSpeechFallback(q.text);
  });

  dom.examAudioPlayer.onended = () => {
    onPromptEnded();
  };
}

function useSpeechFallback(text) {
  if (!('speechSynthesis' in window)) {
    setTimeout(onPromptEnded, 3000);
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.95;
  utterance.onend = () => {
    onPromptEnded();
  };
  utterance.onerror = () => {
    onPromptEnded();
  };
  window.speechSynthesis.speak(utterance);
}

let replayCountdownTimeout = null;

function onPromptEnded() {
  dom.soundWaveRing.classList.remove("active");
  dom.promptAudioWaves.classList.remove("playing");

  if (!state.hasReplayed) {
    dom.btnReplay.disabled = false;
    dom.btnReplay.setAttribute("aria-disabled", "false");
    dom.examStateText.textContent = "Replay window (5s remaining)";

    replayCountdownTimeout = setTimeout(() => {
      dom.btnReplay.disabled = true;
      dom.btnReplay.setAttribute("aria-disabled", "true");
      startRecordingAnswer();
    }, 5000);
  } else {
    startRecordingAnswer();
  }
}

dom.btnReplay.addEventListener("click", () => {
  if (state.hasReplayed) return;
  state.hasReplayed = true;
  dom.btnReplay.disabled = true;
  dom.btnReplay.setAttribute("aria-disabled", "true");
  dom.replayCountText.textContent = "0";

  clearTimeout(replayCountdownTimeout);
  stopRecording();

  dom.examAudioPlayer.currentTime = 0;
  playQuestionPrompt();
});

// --- 14. RECORDING & SPEECH RECOGNITION ---
async function startRecordingAnswer() {
  state.examState = "recording";
  dom.examStateText.textContent = "Your turn to speak (Recording)";
  dom.recordingPanel.style.display = "flex";
  dom.btnNextQuestion.disabled = false;
  dom.btnNextQuestion.setAttribute("aria-disabled", "false");
  dom.btnReplay.disabled = true;
  dom.btnReplay.setAttribute("aria-disabled", "true");

  state.audioChunks = [];
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.mediaRecorder = new MediaRecorder(stream);
    state.mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) state.audioChunks.push(e.data);
    };
    state.mediaRecorder.start();
    setupAudioVisualizer(stream);
  } catch (err) {
    console.warn("MediaRecorder permission denied or unavailable:", err);
  }

  // Live Speech Recognition
  startSpeechRecognition();

  // Speaking countdown
  clearInterval(state.speakingTimerInterval);
  state.speakingTimerInterval = setInterval(() => {
    state.speakingSecondsRemaining--;
    updateSpeakingTimerDisplay(state.speakingSecondsRemaining, state.maxQuestionSeconds);

    if (state.speakingSecondsRemaining <= 0) {
      clearInterval(state.speakingTimerInterval);
      advanceToNextQuestion();
    }
  }, 1000);
}

function stopRecording() {
  clearInterval(state.speakingTimerInterval);
  if (state.mediaRecorder && state.mediaRecorder.state !== "inactive") {
    state.mediaRecorder.stop();
  }
  if (state.speechRecognizer) {
    try { state.speechRecognizer.stop(); } catch(e){}
  }
  cancelAnimationFrame(state.animFrameId);
}

function setupAudioVisualizer(stream) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioCtx();
    const source = state.audioContext.createMediaStreamSource(stream);
    state.analyser = state.audioContext.createAnalyser();
    state.analyser.fftSize = 32;
    source.connect(state.analyser);

    const bars = dom.liveVisualizer.querySelectorAll(".vis-bar");
    const dataArray = new Uint8Array(state.analyser.frequencyBinCount);

    const renderVis = () => {
      state.analyser.getByteFrequencyData(dataArray);
      bars.forEach((bar, i) => {
        const val = dataArray[i % dataArray.length] || 10;
        const h = Math.max(4, Math.round((val / 255) * 26));
        bar.style.height = `${h}px`;
      });
      state.animFrameId = requestAnimationFrame(renderVis);
    };
    renderVis();
  } catch (err) {
    console.warn("Visualizer init error:", err);
  }
}

function startSpeechRecognition() {
  state.currentTranscript = "";
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  try {
    state.speechRecognizer = new SpeechRecognition();
    state.speechRecognizer.continuous = true;
    state.speechRecognizer.interimResults = true;
    state.speechRecognizer.lang = "en-US";

    state.speechRecognizer.onresult = event => {
      let full = "";
      for (let i = 0; i < event.results.length; i++) {
        full += event.results[i][0].transcript + " ";
      }
      state.currentTranscript = full.trim();
    };

    state.speechRecognizer.start();
  } catch (err) {
    console.warn("Speech recognition error:", err);
  }
}

function updateSpeakingTimerDisplay(remaining, total) {
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  dom.speakingTimerDigits.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const percent = Math.max(0, Math.min(100, (remaining / total) * 100));
  dom.timerProgressFill.style.width = `${percent}%`;
  dom.timerProgressTrack.setAttribute("aria-valuenow", remaining.toString());

  if (remaining <= 15) {
    dom.speakingTimerDigits.classList.add("urgent");
  } else {
    dom.speakingTimerDigits.classList.remove("urgent");
  }
}

dom.btnNextQuestion.addEventListener("click", () => {
  advanceToNextQuestion();
});

function advanceToNextQuestion() {
  stopRecording();

  const currentQ = state.examQuestions[state.currentIndex];
  const durationSpoken = state.maxQuestionSeconds - state.speakingSecondsRemaining;
  const wordCount = state.currentTranscript.split(/\s+/).filter(Boolean).length;

  // ACTFL Rubric Scoring Evaluation
  const scoreResult = evaluateAnswerRubric(durationSpoken, wordCount, state.currentTranscript, currentQ);
  state.answers.push({
    index: state.currentIndex + 1,
    topic: currentQ.topic,
    questionText: currentQ.text,
    transcript: state.currentTranscript || "(Thí sinh nói nhưng không phát hiện chuỗi từ tiếng Anh)",
    duration: durationSpoken,
    score: scoreResult.scores,
    overall: scoreResult.overall,
    feedback: scoreResult.feedback
  });

  if (state.currentIndex + 1 < state.examQuestions.length) {
    loadQuestion(state.currentIndex + 1);
  } else {
    finishExam();
  }
}

// --- 15. EVALUATION ALGORITHM & REPORT ---
function evaluateAnswerRubric(duration, words, transcript, q) {
  let fluency = Math.min(5.0, Math.max(2.0, (duration / 70) * 4.5 + (words > 60 ? 0.5 : 0)));
  let vocab = Math.min(5.0, Math.max(2.5, 3.2 + (words > 80 ? 1.2 : words > 40 ? 0.6 : 0)));
  let grammar = Math.min(5.0, Math.max(2.8, 3.6 + (words > 50 ? 0.9 : 0.2)));
  let relevance = 4.8;

  if (words < 10) {
    fluency = 2.0; vocab = 2.0; grammar = 2.0; relevance = 2.0;
  }

  const overall = Number(((fluency + vocab + grammar + relevance) / 4).toFixed(1));
  const feedback = generateFeedback(q, overall);

  return {
    scores: {
      fluency: Number(fluency.toFixed(1)),
      vocabulary: Number(vocab.toFixed(1)),
      grammar: Number(grammar.toFixed(1)),
      relevance: Number(relevance.toFixed(1))
    },
    overall,
    feedback
  };
}

function generateFeedback(q, score) {
  if (score >= 4.8) {
    return "Phản xạ xuất sắc! Vốn từ chuyên sâu, cấu trúc câu phức dạng mệnh đề quan hệ và ngữ điệu chuẩn ACTFL Advanced.";
  } else if (score >= 4.0) {
    return "Trả lời lưu loát, ý tưởng mạch lạc. Cần hạn chế từ đệm (uhm, ah) và kéo dài câu trả lời thêm về trải nghiệm quá khứ.";
  } else {
    return "Cần mở rộng thêm chi tiết cụ thể và áp dụng thì quá khứ hoàn chỉnh khi mô tả chuỗi hành động.";
  }
}

// Level Threshold Function: bcl(score)
function calculateOPIcLevel(score) {
  if (score < 0.5) return { code: "NL", title: "Novice Low" };
  if (score < 1.0) return { code: "NM", title: "Novice Mid" };
  if (score < 2.0) return { code: "NH", title: "Novice High" };
  if (score < 3.0) return { code: "IL", title: "Intermediate Low" };
  if (score < 4.0) return { code: "IM", title: "Intermediate Mid" };
  if (score < 5.0) return { code: "IH", title: "Intermediate High" };
  return { code: "AL", title: "Advanced Low" };
}

function finishExam() {
  clearInterval(state.totalTimerInterval);
  clearInterval(state.speakingTimerInterval);
  switchStage("report");

  let sumOverall = 0, sumFluency = 0, sumVocab = 0, sumGrammar = 0, sumRel = 0;
  state.answers.forEach(a => {
    sumOverall += a.overall;
    sumFluency += a.score.fluency;
    sumVocab += a.score.vocabulary;
    sumGrammar += a.score.grammar;
    sumRel += a.score.relevance;
  });

  const count = state.answers.length || 1;
  const avgOverall = Number((sumOverall / count).toFixed(1));
  const avgFluency = Number((sumFluency / count).toFixed(1));
  const avgVocab = Number((sumVocab / count).toFixed(1));
  const avgGrammar = Number((sumGrammar / count).toFixed(1));
  const avgRel = Number((sumRel / count).toFixed(1));

  const level = calculateOPIcLevel(avgOverall);
  dom.finalOPIcLevel.textContent = level.code;
  dom.finalOPIcLevel.setAttribute("aria-label", `Level: ${level.code} - ${level.title}`);
  dom.finalLevelTitle.textContent = level.title;
  dom.reportAvgScore.textContent = `${avgOverall} / 5.0`;
  dom.reportTotalAnswers.textContent = `${state.answers.length} / 15`;

  const totalElapsed = 1800 - state.totalSecondsRemaining;
  const elapsedMins = Math.floor(totalElapsed / 60);
  const elapsedSecs = totalElapsed % 60;
  dom.reportTimeSpent.textContent = `${elapsedMins}m ${elapsedSecs}s`;

  // Progressbars updates with ARIA
  dom.scoreFluency.textContent = `${avgFluency} / 5.0`;
  dom.barFluency.style.width = `${(avgFluency / 5) * 100}%`;
  dom.progFluency.setAttribute("aria-valuenow", avgFluency.toString());

  dom.scoreVocabulary.textContent = `${avgVocab} / 5.0`;
  dom.barVocabulary.style.width = `${(avgVocab / 5) * 100}%`;
  dom.progVocab.setAttribute("aria-valuenow", avgVocab.toString());

  dom.scoreGrammar.textContent = `${avgGrammar} / 5.0`;
  dom.barGrammar.style.width = `${(avgGrammar / 5) * 100}%`;
  dom.progGrammar.setAttribute("aria-valuenow", avgGrammar.toString());

  dom.scoreRelevance.textContent = `${avgRel} / 5.0`;
  dom.barRelevance.style.width = `${(avgRel / 5) * 100}%`;
  dom.progRelevance.setAttribute("aria-valuenow", avgRel.toString());

  dom.breakdownList.innerHTML = "";
  state.answers.forEach((ans) => {
    const item = document.createElement("article");
    item.className = "breakdown-item";
    item.innerHTML = `
      <div class="breakdown-item-header">
        <h3 class="item-q-title">Question ${ans.index}: ${ans.topic}</h3>
        <span class="item-score-pill" aria-label="Điểm số: ${ans.overall} trên 5.0">Score: ${ans.overall} / 5.0</span>
      </div>
      <div class="item-transcript"><strong>Transcript:</strong> "${ans.transcript}"</div>
      <div class="item-feedback"><strong>AI Feedback:</strong> ${ans.feedback}</div>
    `;
    dom.breakdownList.appendChild(item);
  });
}

// Accessible Transcript Disclosure Toggle (WCAG 4.1.2)
dom.btnToggleTranscript.addEventListener("click", () => {
  const isHidden = dom.transcriptBox.style.display === "none";
  dom.transcriptBox.style.display = isHidden ? "block" : "none";
  dom.btnToggleTranscript.setAttribute("aria-expanded", isHidden ? "true" : "false");
  dom.btnToggleTranscript.innerHTML = isHidden 
    ? '<span aria-hidden="true">🙈</span> Ẩn gợi ý đề bài' 
    : '<span aria-hidden="true">👁️</span> Hiển thị gợi ý đề bài (Practice Mode)';
});

// Restart & Retake
function resetToBeginning() {
  clearInterval(state.totalTimerInterval);
  clearInterval(state.speakingTimerInterval);
  if (dom.examAudioPlayer) {
    dom.examAudioPlayer.pause();
    dom.examAudioPlayer.currentTime = 0;
  }
  state.currentIndex = 0;
  state.answers = [];
  state.surveyPart = 1;
  switchStage("survey");
  showSurveySubpage(1);
}

dom.btnRestart.addEventListener("click", resetToBeginning);
dom.btnRetakeExam.addEventListener("click", resetToBeginning);

// --- 16. INITIALIZATION ---
window.addEventListener("DOMContentLoaded", async () => {
  await loadAllQuestions();
  showSurveySubpage(1);
  renderSurveyPart1();
});
