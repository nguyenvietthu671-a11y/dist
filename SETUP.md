# OPIc Practice Platform - Setup Guide

## Quick Start

1. Create folder: `opic-practice`
2. Copy all files from this project
3. Run: `npm install`
4. Run: `npm run dev`
5. Open: `http://localhost:5173`

## Deploy to Netlify

1. Run: `npm run build`
2. Drag `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

## Project Structure

```
opic-practice/
├── index.html
├── package.json
├── vite.config.js
├── tsconfig.json
├── netlify.toml
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types.ts
    ├── components/
    │   ├── Avatar.tsx
    │   ├── Welcome.tsx
    │   ├── BackgroundSurvey.tsx
    │   ├── SelfAssessment.tsx
    │   ├── TestInterface.tsx
    │   └── Results.tsx
    ├── data/
    │   └── testQuestions.ts
    ├── hooks/
    │   ├── useSpeechRecognition.ts
    │   └── useSpeechSynthesis.ts
    └── utils/
        └── scoring.ts
```
