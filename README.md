# Moodboard AI Generator

A web application to generate 5-color moodboards based on user prompts, using either a mock AI or the OpenAI API.

## Features

- Generate color palettes based on user prompts.
- Supports both a mock AI (for development/testing) and the real AI (OpenAI GPT-4).
- Loading page with animated planets and progress tracking.
- Results page displaying generated palette with color names and hex codes.
- Responsive and styled with Tailwind CSS.
- Navigation between pages using React Router.

## Getting Started

### Prerequisites

- Node.js 18+  
- NPM or Yarn  
- OpenAI API Key (for real AI mode)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/davidsd29/ai-moodboard.git
cd moodboard-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a .env file
API_KEY=your_openai_api_key_here
PORT=3000

### Running the project

```bash
npm run dev
# or
yarn dev
```

##How it Works

1.User enters a prompt in the Generate Page.

2.Depending on the mode (mock AI / real AI):

- Mock AI: Generates a pre-defined moodboard and simulates a loading progress.

- Real AI: Calls OpenAI API to generate a color palette.

3.LoadingPage shows progress and waits until the AI result is ready.

4.ResultsPage displays the palette with colors and hex codes.

5.User can regenerate or start a new prompt.
