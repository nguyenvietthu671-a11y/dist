# OPIc Practice Platform

A web-based practice platform for the OPIc (Oral Proficiency Interview by Computer) test, targeting the Advanced Low (AL) level.

## 🌐 Live Demo

Visit: `https://YOUR_USERNAME.github.io/opic-practice-platform/`

## ✨ Features

- **Interactive Practice Sessions**: Real-time voice recording with live transcription
- **Personalized Question Bank**: 200+ questions across 7 topics (Geography, Furniture, Housing, Music, Movies, Family/Friends, Technology)
- **ACTFL-Aligned Scoring**: Automated evaluation based on Function, Accuracy, Content, and Text Type
- **Progressive Difficulty**: Questions adapt based on your self-assessment level
- **Real-time Feedback**: Live speech-to-text transcription and word count tracking
- **Comprehensive Analytics**: Detailed performance breakdown and improvement suggestions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser with microphone support (Chrome/Edge recommended)
- Stable internet connection for speech recognition

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd opic-practice-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📖 How to Use

1. **Background Survey**: Fill out information about your employment, living situation, free time activities, interests, sports, and travel experience
2. **Self-Assessment**: Select your current proficiency level (Novice, Intermediate, Advanced, Superior, or Distinguished)
3. **Practice Test**: Answer 12-15 questions (1 warm-up + 11-14 main questions) with voice or text input
4. **Results**: View your detailed scores across 4 assessment factors and get personalized improvement suggestions

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Speech Recognition**: Web Speech API
- **Icons**: Lucide React

## 🌍 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ⚠️ Firefox (Limited speech recognition support)
- ❌ Safari (Not recommended)

## 📦 Deployment

### Deploy to GitHub Pages

This project includes a GitHub Actions workflow for automatic deployment to GitHub Pages.

#### Setup Steps:

1. **Create a new repository on GitHub**:
   - Go to [github.com](https://github.com)
   - Click "+" → "New repository"
   - Name it `opic-practice-platform` (or your preferred name)
   - Keep it public (required for free GitHub Pages)

2. **Update vite.config.js**:
   - Change the `base` path to match your repository name:
   ```javascript
   base: '/your-repo-name/', // Replace with your actual repo name
   ```

3. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/opic-practice-platform.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically build and deploy on every push to `main`

5. **Access your deployed site**:
   - After the workflow completes (2-3 minutes), your site will be available at:
   - `https://YOUR_USERNAME.github.io/opic-practice-platform/`

### Alternative Deployment Options

- **Netlify**: Drag and drop the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel**: Import your GitHub repository at [vercel.com](https://vercel.com)

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

If you encounter any issues, please open an issue on GitHub.
