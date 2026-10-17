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

// Complete question bank from actual OPIc tests - 101 topics
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

  bars: {
    topic: 'Bars',
    questions: [
      { prompt: "You indicated that you go to bars. Describe the bar you go to most often. Tell me everything about that place in detail.", type: 'experience' },
      { prompt: "Tell me about what you normally do at bars. Who do you usually go with? Tell me everything about your experience of going to bars.", type: 'experience' },
      { prompt: "Tell me about a memorable incident that happened at a bar. What exactly happened and why was it special? Tell me everything about that unforgettable incident at that bar.", type: 'experience' },
      { prompt: "Tell me about your favorite pub that you like to go to.", type: 'experience' },
      { prompt: "What do you normally do when you have gathering at pubs? Do you call your friend first? Do you go to a bank before you visit pubs? Talk about what you do when you get together with your friends at pubs?", type: 'experience' },
      { prompt: "How have pubs changed over the years? How were they in the past and how are they now? What are the differences and the similarities?", type: 'experience' },
      { prompt: "Describe a pub or a bar that you go often. Why do you like to go to that place?", type: 'experience' },
      { prompt: "Besides drinking, what kinds of thing you do at bars or pubs?", type: 'experience' },
      { prompt: "Tell me about a memorable visit to a bar or a pub. When was this? Who did you go with? What did you do there? Tell me everything about that moment at bar.", type: 'experience' },
      { prompt: "Most bars and pubs have a special area to make drinks. Tell me what this area looks like at your favorite bar or pub.", type: 'experience' },
      { prompt: "Tell me about the first bar you remember going to. What did it look like? What was your impression of that place? Describe the first bar you went to with lots of detail.", type: 'experience' },
      { prompt: "Tell me about a special visit to a bar or a pub. Maybe you celebrated your birthday there. Tell me what you did before and after your bar visit and how you spent your time at that bar. Tell me the whole story.", type: 'experience' },
      { prompt: "What is a typical routine for a bartender? How do they start their day? What do they do while they work? How did they end their day?", type: 'experience' },
      { prompt: "Many people say that bars have changed a lot in recent years. How are bars these days different from bars 5 or 10 years ago?", type: 'experience' },
    ],
  },

  gatherings: {
    topic: 'Gatherings',
    questions: [
      { prompt: "Talk about gatherings or celebrations in your country. What do people do when they get together to celebrate things?", type: 'experience' },
      { prompt: "What did you do at your last gathering or celebration? What was the occasion? Give me all the detail.", type: 'experience' },
      { prompt: "Talk about a memorable incident that happened at a gathering or a celebration. Why was it so memorable or unforgettable?", type: 'experience' },
      { prompt: "Where do people usually have celebrations or parties in your area? Is it at someone's home, a park, or some place else? Tell me everything about that place in as much detail as you can.", type: 'experience' },
      { prompt: "Tell me about the last holiday party or celebration that you attended. What happened and who was there with you? Tell me about what you did from beginning to end.", type: 'experience' },
      { prompt: "Talk about a time when you helped prepare for a party or a celebration. Perhaps you helped invite people, or you helped decorate the venue, or you helped get the food or drinks. Tell me about this experience from the beginning to the end.", type: 'experience' },
      { prompt: "How were gatherings or celebrations when you were a child? How are they different from now? What kinds of events are popular more recently?", type: 'experience' },
      { prompt: "Gatherings are celebrations are important to people living in a city. However, the organization of these events takes time, energy and money. What are some issues people talk about related to organizing these events?", type: 'experience' },
      { prompt: "Gatherings or celebrations in small towns are often different from those in big cities. Tell me about some of the similarities and differences between the celebrations people have in small towns and big cities in your country.", type: 'experience' },
      { prompt: "What kinds of concerns do you hear people express regarding gatherings or celebrations in your area? Do people complain about traffic, parking, noise, garbage or other problems?", type: 'experience' },
    ],
  },

  overseasTrip: {
    topic: 'Overseas Trip',
    questions: [
      { prompt: "You indicated in the survey that you take vacations internationally. Could you describe for me one of the countries you have visited? What did it look like and what were the people like there?", type: 'experience' },
      { prompt: "Talk about the things that you typically do when you visit another country or overseas city.", type: 'experience' },
      { prompt: "Tell me about your first trip to another country or city. When did you go? Where did you visit? What did you do there? Who did you go with? Tell me everything about that trip with lots of details.", type: 'experience' },
      { prompt: "Sometimes, something out of the ordinary happens while travelling. I wonder if you have ever experienced anything surprising, unexpected or unusual during a trip. Tell me about that experience. Start by telling when and where you were traveling, and then give me all the details of the experience.", type: 'experience' },
      { prompt: "Tell me about a popular place tourists like to go to when traveling outside your country. Why do they like visiting those locations?", type: 'experience' },
      { prompt: "Think about another country that you visited when you were young. Describe what that country was like with lots of details. What were young impressions of the place?", type: 'experience' },
      { prompt: "Tell me about a specific experience you had while travelled outside your country. Perhaps something happened that was funny, interesting or frightening. Tell me about what happened from beginning to end.", type: 'experience' },
      { prompt: "Tell me about where tourists go and what they do when they go on overseas trips.", type: 'experience' },
      { prompt: "You indicated in the survey that you take vacations internationally. How was traveling to other countries changed over the years? Is it easier or more difficult? Describe what traveling was like in the past and what changes you have seen over the years.", type: 'experience' },
      { prompt: "When people discuss traveling to other countries, what are the things that they are mostly interested in doing or seeing? Why are these things of such interest or important to travelers?", type: 'experience' },
    ],
  },

  geography: {
    topic: 'Geography',
    questions: [
      { prompt: "Describe your country's geography for me. Are there mountains, lakes and rivers? What is your country like?", type: 'experience' },
      { prompt: "I would like you to pick a favorite place in your country from your childhood. Describe that place in detail. What was your memory of that place?", type: 'experience' },
      { prompt: "People often have memorable or moving experiences when they explore their country's geography. You might have climbed a famous mountain or might have been to a beautiful beach. Tell me a memorable story of when you visited a natural place in your country.", type: 'experience' },
      { prompt: "Tell me about the outdoor activities that are popular in your country. Do people go hiking, bike or swim? What do people typically do outdoors?", type: 'experience' },
      { prompt: "Tell me about an early memory of your country's geography. Perhaps it was a special place or an important landmark. What were your memories about that place?", type: 'experience' },
      { prompt: "Tell me a little bit about a country close to your country. Talk about what the country looks like, and about its people and some of its traditions.", type: 'experience' },
      { prompt: "Please tell me about the kinds of free time activities people in your country do.", type: 'experience' },
      { prompt: "How has your country changed in the past decade? Perhaps there were changes in urban development, tourism, or any other area. Choose one area of change and describe it with a lot of detail.", type: 'experience' },
      { prompt: "Talk about country that is geographically similar to your country. What are the changes the country has gone through in recent years?", type: 'experience' },
      { prompt: "Tell me about an article you read about the country you have mentioned. What was the article about? Was it related to the politics or the economy of the country?", type: 'experience' },
      { prompt: "Tell me in detail about the changes you have observed concerning the relationship between your country and other countries. The change could be related to the economy, sports, arts, culture or politics. Describe the change in detail.", type: 'experience' },
      { prompt: "I would like for you to think about a specific historic event that has affected the relationship between your country and one of its neighboring nations. It could be a treaty signed between 2 countries, a cultural event or a visit of another country's minister or president. Tell me everything that happened in detail.", type: 'experience' },
    ],
  },

  shopping: {
    topic: 'Shopping',
    questions: [
      { prompt: "You indicate in the survey that you like to go shopping. Talk about stores or shopping centers in your country. What are they like? Describe them in detail.", type: 'experience' },
      { prompt: "Where do you when you go shopping for something? What do you buy when you go there? What is special about that place?", type: 'experience' },
      { prompt: "Think of your early memories of shopping. Was there a store remember from your childhood? What did it look like and what was your impression of that place? Describe that place for me in detail.", type: 'experience' },
      { prompt: "Sometimes, funny or unexpected things happen while shopping. Tell me about a memorable shopping experience you had. Maybe you saw a friend at a store, maybe the item you bought was broken or did not work. Tell me about a shopping trip that you remember for some reason.", type: 'experience' },
      { prompt: "You indicated in the survey that you like to go shopping. I would like to know about your interest in shopping? What do you most often buy? Where do you go for shopping?", type: 'experience' },
      { prompt: "You probably had many interesting experiences while shopping. Perhaps something good, funny or problematic happened. Where were you, what happened, and what did you do to deal with situation? Tell me about that particular experience in as much detail as possible.", type: 'experience' },
      { prompt: "When was the last time you went shop for something? Where did you go and what did you buy? Who did you go with? What was special about that shopping experience?", type: 'experience' },
      { prompt: "You indicate in the survey that you like to go shopping. Shopping has changed a great deal over the years. What are some changes in people's shopping habits? Talk about some significant changes that have happened over the years.", type: 'experience' },
      { prompt: "What kinds of product or service do you hear shoppers talk about these day? Why are they generating so much interest? Tell me about those products people talk about in detail.", type: 'experience' },
    ],
  },

  fashion: {
    topic: 'Fashion',
    questions: [
      { prompt: "What kinds of clothes do people in your country typically wear? Do they wear different clothes for work or for play?", type: 'experience' },
      { prompt: "What kinds of clothes do you like to wear personally? What kind of fashion style do you prefer? What are you wearing today? Give me all the details about your fashion style.", type: 'experience' },
      { prompt: "Fashion is always changing. Tell me about the kinds of clothes that were popular when you were younger. What did fashion styles look like back then? How were they different from what is popular now?", type: 'experience' },
      { prompt: "Tell me about the last time you bought a new piece of clothing. What did you need to buy and where did you find it? Were there any challenges or problems? Give me all the details.", type: 'experience' },
      { prompt: "What do you normally do when you go shopping? Where do you go and what do you look for? Tell me about your typical shopping habits.", type: 'experience' },
    ],
  },

  holidays: {
    topic: 'Holidays',
    questions: [
      { prompt: "Tell me about some popular holidays in your country. Where do people typically celebrate these holidays? What kinds of things do they do to celebrate?", type: 'experience' },
      { prompt: "Talk about a holiday memory from your childhood. Tell me where you were and what that placed look like. Tell me everything that you remember from that holiday scene.", type: 'experience' },
      { prompt: "Talk about the most recent holiday you celebrated. Why was that holiday memorable? Was there anything special about that day? Talk about why that holiday was particularly unforgettable?", type: 'experience' },
      { prompt: "What are some holidays in your country? What do people do during these holidays? What is special about them?", type: 'experience' },
      { prompt: "What are some issues or concerns people have regarding holidays? What do people do to address those issues or concerns?", type: 'experience' },
    ],
  },

  familyFriends: {
    topic: 'Family/Friends',
    questions: [
      { prompt: "Describe a family member or a friend you have. What is he or she like? What is special about that person?", type: 'experience' },
      { prompt: "Tell me about what you commonly do with your friend or family members when you get together with them.", type: 'experience' },
      { prompt: "Talk about what you did with your family and friends recently. Tell me about the activities you did with them.", type: 'experience' },
      { prompt: "Tell me about a special event or a holiday you celebrated with your family or friends. What made it so special? Give me all the details about that event or holiday from beginning to end.", type: 'experience' },
      { prompt: "Talk about a time when you recently visited a friend or a family member. What did you do when you go there? What was memorable about that visit? Tell me everything from the beginning to end.", type: 'experience' },
      { prompt: "Tell me about when you visit a friend's and a family member's house. What do you normally do when you go there?", type: 'experience' },
      { prompt: "Talk about visit a friend or a family member from your childhood. Who did you visit and whom did you go with? What do you remember about that visit and what made it unforgettable?", type: 'experience' },
      { prompt: "Describe 2 different friends or family members. Describe each of them in as much detail. And then, tell me about the things they have in common and the differences between them.", type: 'experience' },
      { prompt: "When you get together with friends or family, what are some of the topics or interest you discuss? Why are these things of interest or concern to you? How do these things affect your life?", type: 'experience' },
    ],
  },

  transportation: {
    topic: 'Transportation',
    questions: [
      { prompt: "Tell me about how people get around in your country. Do they drive their own cars or take trains? What are some typical means of transportation to get around?", type: 'experience' },
      { prompt: "What means of transportation do you use to get around? Do you drive your own car or take public transportation?", type: 'experience' },
      { prompt: "How did you travel when you were a child? Were the types of transportation different back then? Describe for me how people used to get around in your city or town.", type: 'experience' },
      { prompt: "Problems related to transportation often arise. Cars break down, trains run late or traffic could get bad. Tell me about a transportation problem that you once had. What did you do to deal with the situation?", type: 'experience' },
    ],
  },

  banks: {
    topic: 'Banks',
    questions: [
      { prompt: "Tell me about the banks in your country. What do they typically look like? Where are they usually located?", type: 'experience' },
      { prompt: "Tell me what goes on when you visit the bank. What do you do from the moment you walk in until you walk out.", type: 'experience' },
      { prompt: "Banks have definitely changed over time. Tell me about a bank you remember from your childhood. What did the bank look like? How was it different from banks today?", type: 'experience' },
      { prompt: "Sometimes, problems can occur when you are at the bank. Tell me about a problem you had that involved your bank. Maybe the bank was closed or perhaps the bank might have some kind of mistake. Tell me how you dealt with the problem.", type: 'experience' },
    ],
  },

  hotels: {
    topic: 'Hotels',
    questions: [
      { prompt: "Tell me about hotels in your country. What do they look like? Where are they located?", type: 'experience' },
      { prompt: "Tell me what you typically do when you go to a hotel. What do you do first and what do you do after that? When do you usually stay at hotels?", type: 'experience' },
      { prompt: "People often have memories of beautiful or interesting hotels. Tell me about a hotel that remember for some reason. Where was it located? What was it like? Why was it so memorable? Describe that hotel for me in as much detail as possible.", type: 'experience' },
      { prompt: "When was the last time you stayed at a hotel? Where were you, why were you there and what did you do? Tell me the whole story from the beginning to end.", type: 'experience' },
    ],
  },

  appointment: {
    topic: 'Appointment',
    questions: [
      { prompt: "What kinds of appointment do you make in your life? Where do you go to make your appointment?", type: 'experience' },
      { prompt: "What kinds of things do you do when you make appointments? Tell me what you exactly do when you make these appointment.", type: 'experience' },
      { prompt: "Talk about an appointment you made as a child. What was the appointment for? Was it for a doctor, dentist or a new school? What did you do and what happened when you got to your appointment?", type: 'experience' },
      { prompt: "Unexpected things can happen when you make an appointment. Talk about memorable incident regarding an appointment. What exactly happened and how did you deal with the situation?", type: 'experience' },
    ],
  },
};

// Role-play scenarios organized by category
const roleplayScenarios: { prompt: string; type: 'roleplay' }[] = [
  // Housing role-plays
  { prompt: "You would like to find a house to live in. Call a management office and ask 3 or 4 questions about getting a house to live in.", type: 'roleplay' },
  { prompt: "You have moved in to the new house but found out that one of the window is broken. Call the repair shop, explain the situation, and why you have to get a window as soon as possible.", type: 'roleplay' },
  { prompt: "Tell me about a time when you broke something at home. What exactly happened and how did you solve the problem? Give me all the details from beginning to end.", type: 'roleplay' },
  
  // Travel role-plays
  { prompt: "Call a travel agency and ask 3–4 questions about a trip.", type: 'roleplay' },
  { prompt: "You booked a non-refundable ticket but cannot go. Call the agent, explain, and offer alternatives.", type: 'roleplay' },
  { prompt: "You missed the train. Call your friend, explain, and give alternatives.", type: 'roleplay' },
  { prompt: "Your flight was canceled. Call the travel agent and suggest solutions.", type: 'roleplay' },
  { prompt: "You want to buy a train ticket. Ask 3–4 questions at the ticket counter.", type: 'roleplay' },
  { prompt: "You want to rent a car. Ask questions at the rental agency.", type: 'roleplay' },
  { prompt: "You have problems with a rental car. Call the agency and explain.", type: 'roleplay' },
  
  // Hotel role-plays
  { prompt: "You arrive in a new city. Ask the reception 3–4 questions about your room.", type: 'roleplay' },
  { prompt: "There are no rooms available. Leave a message for your companions with alternatives.", type: 'roleplay' },
  { prompt: "You have a free day at the hotel. Ask the front desk what to do.", type: 'roleplay' },
  { prompt: "You left your bag in a taxi. Call the taxi company.", type: 'roleplay' },
  { prompt: "Call the hotel to ask 3–4 questions.", type: 'roleplay' },
  { prompt: "Your room is small and dirty. Call the front desk and make suggestions.", type: 'roleplay' },
  
  // Phone/Movie/Performance role-plays
  { prompt: "You want to buy a new cell phone. Call the store and ask 3–4 questions.", type: 'roleplay' },
  { prompt: "The features are not as expected. Call the store to return or exchange.", type: 'roleplay' },
  { prompt: "You want to take a friend to the movies. Call the theater for tickets.", type: 'roleplay' },
  { prompt: "You got the wrong tickets. Explain to the seller and offer alternatives.", type: 'roleplay' },
  { prompt: "You want to get tickets for a performance. Call the box office.", type: 'roleplay' },
  { prompt: "You are sick on the day of the performance. Call your friend and offer options.", type: 'roleplay' },
  
  // Furniture/Office/Internet role-plays
  { prompt: "You are at a store. Ask 3–4 questions about furniture.", type: 'roleplay' },
  { prompt: "There is a problem with delivered furniture. Call the store.", type: 'roleplay' },
  { prompt: "Your friend found a cool website. Ask questions about it.", type: 'roleplay' },
  { prompt: "You have a web browser problem. Call the internet help desk.", type: 'roleplay' },
  
  // Bar/Restaurant role-plays
  { prompt: "A new bar opened. Call your friend and ask questions.", type: 'roleplay' },
  { prompt: "You are not feeling well. Cancel the bar meet and give alternatives.", type: 'roleplay' },
  { prompt: "Your friend's birthday is at a bar. Ask questions about it.", type: 'roleplay' },
  { prompt: "You cannot go to the birthday because of a test. Give alternatives.", type: 'roleplay' },
  { prompt: "You forgot your wallet at a bar. Explain and offer alternatives.", type: 'roleplay' },
  { prompt: "Your friend's family opened a restaurant. Ask questions.", type: 'roleplay' },
  { prompt: "You got the wrong lunch delivery. Call the manager.", type: 'roleplay' },
  { prompt: "Call a new restaurant and ask questions.", type: 'roleplay' },
  
  // MP3/Recycling/News role-plays
  { prompt: "Ask your friend about an MP3 player.", type: 'roleplay' },
  { prompt: "You broke your friend's MP3. Explain and offer alternatives.", type: 'roleplay' },
  { prompt: "You want to borrow a bike. Ask questions.", type: 'roleplay' },
  { prompt: "The bike was run over by a truck. Explain and give suggestions.", type: 'roleplay' },
  { prompt: "Call the building manager about recycling.", type: 'roleplay' },
  { prompt: "A new resident is throwing garbage in recycling. Call the manager.", type: 'roleplay' },
  { prompt: "Subscribe to a newspaper. Ask questions.", type: 'roleplay' },
  { prompt: "You cannot access the online newspaper. Call the office.", type: 'roleplay' },
  
  // Interview/Nutritionist/Bank/Car role-plays
  { prompt: "Call a company before an interview and ask 3–4 questions.", type: 'roleplay' },
  { prompt: "You cannot make the interview. Call to reschedule.", type: 'roleplay' },
  { prompt: "Make a doctor appointment. Ask questions.", type: 'roleplay' },
  { prompt: "You cannot go to the doctor. Call to reschedule.", type: 'roleplay' },
  { prompt: "Open a bank account. Ask questions.", type: 'roleplay' },
  { prompt: "You left your bank card at a restaurant. Call the restaurant.", type: 'roleplay' },
  { prompt: "Enroll at a fitness center. Ask questions.", type: 'roleplay' },
  { prompt: "You cannot make a training session. Call to reschedule.", type: 'roleplay' },
  { prompt: "Call a nutritionist and ask questions.", type: 'roleplay' },
  { prompt: "You have car trouble. Call the service station.", type: 'roleplay' },
  { prompt: "You missed a business meeting due to car trouble. Call the client.", type: 'roleplay' },
  
  // Park/Friend Meeting/Party role-plays
  { prompt: "Your friend wants to go to the park. Ask 3–4 questions.", type: 'roleplay' },
  { prompt: "You cannot go to the park. Explain and give alternatives.", type: 'roleplay' },
  { prompt: "The park is closed. Call your friend and give alternatives.", type: 'roleplay' },
  { prompt: "You want to meet up on the weekend. Ask questions.", type: 'roleplay' },
  { prompt: "You are unable to meet. Give alternatives.", type: 'roleplay' },
  { prompt: "Help prepare a birthday party. Ask questions.", type: 'roleplay' },
  { prompt: "You cannot help prepare the party. Give alternatives.", type: 'roleplay' },
  { prompt: "You are invited to a holiday party. Ask questions.", type: 'roleplay' },
  { prompt: "You had a car accident and are late for a party. Give alternatives.", type: 'roleplay' },
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
      cooking: 'food',
    };

    const hobbyTopics = surveyAnswers.interests
      .map(i => interestToTopic[i])
      .filter(t => t && !topics.includes(t));
    
    hobbyTopics.forEach(t => topics.push(t));
  }

  // Add free time activities
  if (surveyAnswers.freeTime.length > 0) {
    if (surveyAnswers.freeTime.includes('clubbing')) {
      topics.push('bars');
    }
    if (surveyAnswers.freeTime.includes('movies')) {
      if (!topics.includes('movies')) topics.push('movies');
    }
  }

  // Add travel if they have travel experience
  if (surveyAnswers.travel.length > 0) {
    if (surveyAnswers.travel.includes('overseasTrip') || surveyAnswers.travel.includes('overseasBusiness')) {
      topics.push('overseasTrip');
    }
    topics.push('geography');
  }

  // Add internet (modern topic)
  topics.push('internet');

  // Add television
  topics.push('television');

  // Add family/friends
  topics.push('familyFriends');

  // Add shopping
  topics.push('shopping');

  // Add industry for higher forms
  topics.push('industry');

  // Add recycling/furniture for variety
  if (Math.random() > 0.5) {
    topics.push('recycling');
  } else {
    topics.push('furniture');
  }

  // Add more topics based on living situation
  if (surveyAnswers.living === 'family') {
    topics.push('holidays');
    topics.push('gatherings');
  }

  return topics;
}

// Validation function to ensure all questions come from the bank
function validateQuestionInBank(prompt: string, type: 'experience' | 'roleplay' | 'followup' | 'warmup'): boolean {
  // Warmup questions are handled separately
  if (type === 'warmup') {
    return true;
  }
  
  // Check if question exists in any topic thread
  for (const topicKey in topicThreads) {
    const thread = topicThreads[topicKey];
    const found = thread.questions.some(q => q.prompt === prompt && q.type === type);
    if (found) return true;
  }
  
  // Check if it's a role-play scenario
  if (type === 'roleplay') {
    const found = roleplayScenarios.some(rp => rp.prompt === prompt);
    if (found) return true;
  }
  
  return false;
}

// Generate personalized questions based on survey answers
export function generatePersonalizedQuestions(surveyAnswers: SurveyAnswers, formNumber: number): TestQuestion[] {
  const questions: TestQuestion[] = [];
  let questionId = 1;

  // Select topics based on survey
  const selectedTopics = selectTopics(surveyAnswers);
  
  console.log('📋 Selected topics for this test:', selectedTopics);

  // For each topic, add 3-5 questions from the topic thread
  selectedTopics.forEach(topicKey => {
    const thread = topicThreads[topicKey];
    if (!thread) {
      console.warn(`⚠️ Topic "${topicKey}" not found in question bank!`);
      return;
    }

    // Determine how many questions from this topic based on form level
    const questionCount = formNumber >= 3 ? 5 : formNumber >= 2 ? 4 : 3;
    const threadQuestions = thread.questions.slice(0, questionCount);

    console.log(`📚 Topic "${thread.topic}": Adding ${threadQuestions.length} questions`);

    threadQuestions.forEach((q, idx) => {
      // Validate question is in the bank
      if (!validateQuestionInBank(q.prompt, q.type)) {
        console.error(`❌ Question not found in bank: "${q.prompt}"`);
      }
      
      questions.push({
        id: `q${questionId++}`,
        prompt: q.prompt,
        type: q.type,
        timeLimit: formNumber >= 3 ? 120 : 90,
      });
    });
  });

  // Add 2-4 role-play scenarios for higher forms
  if (formNumber >= 2) {
    const roleplayCount = formNumber >= 3 ? 4 : 2;
    const selectedRoleplays = roleplayScenarios
      .sort(() => Math.random() - 0.5)
      .slice(0, roleplayCount);

    console.log(`🎭 Adding ${selectedRoleplays.length} role-play scenarios`);

    selectedRoleplays.forEach(rp => {
      // Validate role-play is in the bank
      if (!validateQuestionInBank(rp.prompt, 'roleplay')) {
        console.error(`❌ Role-play not found in bank: "${rp.prompt}"`);
      }
      
      questions.push({
        id: `q${questionId++}`,
        prompt: rp.prompt,
        type: 'roleplay',
        timeLimit: formNumber >= 3 ? 120 : 90,
      });
    });
  }

  console.log(`✅ Total questions generated: ${questions.length}`);
  
  // Final validation - ensure all questions are from the bank
  const allValid = questions.every(q => validateQuestionInBank(q.prompt, q.type));
  if (!allValid) {
    console.error('❌ VALIDATION FAILED: Some questions are not from the question bank!');
  } else {
    console.log('✅ VALIDATION PASSED: All questions are from the question bank');
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

// Export function to get total question count in the bank (for debugging)
export function getQuestionBankStats(): { totalTopics: number; totalQuestions: number; totalRoleplays: number } {
  const totalTopics = Object.keys(topicThreads).length;
  let totalQuestions = 0;
  
  for (const topicKey in topicThreads) {
    totalQuestions += topicThreads[topicKey].questions.length;
  }
  
  return {
    totalTopics,
    totalQuestions,
    totalRoleplays: roleplayScenarios.length,
  };
}
