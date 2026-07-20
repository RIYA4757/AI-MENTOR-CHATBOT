# AI Mentor Chatbot

AI Mentor Chatbot is a web-based application that allows users to interact with two AI mentors inspired by Hitesh Choudhary and Piyush Garg. Each mentor has a unique communication style and teaching approach, providing a more engaging learning experience.

The chatbot is powered by the Gemini API and can also recommend relevant learning resources using the Tavily Search API.

---

## Live Demo

Frontend: https://your-vercel-url.vercel.app

Backend: https://your-render-url.onrender.com

---

## Features

- Two AI mentor personas
- Context-aware conversations
- Learning resource recommendations using Tavily Search
- Responsive design for desktop and mobile
- Separate conversation history for each mentor
- Fast and lightweight user interface

---

## How the Mentors Work

The mentors are powered by the Gemini API and guided using carefully designed system prompts. Instead of training a custom AI model, prompt engineering is used to define each mentor's personality, communication style, tone, and teaching approach. This allows the chatbot to maintain two distinct mentor experiences while generating intelligent and relevant responses.

---

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js

### AI & APIs

- Google Gemini API
- Tavily Search API

### Deployment

- Vercel
- Render

---

## Project Structure

```
AI-MENTOR-CHATBOT
│
├── backend
│   ├── personas
│   ├── routes
│   ├── services
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── images
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/RIYA4757/AI-MENTOR-CHATBOT.git
```

Navigate to the project

```bash
cd AI-MENTOR-CHATBOT
```

Install backend dependencies

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
TAVILY_API_KEY=YOUR_TAVILY_API_KEY
```

Start the backend

```bash
npm start
```

Run the frontend using Live Server or any static web server.

---

## How It Works

1. Select a mentor.
2. Enter your question.
3. The backend sends the request to Gemini AI.
4. If the query is related to learning resources, Tavily searches the web for relevant recommendations.
5. The chatbot responds while maintaining the selected mentor's personality and conversation context.


---

## Known Limitations

- Uses the Gemini API Free Tier.
- Daily API quota limits may temporarily prevent responses until the quota resets.
- External AI services may occasionally experience temporary high-demand errors.

---

## Future Improvements

- Persistent chat history
- Streaming AI responses
- Better loading animations
- Markdown support
- Additional AI mentor personas
- User authentication

---

## Acknowledgements

- Google Gemini API
- Tavily Search
- Render
- Vercel

---

## Author

Riya Paul

GitHub: https://github.com/RIYA4757
