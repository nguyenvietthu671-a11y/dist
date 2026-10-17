import { TestQuestion, SurveyAnswers } from '../types';

// Warm-up questions (2-3 questions to get comfortable)
export const warmupQuestions: TestQuestion[] = [
  {
    id: 'warmup1',
    prompt: "Let's start the interview now. Tell me something about yourself.",
    type: 'warmup',
    timeLimit: 60,
  },
  {
    id: 'warmup2',
    prompt: "What did you do yesterday?",
    type: 'warmup',
    timeLimit: 60,
  },
];

// Complete question bank from actual OPIc tests
interface TopicThread {
  topic: string;
  questions: {
    prompt: string;
    type: 'experience' | 'roleplay' | 'followup';
  }[];
}

const topicThreads: Record<string, TopicThread> = {
  newspaper: {
    topic: 'Newspaper',
    questions: [
      { prompt: "Tell me about one of your favorite newspapers and why you like it.", type: 'experience' },
      { prompt: "Tell me about your routine when you read a newspaper. Where do you like to read a newspaper? And how do you choose what to read first? Tell me about how you normally read a newspaper.", type: 'experience' },
      { prompt: "How are newspapers different today than how they were in the past? What aspect has changed with regard to how the news is reported today?", type: 'experience' },
      { prompt: "How did you first become interested in reading newspapers? What attracted you to read newspaper when you were younger? Tell me how that interest has developed over the years.", type: 'experience' },
      { prompt: "Newspapers are going through a time of transition from paper to digital format. Talk about this change to digital forms of reporting the news. How has it affected the way people get their news?", type: 'experience' },
      { prompt: "What kinds of newspapers are there in your country? What kind of news do they typically report on, and what are some sections they have?", type: 'experience' },
      { prompt: "Talk about a recent news story you read or saw. What was it about? Who was involved? Tell me everything about that news.", type: 'experience' },
      { prompt: "We all have news that we are particularly interested in. What was a story you read or saw that interested you? What made it more memorable than other news stories? What were your thoughts after you encountered that story?", type: 'experience' },
    ],
  },

  work: {
    topic: 'Work',
    questions: [
      { prompt: "You decided that you work. I would like to know about your company. What kind of company is it? When was it founded? Where is it located? What products or services does it offer?", type: 'experience' },
      { prompt: "Tell me about your daily routine at work. What kind of work do you engage in on a normal workday? What do you typically do as soon as you arrive at your office? Tell me everything about your day at work.", type: 'experience' },
      { prompt: "Now, tell me about a project you did at work last week. What kind of project was it? How did it go? What did you have to do for the project? Did you have any meetings to attend for the project?", type: 'experience' },
    ],
  },

  television: {
    topic: 'Television',
    questions: [
      { prompt: "What kinds of TV programs do you like to watch? Why do you like to watch those programs?", type: 'experience' },
      { prompt: "When do you watch TV most often? Where do you watch it? Whom do you watch with? Plus, what do you do while watching TV?", type: 'experience' },
      { prompt: "What were TV programs like when you were young? How are they different now? Tell me about how TV programs have changed over the years.", type: 'experience' },
      { prompt: "How did you first become interested in watching TV? What kinds of programs did you like watching when you were a child? How has your interest in TV programs changed over the years?", type: 'experience' },
      { prompt: "Tell me about the last TV show or movie you watched. What was the story about? Why was it memorable? Give me all the details.", type: 'experience' },
    ],
  },

  phones: {
    topic: 'Phones',
    questions: [
      { prompt: "What do you like most about your phone? Maybe the camera, maybe a certain application. Tell me why you like those features.", type: 'experience' },
      { prompt: "What do you do on your phone besides talking to people? Do you make updates in your social media page? Do you play games? Tell me what you typically do on your phone.", type: 'experience' },
      { prompt: "Tell me about the first phone you used. How was it different from the phone you are using now?", type: 'experience' },
      { prompt: "Tell me about a time when you had trouble while using your phone. What was the problem and how did you deal with the situation?", type: 'experience' },
      { prompt: "Describe how people used cell phones five years ago. What did they do with their phones or mobile applications? What are some of the biggest changes in how people use their phones?", type: 'experience' },
      { prompt: "In some societies, there is a concern that young people are not developing face-to-face communication skills because they spend too much time on their phones. What do people in your country think about the way in which young people use their phone?", type: 'experience' },
      { prompt: "I would like to know about the phone calls that you make. What kinds of things do you talk about with your friends over the phone?", type: 'experience' },
      { prompt: "Tell me when and where you talk on the phone most often. Who do you talk with most often when you talk on the phone?", type: 'experience' },
      { prompt: "Tell me about a recent phone call you remember. Who did you talk to and what did you talk about? What made that phone call so memorable?", type: 'experience' },
      { prompt: "How did you get to pick your current phone? Did someone recommend that phone to you? What were some things that made you buy that phone?", type: 'experience' },
    ],
  },

  technology: {
    topic: 'Technology',
    questions: [
      { prompt: "What kinds of technology do people typically use in your country? Do people use computers, cell phones or hand-held devices? What are some common forms of technology that people use?", type: 'experience' },
      { prompt: "What piece of technology do you use most often? Do you use computers or mobile phones? Tell me about the most typical type of technology you use everyday.", type: 'experience' },
      { prompt: "Technology has definitely changed over time. Tell me about an early memory that you have about a piece of technology. It could be a computer or a mobile phone from many years ago. How has technology changed over time?", type: 'experience' },
      { prompt: "Problems often come up because of our dependence on technology. Think about a time you experienced a problem because some piece of technology was not working properly. Maybe your computer crashed or maybe your cellphone had no service. Tell me about a time when you had some kind of problem getting technology to work.", type: 'experience' },
    ],
  },

  furniture: {
    topic: 'Furniture',
    questions: [
      { prompt: "Tell me about the furniture you have in your home. Is there a piece of furniture that is your favorite?", type: 'experience' },
      { prompt: "Tell me about how you use your furniture on a typical day. What kinds of things do you do with your furniture?", type: 'experience' },
      { prompt: "Tell me about the furniture you had at home when you were a child. Was there anything different from the furniture that you use today?", type: 'experience' },
      { prompt: "Tell me about a time when you had a problem with your furniture. Perhaps it could have been damaged for some reason. Tell me what exactly happened and how you solved the problem.", type: 'experience' },
    ],
  },

  recycling: {
    topic: 'Recycling',
    questions: [
      { prompt: "I would like to know about how recycling is practiced in your country. What do people specifically do? Tell me how things are recycled.", type: 'experience' },
      { prompt: "Recycling is a common practice. Tell me about all the different kinds of things that you recycle.", type: 'experience' },
      { prompt: "Problems sometimes occur while recycling. Perhaps the pick-up service did not come as planned. Or, the items were too big for the containers. Or the container was knocked over and some items spilled out. Tell me about something memorable related to recycling.", type: 'experience' },
      { prompt: "Tell me what recycling was like when you were a child. Was there a particular place to which you took out the recyclables? Were there any special containers? Describe what it was like and what you did in detail.", type: 'experience' },
      { prompt: "The handling of recycling materials has changed over the years. Tell me how recycling materials were collected in the past and how this evolved over the years.", type: 'experience' },
      { prompt: "Stories about recycling are often in the media. Tell me about one news story that you heard of related to recycling or perhaps the environment. Describe what the story was about and how the reaction to the story was.", type: 'experience' },
    ],
  },

  music: {
    topic: 'Music',
    questions: [
      { prompt: "You indicated in the survey that you listen to music. What kinds of music do you listen to? Who are some of your favorite musicians or composers?", type: 'experience' },
      { prompt: "When and where do you usually listen to music? Do you listen to the radio? Do you go to concerts? Tell me about the different ways you enjoy music.", type: 'experience' },
      { prompt: "When did you first become interested in music? What kinds of music did you like at first? Tell me how your interest in music developed from your childhood until today.", type: 'experience' },
      { prompt: "Could you think back to a particular memorable time when you heard live music? When was it? Where were you? Who were you with? What happened that made that performance so memorable?", type: 'experience' },
      { prompt: "Pick 2 types of music or composers. Describe each in as much detail as possible. Compare the similarities and differences between them.", type: 'experience' },
      { prompt: "What new electronic gadgets or equipment are people who like music interested in these days? What new products excite them and why?", type: 'experience' },
    ],
  },

  movies: {
    topic: 'Movies',
    questions: [
      { prompt: "You indicated in the survey that you like to watch movies. What kinds of movies do you like to watch? Why do you like those types of movies?", type: 'experience' },
      { prompt: "Tell me about when you went to the movies recently. Who did you go with and how was that day? What did you do before the movie and what did you do after?", type: 'experience' },
      { prompt: "Tell me about a memorable movie that you watched in the past. What was it about? What was special about that movie?", type: 'experience' },
      { prompt: "Talk about a news story about your favorite actor or actress that you watched recently. Start by telling me about his or her background and then describe in detail what the news was about.", type: 'experience' },
      { prompt: "Could you compare the movies made today to movies you watched while you were growing up? How have movies changed over the years? What are the differences and similarities?", type: 'experience' },
      { prompt: "When you talk to your friends about movies, what topics do you discuss? Why are these issues of interest or concern to you and your friends? What makes them so important?", type: 'experience' },
    ],
  },

  industry: {
    topic: 'Industry',
    questions: [
      { prompt: "Tell me about one of the rising industries in your country. Why is that industry famous and what is special about it?", type: 'experience' },
      { prompt: "Talk about a well-known company in the industry you just mentioned. What is special about that company?", type: 'experience' },
      { prompt: "Tell me about the benefits that industry provides. What kind of good is it doing for your country?", type: 'experience' },
      { prompt: "What kinds of efforts have you made to help your career in the past? Why did you do those things and how did they help you?", type: 'experience' },
      { prompt: "What kinds of companies do young people in your country want to work for? Why do they want to work for those companies?", type: 'experience' },
      { prompt: "Tell me about an industry you follow. Is it related to food, energy or mobile computing? How is it different from 3 years ago?", type: 'experience' },
      { prompt: "Tell me about an incident that occurred in the industry you follow. Perhaps a game company released a new game, but the public was disappointed about it. Or, perhaps a company released a new device, but it didn't meet people's expectations. How did your community react to the incident?", type: 'experience' },
      { prompt: "How do people prepare for future work in your country's industries? Do they get general education first or receive specific training once they join a company? Do they receive specific job training from a young age? How has the process changed over the past 5 years?", type: 'experience' },
      { prompt: "What is an industry or a company that people in your country are talking about nowadays? Tell me why people are interested in this industry and what they are saying about it?", type: 'experience' },
    ],
  },

  housing: {
    topic: 'Housing',
    questions: [
      { prompt: "I would like to know where you live. Can you describe your home to me? What does it look like? How many rooms does it have?", type: 'experience' },
      { prompt: "What is your normal routine at home? What do you usually do on weekdays and what do you do on weekends?", type: 'experience' },
      { prompt: "Describe the home you lived in as a child. How was it different from the home you live in now?", type: 'experience' },
      { prompt: "I would like to know where you live. Talk about the different rooms in your home. Tell me about your favorite room. What does it look like?", type: 'experience' },
      { prompt: "What kinds of things do you do to keep your house clean and comfortable? What kinds of housework do you do at home?", type: 'experience' },
      { prompt: "We sometimes want to change something in our home, maybe get new furniture or do some painting or decorating. Tell me about one change that you made to your home. Tell me why you decided to make that change and everything you had to do to make that change happen.", type: 'experience' },
      { prompt: "Talk about a place you lived in and the surrounding area when you were a child. What do you remember about that place? Describe your home from your early childhood in detail.", type: 'experience' },
      { prompt: "Talk about a special memory you had at home with your family members. Perhaps you had guests over or had a party of some sort. Tell me about the experience in detail.", type: 'experience' },
      { prompt: "There are always problems that happen in any home. Things break, projects don't go as planned, or people you live with don't cooperate. Tell me about some problems or issues you had in your home.", type: 'experience' },
      { prompt: "Pick one of those problems and explain everything that happened. When did it occur and what caused the problem? Explain in detail everything you did to resolve the situation.", type: 'experience' },
      { prompt: "I would like to talk about where you live. Tell me about the different responsibilities in your home. Who is responsible for what? How are these things done?", type: 'experience' },
      { prompt: "Tell me about responsibilities you had as a child. What were you expected to do? How did you handle your responsibilities?", type: 'experience' },
      { prompt: "Do you remember a specific incident as a child when you were not able to do a task that you were supposed to do? I would like to know all the details about what you were expected to do and why you could not do it.", type: 'experience' },
    ],
  },

  housing2: {
    topic: 'Housing (Modern)',
    questions: [
      { prompt: "I would like to talk about where you live. Homes today are quite different from those built in the past. Modern homes have new technology and new designs. Tell me how homes in your country have changed over the past few years.", type: 'experience' },
      { prompt: "Housing is a topic that is often in the news. Tell me about what people in your country discuss when it comes to housing. Perhaps there are too many people who are looking for homes, or there are too many homes out on the market. Talk about a news story you remember about homes.", type: 'experience' },
      { prompt: "I would like to talk about where you live. Compare how you solve problems in your home to how your parents or friends solve problems that occur in their homes. How is it similar or different?", type: 'experience' },
      { prompt: "What are some major problems people have when they rent a house or an apartment? How do people deal with these issues? How do these things affect where people live?", type: 'experience' },
      { prompt: "I would like to talk about where you live. Many homes today are equipped with new appliances or electronic devices that make everyday life more convenient. What are some of these new home appliances or electronic devices?", type: 'experience' },
      { prompt: "Talk about a specific modern appliance or device that people consider as useful or convenient at home. Why do people consider this home appliance or device useful?", type: 'experience' },
      { prompt: "How have home appliances changed our lives? How was life before the appliances different from life now? What is the biggest change on our lives?", type: 'experience' },
    ],
  },

  internet: {
    topic: 'Internet',
    questions: [
      { prompt: "What do people normally do on the Internet? Do they play games, watch television, or watch movies? Talk about all the things people do online.", type: 'experience' },
      { prompt: "What do you usually do on the Internet? Do you like to shop online? Do you like sharing videos with other people? Tell me everything that you do online.", type: 'experience' },
      { prompt: "Tell me about your early experience of surfing the Internet. What do you remember particularly about that experience?", type: 'experience' },
      { prompt: "Tell me about when you used the Internet to get a project done. What was the project about? How did the Internet help you do that project?", type: 'experience' },
      { prompt: "I am sure you have things that you remember seeing on the Internet. Talk about a memorable posting that you saw on the Internet. Why was it memorable for you?", type: 'experience' },
      { prompt: "Talk about the videos that you watch on the Internet. What kinds of videos do you like to watch for fun, for work or for school? Why do you like to watch those videos?", type: 'experience' },
      { prompt: "What did you do on the Internet yesterday? What website did you visit? Tell me about things you did online yesterday.", type: 'experience' },
      { prompt: "Describe something memorable you saw online for work or for fun. Maybe it was something impressive, unusual or meaningful to you. What was special about it?", type: 'experience' },
      { prompt: "What kinds of concerns do people have about Internet use nowadays? They could be about issues regarding safety, privacy, or security. How have these concerns affected people's lives?", type: 'experience' },
      { prompt: "How is Internet usage different among people in different age groups? How do young people use the Internet differently? Discuss the matter in detail.", type: 'experience' },
    ],
  },

  food: {
    topic: 'Food',
    questions: [
      { prompt: "What are some of the popular dishes in your country? Tell me about a particular dish. What is special about it? Please describe it in detail.", type: 'experience' },
      { prompt: "What do you eat on a regular day? Tell me everything that you eat in detail.", type: 'experience' },
      { prompt: "Tell me about a memorable experience you had while eating something. It could have been something good or bad. What happened? Why was it so memorable or special? Tell me everything in as much detail as possible.", type: 'experience' },
      { prompt: "Many people try to eat healthy these days. What kinds of foods are healthy and why are they healthy for us?", type: 'experience' },
      { prompt: "How do you shop for healthy food? What kinds of things do you have to do to cook healthy food?", type: 'experience' },
      { prompt: "Tell me how you found out about eating healthy. Did your family eat healthy when you were growing up? Did your friend become healthier by eating healthy food? Describe to me in detail about how you started to eat healthy.", type: 'experience' },
      { prompt: "When was the last time you had some healthy food? Who was it with and how did you feel? What was special about that experience?", type: 'experience' },
      { prompt: "How has food shopping changed over the last 20 years? What are the changes in how people buy their food? Describe those changes in as much detail as possible.", type: 'experience' },
      { prompt: "There are sometimes news reports on food. Food can get contaminated or be affected by dangerous bacteria. Talk about a news report you watched regarding a food scare incident.", type: 'experience' },
    ],
  },

  health: {
    topic: 'Health',
    questions: [
      { prompt: "Tell me about the kinds of foods healthy people eat. What kinds of foods do healthy people eat? Where do they buy these healthy foods?", type: 'experience' },
      { prompt: "Tell me about all the things you do in order to stay healthy.", type: 'experience' },
      { prompt: "Ideas on what good health is and how to maintain health change frequently. What did people do to maintain good health when you were a child? What was considered to be a healthy diet at that time? How did people usually exercise? Describe how people's thoughts on what is healthy have changed over time.", type: 'experience' },
      { prompt: "Describe a healthy person you know of. What makes that person healthy? Tell me everything that makes that person healthier.", type: 'experience' },
      { prompt: "Have you ever changed a habit or a certain lifestyle for your health? Maybe you started to work out or started to eat healthier. Tell me about that change you made.", type: 'experience' },
      { prompt: "Talk about one thing that you did for your health in detail. What kind of impact did it have on your health? Tell me about the effect that had on your health.", type: 'experience' },
      { prompt: "Different generations have different views on what is healthy. Some generations think people have to be skinny in order to be healthy, while others believe people must be muscular. What did your parents' generation think people have to be like to be healthy? How does that compare to what your generation believes?", type: 'experience' },
      { prompt: "Tell me about a recent news story that you saw related to health issues. Describe what the issue was about in detail. How did your community react to the news?", type: 'experience' },
      { prompt: "Tell me about the gym you used to go to in the past. What was it like? What kinds of facilities were there? How was it different from the gym you go to these days?", type: 'experience' },
    ],
  },

  restaurants: {
    topic: 'Restaurants',
    questions: [
      { prompt: "I would like to know about restaurants in your country. What do typical restaurants look like? What kinds of food do they commonly offer?", type: 'experience' },
      { prompt: "Tell me about a restaurant you ate at recently. What kind of restaurant was it? What was their menu and what did you eat? Who were you with? Did you like how the food tasted?", type: 'experience' },
      { prompt: "Now tell me about a restaurant you used to go to as a child. What was it like? What did you eat? Who did you go with? What do you remember most about that place? Tell me about that restaurant in as much detail as possible.", type: 'experience' },
      { prompt: "Talk about your favorite take-out or delivery food restaurant. What is that place like? What kinds of food do they commonly offer?", type: 'experience' },
      { prompt: "Talk about the last time you used a take-out or a delivery food service. Where was it and what did you get? What do you remember about that experience?", type: 'experience' },
      { prompt: "Talk about a time when you prepared for a special occasion using a take-out or a delivery service. What kinds of food did you get from the restaurant? Tell me about that experience with lots of details.", type: 'experience' },
      { prompt: "Many restaurants are changing their menus to suit customers who are more health-conscious. Talk about the changes you notice about restaurants in your country related to this trend.", type: 'experience' },
      { prompt: "Chain restaurants such as McDonald's have a set menu you can expect. On the other hand, small local restaurants have their own menus and you may not know what to expect. Talk about your experience of going to a chain restaurant and a local restaurant. What was the biggest difference?", type: 'experience' },
      { prompt: "What kinds of changes in restaurants or eating out have you noticed over the last few years? How was eating out different in the past? What has brought about these changes?", type: 'experience' },
      { prompt: "When your friends or family discuss restaurants they like or dislike, what are some of the characteristics they discuss the most? How do these characteristics affect their dining experience?", type: 'experience' },
      { prompt: "Many fast-food, take-out or delivery restaurants are now offering healthy choices. Why do you think this change has happened in recent years? Was it a result of consumer pressure, market forces or something else?", type: 'experience' },
      { prompt: "What are the latest trends people are talking about related to take-out or delivery food options? Perhaps it has to do with ordering online or an app. Or, it has to do with some new kinds of menus. Discuss the changes that you have observed recently regarding take-out or delivery food options.", type: 'experience' },
      { prompt: "How do busy working people usually get their meals on weekdays? Do they order food or go to restaurants? What do they usually do?", type: 'experience' },
      { prompt: "What do you usually do for dinner during the week? Do you order food or go out to eat? Do you cook your own meals? Does someone else cook for you? Do you eat alone or eat with other people?", type: 'experience' },
      { prompt: "Tell me about how you found out about a special grocery store. Maybe a new specialty store opened in your community or a new farmer's market opened and you wanted to check that place out. How did you find out about this new grocery store?", type: 'experience' },
    ],
  },
};

// Role-play scenarios (standalone)
const roleplayScenarios = [
  {
    prompt: "Imagine you're at a restaurant and need to order food. Talk to the waiter.",
    type: 'roleplay' as const,
  },
  {
    prompt: "Imagine you're calling your boss to say you can't come to work today. What do you say?",
    type: 'roleplay' as const,
  },
  {
    prompt: "Imagine you're at a hotel and there's a problem with your room. Call the front desk to explain.",
    type: 'roleplay' as const,
  },
  {
    prompt: "Imagine a friend wants to borrow money from you, but you can't lend it. Explain why politely.",
    type: 'roleplay' as const,
  },
  {
    prompt: "Imagine you're at a job interview. Answer questions about your experience and goals.",
    type: 'roleplay' as const,
  },
];

// Determine which topics to use based on survey answers
function selectTopics(surveyAnswers: SurveyAnswers): string[] {
  const topics: string[] = [];

  // Always include work based on employment
  if (surveyAnswers.employment !== 'student') {
    topics.push('work');
  }

  // Add housing (always relevant)
  topics.push('housing');

  // Add technology/phones (universal)
  topics.push('phones');
  topics.push('technology');

  // Add food (universal)
  topics.push('food');

  // Add restaurants
  topics.push('restaurants');

  // Add health if they do sports
  if (surveyAnswers.sports.length > 0 && !surveyAnswers.sports.includes('none')) {
    topics.push('health');
  }

  // Add hobbies based on interests
  if (surveyAnswers.interests.length > 0) {
    const interestToTopic: Record<string, string> = {
      music: 'music',
      instrument: 'music',
      singingAlone: 'music',
      singingGroup: 'music',
      reading: 'newspaper',
      movies: 'movies',
    };

    const hobbyTopics = surveyAnswers.interests
      .map(i => interestToTopic[i])
      .filter(t => t && !topics.includes(t));
    
    hobbyTopics.forEach(t => topics.push(t));
  }

  // Add internet (modern topic)
  topics.push('internet');

  // Add television
  topics.push('television');

  // Add industry for higher forms
  topics.push('industry');

  // Add recycling/furniture for variety
  if (Math.random() > 0.5) {
    topics.push('recycling');
  } else {
    topics.push('furniture');
  }

  return topics;
}

// Generate personalized questions based on survey answers
export function generatePersonalizedQuestions(surveyAnswers: SurveyAnswers, formNumber: number): TestQuestion[] {
  const questions: TestQuestion[] = [];
  let questionId = 1;

  // Select topics based on survey
  const selectedTopics = selectTopics(surveyAnswers);

  // For each topic, add 3-5 questions from the topic thread
  selectedTopics.forEach(topicKey => {
    const thread = topicThreads[topicKey];
    if (!thread) return;

    // Determine how many questions from this topic based on form level
    const questionCount = formNumber >= 3 ? 5 : formNumber >= 2 ? 4 : 3;
    const threadQuestions = thread.questions.slice(0, questionCount);

    threadQuestions.forEach((q, idx) => {
      questions.push({
        id: `q${questionId++}`,
        prompt: q.prompt,
        type: q.type,
        timeLimit: formNumber >= 3 ? 120 : 90,
      });
    });
  });

  // Add 1-2 role-play scenarios for higher forms
  if (formNumber >= 2) {
    const roleplayCount = formNumber >= 3 ? 2 : 1;
    const selectedRoleplays = roleplayScenarios
      .sort(() => Math.random() - 0.5)
      .slice(0, roleplayCount);

    selectedRoleplays.forEach(rp => {
      questions.push({
        id: `q${questionId++}`,
        prompt: rp.prompt,
        type: 'roleplay',
        timeLimit: formNumber >= 3 ? 120 : 90,
      });
    });
  }

  return questions;
}

export const formDescriptions: Record<number, { range: string; label: string }> = {
  1: { range: 'Novice Low to Intermediate Low', label: 'Form 1 (NL – IL)' },
  2: { range: 'Novice Low to Intermediate High', label: 'Form 2 (NL – IH)' },
  3: { range: 'Novice Low to Advanced Low', label: 'Form 3 (NL – AL)' },
  4: { range: 'Intermediate High to Advanced High', label: 'Form 4 (IH – AH)' },
  5: { range: 'Advanced Mid to Superior', label: 'Form 5 (AL – S)' },
};
