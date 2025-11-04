# TeachAssist.ai

A professional, AI-powered student report generation tool for educators with a clean, modern interface.

## Overview

This is a foundation application built with React, Express, and TypeScript. It features a simple, centered interface where users can input student information to generate reports. The LLM integration is currently a placeholder ready for future implementation.

## Features

- **Clean Single-Page Interface**: Google-homepage-style centered layout
- **Large Text Input**: Spacious textarea for entering student information
- **Action Buttons**: Generate Report and Clear functionality
- **Placeholder Report Display**: Area for displaying generated reports
- **Stateless Architecture**: No database required - pure input/output flow
- **Production Ready**: Configured for Railway deployment

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **Build Tools**: Vite, ESBuild
- **Code Quality**: ESLint, Prettier
- **Deployment**: Railway (configured)

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Code Quality

ESLint and Prettier are configured and ready to use:

- **ESLint**: Configuration in `.eslintrc.json`
- **Prettier**: Configuration in `.prettierrc.json`

You can run them manually:

```bash
# Lint
npx eslint . --ext .ts,.tsx,.js,.jsx

# Format
npx prettier --write "**/*.{ts,tsx,js,jsx,json,css,md}"
```

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   └── lib/           # Utilities and helpers
│   └── index.html
├── server/                # Backend Express application
│   ├── routes.ts          # API routes
│   ├── storage.ts         # In-memory storage (not used for stateless app)
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
│   └── schema.ts          # Zod schemas and TypeScript types
└── railway.json           # Railway deployment configuration
```

## Future Development

### Next Steps (LLM Integration)

The `generateReport()` function in `client/src/pages/home.tsx` is currently a placeholder. To implement actual report generation:

1. **Choose an LLM Provider**: OpenAI GPT-4, Anthropic Claude, etc.
2. **Set Up API Endpoint**: Create `/api/generate-report` in `server/routes.ts`
3. **Implement API Call**: Connect the endpoint to your chosen LLM API
4. **Define Report Templates**: Structure the prompts for consistent report formats
5. **Add Error Handling**: Implement proper error states and validation
6. **Add Export Features**: Enable downloading/printing of generated reports

### Example Integration Point

```typescript
// In server/routes.ts
app.post('/api/generate-report', async (req, res) => {
  const { studentInfo } = req.body;
  
  // TODO: Call LLM API here
  // const report = await openai.chat.completions.create({...});
  
  res.json({ content: report, generatedAt: new Date().toISOString() });
});
```

## Deployment

This project is configured for Railway deployment:

1. Connect your repository to Railway
2. Railway will automatically detect the configuration
3. Set any required environment variables (API keys, etc.)
4. Deploy!

The `railway.json` file contains all necessary deployment settings.

## License

MIT
