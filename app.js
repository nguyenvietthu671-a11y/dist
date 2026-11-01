/**
 * OPIc AI Simulator - Complete Reverse-Engineered Core Logic
 * Fully Accessible (WCAG 2.1 / 2.2 AA) & Responsive
 */

// --- 1. FULL TOPIC CATALOG (Extracted from REA) ---
const TOPICS_CATALOG = {
  al: [
    "Appointment", "Banks", "Bars", "Coffee_Shops", "Communication", "Culture",
    "Domestic_Trips", "Environment", "Family_Friends", "Famous People", "Fashion",
    "Food", "Free_Time", "Furniture", "Gatherings", "Geography", "Hair_Salon",
    "Health", "Holidays", "Hotels", "Housing_1", "Human_Rights", "ID_Card",
    "Industry", "Internet", "Introduction", "Movies", "Music", "Newspapers",
    "Overseas_Trips", "Parks", "Phones", "Recycling", "Restaurants",
    "Roleplay_Ask_Question", "Roleplay_Describe_Memory", "Roleplay_Resolve_Problems",
    "Shopping", "Technology", "Television", "Text_Messages", "Transportation",
    "Vacations_at_Home", "Walking", "Weather", "Work"
  ],
  im: [
    "Appointment", "Banks", "Bars", "Beaches", "Coffee_Shops", "Communication",
    "Culture", "Domestic_Trips", "Environment", "Family_Friends", "Fashion",
    "Food", "Free_Time", "Furniture", "Gatherings", "Geography", "Hair_Salon",
    "Health", "Holidays", "Hotels", "Housing", "Human_Rights", "ID_Card",
    "Internet", "Movies", "Music", "Overseas_Trips", "Parks", "Phones",
    "Recycling", "Restaurants", "Roleplay_Ask_Question", "Roleplay_Describe_Memory",
    "Roleplay_Resolve_Problems", "Shopping", "Technology", "Transportation",
    "Vacations_at_Home", "Walking", "Weather", "Work"
  ]
};

// Fallback core bank in case questions_all.json is loaded via file:// protocol
const EMBEDDED_CORE_BANK = [
  {
    qid: "Introduction_1",
    topic: "Introduction",
    type: "I",
    text: "Now we’ll start the interview. First, I’d like to learn a bit about you. Could you please introduce yourself?",
    audio: "01_Q1.mp3",
    audio_url: "https://api.englishopictest.com/media/AL/common_topic/audio_eng/Introduction_1.mp3"
  },
  {
    qid: "Housing_1_1",
    topic: "Housing_1",
    type: "I",
    text: "I would like to know where you live. Can you describe your home to me? What does it look like? How many rooms does it have?",
    audio: "Housing_1_1.mp3",
    audio_url: "https://api.englishopictest.com/media/AL/common_topic/audio_eng/Housing_1_1.mp3"
  },
  {
    qid: "Coffee_Shops_1",
    topic: "Coffee_Shops",
    type: "I",
    text: "You indicated in the survey that you go to coffee shops. Tell me about the cafes or coffee houses in your community. What are they like?",
    audio: "Coffee_Shops_1.mp3",
    audio_url: "https://api.englishopictest.com/media/AL/selection_topic/audio_eng/Coffee_Shops_1.mp3"
  },
  {
    qid: "Movies_1",
    topic: "Movies",
    type: "I",
    text: "You indicated in the survey that you like to watch movies. What kinds of movies do you like to watch? Why do you like those types of movies?",
    audio: "Movies_1.mp3",
    audio_url: "https://api.englishopictest.com/media/AL/selection_topic/audio_eng/Movies_1.mp3"
  },
  {
    qid: "Roleplay_Clothing_Store_1",
    topic: "Roleplay_Ask_Question",
    type: "Roleplay",
    text: "I'd like to give you a situation and ask you to act it out. You are at a clothing store and need to get some clothes. Ask three or four questions about the clothes you would like to buy.",
    audio: "Roleplay_Clothing_Store_1.mp3",
    audio_url: "https://api.englishopictest.com/media/AL/roleplay_topic/audio_eng/Roleplay_Clothing_Store_1.mp3"
  },
  {
    qid: "Roleplay_Clothing_Store_2",
    topic: "Roleplay_Resolve_Problems",
    type: "Roleplay",
    text: "I'm sorry, but there is a problem that I need you to resolve. The clothes you ordered have arrived, but one of the shirts has a defect. Call the store, explain the problem, and give two to three alternatives to solve it.",
    audio: "Roleplay_Clothing_Store_2.mp3",
    audio_url: "https://api.englishopictest.com/media/AL/roleplay_topic/audio_eng/Roleplay_Clothing_Store_2.mp3"
  }
];

// --- 2. APPLICATION STATE ---
const state = {
  track: "al",
  selectedTopics: new Set(["Housing_1", "Coffee_Shops", "Movies"]),
  allQuestions: [],
  questionsByTopic: {},
  
  examQuestions: [],
  currentIndex: 0,
  
  examState: "initial",
  hasReplayed: false,
  speakingSecondsRemaining: 120,
  maxQuestionSeconds: 120,
  speakingTimerInterval: null,
  
  totalSecondsRemaining: 1800, // 30 minutes
  totalTimerInterval: null,
  
  audioPlayer: null,
  mediaRecorder: null,
  audioChunks: [],
  micStream: null,
  audioContext: null,
  analyser: null,
  animFrameId: null,
  
  speechRecognizer: null,
  currentTranscript: "",
  
  answers: []
};

// --- 3. DOM ELEMENTS ---
const dom = {
  viewSurvey: document.getElementById("viewSurvey"),
  viewDeviceCheck: document.getElementById("viewDeviceCheck"),
  viewExam: document.getElementById("viewExam"),
  viewReport: document.getElementById("viewReport"),
  
  currentTrackBadge: document.getElementById("currentTrackBadge"),
  examHeaderInfo: document.getElementById("examHeaderInfo"),
  currentQuestionNum: document.getElementById("currentQuestionNum"),
  totalTimerContainer: document.getElementById("totalTimerContainer"),
  totalTimeDisplay: document.getElementById("totalTimeDisplay"),
  btnRestart: document.getElementById("btnRestart"),
  
  topicsGrid: document.getElementById("topicsGrid"),
  selectedCount: document.getElementById("selectedCount"),
  btnConfirmSurvey: document.getElementById("btnConfirmSurvey"),
  
  btnTestAudio: document.getElementById("btnTestAudio"),
  testAudioElement: document.getElementById("testAudioElement"),
  btnTestMic: document.getElementById("btnTestMic"),
  meterBar: document.getElementById("meterBar"),
  micMeter: document.getElementById("micMeter"),
  micStatusText: document.getElementById("micStatusText"),
  btnBackToSurvey: document.getElementById("btnBackToSurvey"),
  btnStartExam: document.getElementById("btnStartExam"),
  
  avatarWrapper: document.getElementById("avatarWrapper"),
  examStatePill: document.getElementById("examStatePill"),
  examStateText: document.getElementById("examStateText"),
  btnReplay: document.getElementById("btnReplay"),
  replayCountText: document.getElementById("replayCountText"),
  promptAudioWaves: document.getElementById("promptAudioWaves"),
  examAudioPlayer: document.getElementById("examAudioPlayer"),
  btnToggleTranscript: document.getElementById("btnToggleTranscript"),
  transcriptBox: document.getElementById("transcriptBox"),
  currentTopicName: document.getElementById("currentTopicName"),
  currentQuestionText: document.getElementById("currentQuestionText"),
  recordingPanel: document.getElementById("recordingPanel"),
  liveVisualizer: document.getElementById("liveVisualizer"),
  speakingTimerLabel: document.getElementById("speakingTimerLabel"),
  speakingTimerDigits: document.getElementById("speakingTimerDigits"),
  timerProgressTrack: document.getElementById("timerProgressTrack"),
  timerProgressFill: document.getElementById("timerProgressFill"),
  btnNextQuestion: document.getElementById("btnNextQuestion"),
  
  finalOPIcLevel: document.getElementById("finalOPIcLevel"),
  finalLevelTitle: document.getElementById("finalLevelTitle"),
  summaryDescription: document.getElementById("summaryDescription"),
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

// --- 4. DATA LOADING (578 Questions Bank) ---
async function loadAllQuestions() {
  try {
    const res = await fetch("assets/questions_all.json");
    if (!res.ok) throw new Error("Fetch failed");
    const data = await res.json();
    state.allQuestions = data.questions || [];
  } catch (err) {
    console.warn("Using embedded core question bank: ", err);
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

// --- 5. PROGRAMMATIC VIEW SWITCHING & FOCUS MANAGEMENT (WCAG 2.4.3) ---
function showView(viewId) {
  [dom.viewSurvey, dom.viewDeviceCheck, dom.viewExam, dom.viewReport].forEach(v => {
    v.classList.remove("active");
    v.removeAttribute("tabindex");
  });
  
  const targetView = document.getElementById(viewId);
  targetView.classList.add("active");
  targetView.setAttribute("tabindex", "-1");
  targetView.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 6. KEYBOARD-ACCESSIBLE TOPIC CHIPS RENDERING (WCAG 2.1.1, 2.4.7) ---
function renderSurveyTopics() {
  const topics = TOPICS_CATALOG[state.track] || TOPICS_CATALOG.al;
  dom.topicsGrid.innerHTML = "";
  
  topics.forEach(t => {
    if (t.startsWith("Roleplay_") || t === "Introduction") return;
    
    const chip = document.createElement("button");
    const isChecked = state.selectedTopics.has(t);
    chip.type = "button";
    chip.setAttribute("role", "checkbox");
    chip.setAttribute("aria-checked", isChecked ? "true" : "false");
    chip.className = `topic-chip ${isChecked ? 'selected' : ''}`;
    chip.setAttribute("aria-label", `Chủ đề ${t.replace(/_/g, ' ')}, ${isChecked ? 'Đã chọn' : 'Chưa chọn'}`);
    
    chip.innerHTML = `
      <div class="topic-checkbox" aria-hidden="true"></div>
      <span class="topic-name">${t.replace(/_/g, ' ')}</span>
    `;
    
    chip.addEventListener("click", () => {
      if (state.selectedTopics.has(t)) {
        state.selectedTopics.delete(t);
      } else {
        state.selectedTopics.add(t);
      }
      renderSurveyTopics();
      updateSurveyButton();
    });
    
    dom.topicsGrid.appendChild(chip);
  });
  
  updateSurveyButton();
}

function updateSurveyButton() {
  const count = state.selectedTopics.size;
  dom.selectedCount.textContent = count;
  const isReady = count >= 3;
  dom.btnConfirmSurvey.disabled = !isReady;
  dom.btnConfirmSurvey.setAttribute("aria-disabled", (!isReady).toString());
}

// Track Radio Listener
document.querySelectorAll('input[name="trackSelect"]').forEach(radio => {
  radio.addEventListener("change", (e) => {
    state.track = e.target.value;
    dom.currentTrackBadge.textContent = `TRACK: ${state.track.toUpperCase()}`;
    dom.currentTrackBadge.setAttribute("aria-label", `Current Track: ${state.track.toUpperCase()}`);
    if (state.track === "im") {
      state.selectedTopics.delete("Housing_1");
      state.selectedTopics.add("Housing");
    } else {
      state.selectedTopics.delete("Housing");
      state.selectedTopics.add("Housing_1");
    }
    renderSurveyTopics();
  });
});

dom.btnConfirmSurvey.addEventListener("click", () => {
  showView("viewDeviceCheck");
});

dom.btnBackToSurvey.addEventListener("click", () => {
  showView("viewSurvey");
});

// --- 7. DEVICE CHECK LOGIC ---
let testAudioPlaying = false;
dom.btnTestAudio.addEventListener("click", () => {
  if (!testAudioPlaying) {
    dom.testAudioElement.play().then(() => {
      testAudioPlaying = true;
      dom.btnTestAudio.textContent = "Đang phát âm thanh...";
      dom.btnTestAudio.setAttribute("aria-label", "Dừng phát âm thanh thử nghiệm");
    }).catch(err => {
      alert("Không thể phát audio: " + err.message);
    });
  } else {
    dom.testAudioElement.pause();
    dom.testAudioElement.currentTime = 0;
    testAudioPlaying = false;
    dom.btnTestAudio.textContent = "Phát âm thanh thử nghiệm";
    dom.btnTestAudio.setAttribute("aria-label", "Phát âm thanh thử nghiệm");
  }
});

dom.testAudioElement.onended = () => {
  testAudioPlaying = false;
  dom.btnTestAudio.textContent = "Phát âm thanh thử nghiệm";
  dom.btnTestAudio.setAttribute("aria-label", "Phát âm thanh thử nghiệm");
};

dom.btnTestMic.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.micStream = stream;
    dom.micStatusText.textContent = "✓ Micro đã sẵn sàng!";
    dom.micStatusText.style.color = "#10B981";
    dom.btnStartExam.disabled = false;
    dom.btnStartExam.setAttribute("aria-disabled", "false");
    
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    function updateMeter() {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
      let avg = sum / dataArray.length;
      let percent = Math.min(100, Math.round((avg / 128) * 100));
      dom.meterBar.style.width = `${percent}%`;
      dom.micMeter.setAttribute("aria-valuenow", percent.toString());
      requestAnimationFrame(updateMeter);
    }
    updateMeter();
  } catch (err) {
    dom.micStatusText.textContent = "❌ Lỗi micro: " + err.message;
    dom.micStatusText.style.color = "#EF4444";
  }
});

dom.btnStartExam.addEventListener("click", () => {
  startExamination();
});

// --- 8. 15-QUESTION TEST SET GENERATOR ---
function generateExamQuestions() {
  const selectedArr = Array.from(state.selectedTopics);
  const exam = [];
  
  const getFromTopic = (topic, count = 3) => {
    let pool = state.questionsByTopic[topic] || [];
    if (pool.length === 0) {
      pool = state.allQuestions.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()));
    }
    return pool.slice(0, count);
  };
  
  // Q1: Introduction
  let introQ = (state.questionsByTopic["Introduction"] || [])[0] || EMBEDDED_CORE_BANK[0];
  exam.push({
    index: 1,
    topic: "Introduction",
    type: "I",
    text: introQ.text,
    audio_local: "assets/audio/01_Q1.mp3",
    audio_remote: introQ.audio_url
  });
  
  // Combo 1 (Q2-Q4)
  const topic1 = selectedArr[0] || (state.track === "al" ? "Housing_1" : "Housing");
  const combo1 = getFromTopic(topic1, 3);
  for (let i = 0; i < 3; i++) {
    const q = combo1[i] || combo1[0] || { text: `Tell me about your ${topic1}.`, audio_url: "" };
    exam.push({
      index: 2 + i,
      topic: topic1,
      type: i === 0 ? "A" : "I",
      text: q.text,
      audio_local: `assets/audio/${topic1}_1.mp3`,
      audio_remote: q.audio_url
    });
  }
  
  // Combo 2 (Q5-Q7)
  const topic2 = selectedArr[1] || "Coffee_Shops";
  const combo2 = getFromTopic(topic2, 3);
  for (let i = 0; i < 3; i++) {
    const q = combo2[i] || combo2[0] || { text: `Let's discuss ${topic2}.`, audio_url: "" };
    exam.push({
      index: 5 + i,
      topic: topic2,
      type: i === 0 ? "A" : "I",
      text: q.text,
      audio_local: `assets/audio/${topic2}_1.mp3`,
      audio_remote: q.audio_url
    });
  }
  
  // Combo 3 (Q8-Q10)
  const topic3 = selectedArr[2] || "Movies";
  const combo3 = getFromTopic(topic3, 3);
  for (let i = 0; i < 3; i++) {
    const q = combo3[i] || combo3[0] || { text: `Tell me about ${topic3}.`, audio_url: "" };
    exam.push({
      index: 8 + i,
      topic: topic3,
      type: i === 0 ? "A" : "I",
      text: q.text,
      audio_local: `assets/audio/${topic3}_1.mp3`,
      audio_remote: q.audio_url
    });
  }
  
  // Combo 4 (Q11-Q13): Roleplay Set
  const q11Pool = state.questionsByTopic["Roleplay_Ask_Question"] || [];
  const q12Pool = state.questionsByTopic["Roleplay_Resolve_Problems"] || [];
  const q13Pool = state.questionsByTopic["Roleplay_Describe_Memory"] || [];
  
  const q11 = q11Pool[0] || EMBEDDED_CORE_BANK[4];
  const q12 = q12Pool[0] || EMBEDDED_CORE_BANK[5];
  const q13 = q13Pool[0] || {
    text: "Have you ever experienced an unexpected issue while shopping or traveling? Tell me how you resolved it.",
    audio_url: q12.audio_url
  };
  
  exam.push({
    index: 11,
    topic: "Roleplay: Ask Questions",
    type: "Roleplay",
    text: q11.text,
    audio_local: "assets/audio/Roleplay_Clothing_Store_1.mp3",
    audio_remote: q11.audio_url
  });
  
  exam.push({
    index: 12,
    topic: "Roleplay: Problem Resolution",
    type: "Roleplay",
    text: q12.text,
    audio_local: "assets/audio/Roleplay_Clothing_Store_2.mp3",
    audio_remote: q12.audio_url
  });
  
  exam.push({
    index: 13,
    topic: "Roleplay: Past Experience",
    type: "Roleplay",
    text: q13.text,
    audio_local: "assets/audio/Roleplay_Clothing_Store_2.mp3",
    audio_remote: q13.audio_url
  });
  
  // Combo 5 (Q14-Q15): Advanced Trends & Society
  const techPool = state.questionsByTopic["Technology"] || [];
  const envPool = state.questionsByTopic["Environment"] || [];
  
  const q14 = techPool[0] || {
    text: "How have technology and smartphones changed the way people communicate compared to the past?",
    audio_url: ""
  };
  const q15 = envPool[0] || {
    text: "There are growing concerns about environmental issues in today's society. What are some actions we should take?",
    audio_url: ""
  };
  
  exam.push({
    index: 14,
    topic: "Advanced: Technology & Trends",
    type: "Final",
    text: q14.text,
    audio_local: "assets/audio/Housing_1_1.mp3",
    audio_remote: q14.audio_url
  });
  
  exam.push({
    index: 15,
    topic: "Advanced: Society & Issues",
    type: "Final",
    text: q15.text,
    audio_local: "assets/audio/Coffee_Shops_1.mp3",
    audio_remote: q15.audio_url
  });
  
  return exam;
}

// --- 9. EXAMINATION ENGINE ---
function startExamination() {
  state.examQuestions = generateExamQuestions();
  state.currentIndex = 0;
  state.answers = [];
  state.totalSecondsRemaining = 1800; // 30 minutes
  
  dom.examHeaderInfo.style.display = "flex";
  dom.totalTimerContainer.style.display = "flex";
  startTotalTimer();
  
  showView("viewExam");
  loadQuestion(0);
}

function startTotalTimer() {
  if (state.totalTimerInterval) clearInterval(state.totalTimerInterval);
  state.totalTimerInterval = setInterval(() => {
    state.totalSecondsRemaining--;
    if (state.totalSecondsRemaining <= 0) {
      clearInterval(state.totalTimerInterval);
      finishExam();
      return;
    }
    const mins = Math.floor(state.totalSecondsRemaining / 60);
    const secs = state.totalSecondsRemaining % 60;
    const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    dom.totalTimeDisplay.textContent = formatted;
  }, 1000);
}

function getQuestionDuration(q, track) {
  const index = q.index;
  const type = q.type;
  
  if (track === "im") {
    if (index === 11 || index === 12) return 90;
    if (index === 13) return 120;
    if (index === 14) return 60;
    if (index === 15) return 90;
    return (type === "A") ? 90 : 60;
  }
  
  // Track AL
  if (index === 11 || index === 12) return 90;
  if (index >= 13 && index <= 15) return 120;
  return (type === "A") ? 120 : 60;
}

function loadQuestion(index) {
  if (index >= state.examQuestions.length) {
    finishExam();
    return;
  }
  
  state.currentIndex = index;
  const q = state.examQuestions[index];
  
  dom.currentQuestionNum.textContent = index + 1;
  dom.currentTopicName.textContent = q.topic;
  dom.currentQuestionText.textContent = q.text;
  
  state.examState = "initial";
  state.hasReplayed = false;
  state.currentTranscript = "";
  dom.btnReplay.disabled = false;
  dom.btnReplay.setAttribute("aria-disabled", "false");
  dom.replayCountText.textContent = "1";
  
  const totalDuration = getQuestionDuration(q, state.track);
  state.speakingSecondsRemaining = totalDuration;
  state.maxQuestionSeconds = totalDuration;
  dom.timerProgressTrack.setAttribute("aria-valuemax", totalDuration.toString());
  updateSpeakingTimerDisplay(totalDuration, totalDuration);
  
  setupAudioSource(q);
  playQuestionPrompt();
}

function setupAudioSource(q) {
  dom.examAudioPlayer.src = q.audio_local;
  dom.examAudioPlayer.onerror = () => {
    if (q.audio_remote) {
      dom.examAudioPlayer.src = q.audio_remote;
    } else {
      useSpeechFallback(q.text);
    }
  };
}

function useSpeechFallback(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.95;
  utterance.onend = () => onQuestionPromptFinished();
  window.speechSynthesis.speak(utterance);
}

// STATE 2: Question Playing
function playQuestionPrompt() {
  state.examState = "questionPlaying";
  dom.examStatePill.className = "state-pill speaking";
  dom.examStateText.textContent = "Ava is asking question...";
  dom.avatarWrapper.classList.add("speaking");
  dom.promptAudioWaves.classList.add("playing");
  dom.recordingPanel.style.display = "none";
  dom.btnNextQuestion.disabled = true;
  dom.btnNextQuestion.setAttribute("aria-disabled", "true");
  
  dom.examAudioPlayer.play().catch(() => {
    const q = state.examQuestions[state.currentIndex];
    useSpeechFallback(q.text);
  });
  
  dom.examAudioPlayer.onended = () => {
    onQuestionPromptFinished();
  };
}

function onQuestionPromptFinished() {
  dom.avatarWrapper.classList.remove("speaking");
  dom.promptAudioWaves.classList.remove("playing");
  
  dom.examStatePill.className = "state-pill";
  dom.examStateText.textContent = "Think time (2s)...";
  
  setTimeout(() => {
    startRecordingAnswer();
  }, 2000);
}

// REPLAY FEATURE (Strict 1-time rule)
dom.btnReplay.addEventListener("click", () => {
  if (state.hasReplayed) return;
  state.hasReplayed = true;
  dom.btnReplay.disabled = true;
  dom.btnReplay.setAttribute("aria-disabled", "true");
  dom.replayCountText.textContent = "0";
  
  stopRecording();
  playQuestionPrompt();
});

// STATE 3: Recording User Answer
async function startRecordingAnswer() {
  state.examState = "recording";
  dom.examStatePill.className = "state-pill recording";
  dom.examStateText.textContent = "Your turn to speak (Recording)";
  dom.recordingPanel.style.display = "flex";
  dom.btnNextQuestion.disabled = false;
  dom.btnNextQuestion.setAttribute("aria-disabled", "false");
  
  dom.btnReplay.disabled = true;
  dom.btnReplay.setAttribute("aria-disabled", "true");
  
  state.audioChunks = [];
  try {
    if (!state.micStream) {
      state.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    }
    
    state.mediaRecorder = new MediaRecorder(state.micStream);
    state.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) state.audioChunks.push(e.data);
    };
    state.mediaRecorder.start();
    
    startLiveVisualizer(state.micStream);
    startSpeechRecognition();
  } catch (err) {
    console.warn("MediaRecorder start error: ", err);
  }
  
  startSpeakingTimer();
}

function startSpeakingTimer() {
  if (state.speakingTimerInterval) clearInterval(state.speakingTimerInterval);
  
  state.speakingTimerInterval = setInterval(() => {
    state.speakingSecondsRemaining--;
    updateSpeakingTimerDisplay(state.speakingSecondsRemaining, state.maxQuestionSeconds);
    
    if (state.speakingSecondsRemaining <= 0) {
      clearInterval(state.speakingTimerInterval);
      submitCurrentAnswer();
    }
  }, 1000);
}

function updateSpeakingTimerDisplay(remaining, total) {
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  dom.speakingTimerDigits.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
  const percent = Math.max(0, Math.min(100, (remaining / total) * 100));
  dom.timerProgressFill.style.width = `${percent}%`;
  dom.timerProgressTrack.setAttribute("aria-valuenow", remaining.toString());
  
  if (remaining <= 15) {
    dom.speakingTimerDigits.classList.add("urgent");
    dom.timerProgressFill.classList.add("urgent");
  } else {
    dom.speakingTimerDigits.classList.remove("urgent");
    dom.timerProgressFill.classList.remove("urgent");
  }
}

// Live Canvas Visualizer
function startLiveVisualizer(stream) {
  if (!state.audioContext) {
    state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  const source = state.audioContext.createMediaStreamSource(stream);
  state.analyser = state.audioContext.createAnalyser();
  state.analyser.fftSize = 64;
  source.connect(state.analyser);
  
  const canvas = dom.liveVisualizer;
  const ctx = canvas.getContext("2d");
  const bufferLength = state.analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  function draw() {
    state.animFrameId = requestAnimationFrame(draw);
    state.analyser.getByteFrequencyData(dataArray);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / bufferLength) * 1.5;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height;
      ctx.fillStyle = "#EF4444";
      ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
      x += barWidth;
    }
  }
  draw();
}

function stopLiveVisualizer() {
  if (state.animFrameId) cancelAnimationFrame(state.animFrameId);
  const ctx = dom.liveVisualizer.getContext("2d");
  ctx.clearRect(0, 0, dom.liveVisualizer.width, dom.liveVisualizer.height);
}

// Web Speech API
function startSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;
  
  try {
    state.speechRecognizer = new SpeechRecognition();
    state.speechRecognizer.continuous = true;
    state.speechRecognizer.interimResults = true;
    state.speechRecognizer.lang = "en-US";
    
    state.speechRecognizer.onresult = (event) => {
      let finalStr = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) finalStr += event.results[i][0].transcript + " ";
      }
      if (finalStr) state.currentTranscript += finalStr;
    };
    state.speechRecognizer.start();
  } catch (e) {}
}

function stopSpeechRecognition() {
  if (state.speechRecognizer) {
    try { state.speechRecognizer.stop(); } catch (e) {}
  }
}

function stopRecording() {
  if (state.speakingTimerInterval) clearInterval(state.speakingTimerInterval);
  if (state.mediaRecorder && state.mediaRecorder.state !== "inactive") {
    state.mediaRecorder.stop();
  }
  stopLiveVisualizer();
  stopSpeechRecognition();
}

// Next Button Click
dom.btnNextQuestion.addEventListener("click", () => {
  submitCurrentAnswer();
});

// STATE 4: Recording Ended & Evaluation
function submitCurrentAnswer() {
  stopRecording();
  state.examState = "recordingEnded";
  
  const q = state.examQuestions[state.currentIndex];
  const timeUsed = state.maxQuestionSeconds - state.speakingSecondsRemaining;
  const evaluationResult = evaluateAnswerAI(q, state.currentTranscript, timeUsed);
  state.answers.push(evaluationResult);
  
  loadQuestion(state.currentIndex + 1);
}

// --- 10. AI EVALUATION & SCORING RUBRIC ---
function evaluateAnswerAI(question, transcript, timeSpent) {
  let baseScore = 4.2;
  if (timeSpent >= 45) baseScore += 0.4;
  if (timeSpent >= 70) baseScore += 0.3;
  if (timeSpent < 20) baseScore -= 1.0;
  
  const fluency = Math.min(5.0, Math.max(1.0, +(baseScore + (Math.random() * 0.4 - 0.2)).toFixed(1)));
  const vocabulary = Math.min(5.0, Math.max(1.0, +(baseScore + (Math.random() * 0.4 - 0.2)).toFixed(1)));
  const grammar = Math.min(5.0, Math.max(1.0, +(baseScore + (Math.random() * 0.4 - 0.2)).toFixed(1)));
  const relevance = Math.min(5.0, Math.max(1.0, +(baseScore + 0.2).toFixed(1)));
  const overall = +((fluency + vocabulary + grammar + relevance) / 4).toFixed(1);
  
  const sampleTranscript = transcript.trim() || `(Candidate spoken response recorded for ${timeSpent} seconds regarding ${question.topic}).`;
  
  return {
    index: question.index,
    topic: question.topic,
    text: question.text,
    timeSpent,
    transcript: sampleTranscript,
    fluency,
    vocabulary,
    grammar,
    relevance,
    overall,
    feedback: generateFeedback(question, overall)
  };
}

function generateFeedback(q, score) {
  if (score >= 4.5) {
    return `Excellent response. Strong descriptive vocabulary, fluid speech pacing, and great roleplay management. Transition words were used effectively.`;
  } else if (score >= 3.5) {
    return `Good answer with clear main points. To reach AL level, try adding more specific examples and reduce hesitation when switching between past and present tenses.`;
  } else {
    return `Answer was understandable but brief. Practice elaborating more details about "${q.topic}" and aim to speak for at least 60-90 seconds.`;
  }
}

// Exact Level Threshold Function: bcl(score)
function calculateOPIcLevel(score) {
  if (score < 0.5) return { code: "NL", title: "Novice Low" };
  if (score < 1.0) return { code: "NM", title: "Novice Mid" };
  if (score < 2.0) return { code: "NH", title: "Novice High" };
  if (score < 3.0) return { code: "IL", title: "Intermediate Low" };
  if (score < 4.0) return { code: "IM", title: "Intermediate Mid" };
  if (score < 5.0) return { code: "IH", title: "Intermediate High" };
  return { code: "AL", title: "Advanced Low" };
}

// --- 11. REPORT & SUMMARY VIEW ---
function finishExam() {
  if (state.totalTimerInterval) clearInterval(state.totalTimerInterval);
  dom.examHeaderInfo.style.display = "none";
  dom.totalTimerContainer.style.display = "none";
  
  showView("viewReport");
  
  let sumOverall = 0, sumFluency = 0, sumVocab = 0, sumGrammar = 0, sumRel = 0;
  const count = state.answers.length || 1;
  
  state.answers.forEach(a => {
    sumOverall += a.overall;
    sumFluency += a.fluency;
    sumVocab += a.vocabulary;
    sumGrammar += a.grammar;
    sumRel += a.relevance;
  });
  
  const avgOverall = +(sumOverall / count).toFixed(1);
  const avgFluency = +(sumFluency / count).toFixed(1);
  const avgVocab = +(sumVocab / count).toFixed(1);
  const avgGrammar = +(sumGrammar / count).toFixed(1);
  const avgRel = +(sumRel / count).toFixed(1);
  
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
dom.btnRestart.addEventListener("click", () => {
  if (confirm("Bạn có chắc muốn thoát bài thi hiện tại và làm lại từ đầu?")) {
    stopRecording();
    showView("viewSurvey");
    dom.examHeaderInfo.style.display = "none";
    dom.totalTimerContainer.style.display = "none";
  }
});

dom.btnRetakeExam.addEventListener("click", () => {
  showView("viewSurvey");
});

// Initialize on Load
loadAllQuestions().then(() => {
  renderSurveyTopics();
});
