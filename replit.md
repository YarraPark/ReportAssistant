# TeachAssist.ai - Project Documentation

## Overview

A professional AI-powered student report generation tool for educators with a clean, modern interface. This is a stateless web app designed as a foundation for LLM integration.

**Created**: November 4, 2025
**Status**: Foundation Complete - Ready for LLM Integration
**Architecture**: Single-page React application with Express backend

## Recent Changes

### November 4, 2025 - Initial Implementation
- ✅ Created single-page interface with centered layout
- ✅ Implemented large textarea for student information input
- ✅ Added Generate Report and Clear action buttons
- ✅ Created placeholder report display area
- ✅ Configured ESLint for code quality
- ✅ Configured Prettier for code formatting
- ✅ Added Railway deployment configuration
- ✅ Set up clean, minimal UI with Tailwind CSS and Shadcn components
- ✅ Implemented placeholder `generateReport()` function with clear comments for future LLM integration

## Project Architecture

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Express.js, Node.js
- **Build**: Vite (frontend), ESBuild (backend)
- **Tooling**: ESLint, Prettier
- **Deployment**: Railway-ready

### Key Design Decisions
1. **Stateless Architecture**: No database required - pure input/output flow
2. **Minimal Design**: Google-homepage-style centered layout with generous whitespace
3. **Foundation-First**: Placeholder LLM function ready for easy integration
4. **Production Ready**: Full tooling setup with linting, formatting, and deployment configs

## File Structure

```
├── client/src/pages/home.tsx     # Main page component with input/output UI
├── shared/schema.ts               # Zod schemas for type safety
├── server/routes.ts               # API routes (ready for /api/generate-report)
├── .eslintrc.json                 # ESLint configuration
├── .prettierrc.json               # Prettier configuration
├── railway.json                   # Railway deployment config
└── design_guidelines.md           # UI/UX design specifications
```

## Future Integration Points

### LLM Integration (Next Phase)
The application has a clearly marked integration point in `client/src/pages/home.tsx`:

```typescript
// TODO: LLM Integration will go here
// This is where we'll connect to an LLM API (OpenAI, Anthropic, etc.)
// to generate actual school reports based on the student information
```

**Steps for Integration:**
1. Choose LLM provider (OpenAI GPT-4, Anthropic Claude, etc.)
2. Create `/api/generate-report` endpoint in `server/routes.ts`
3. Connect frontend to backend API
4. Add report templates and formatting logic
5. Implement error handling and validation

## User Preferences

- **Minimalism**: Keep it simple - no unnecessary features
- **Clean Code**: ESLint and Prettier enforced
- **Stateless**: No database complexity
- **Foundation Focus**: Build for extensibility, not completeness

## Development Guidelines

### Running the Application
```bash
npm run dev  # Development server on port 5000
```

### Code Quality
```bash
# Linting (configured in .eslintrc.json)
npm run lint
npm run lint:fix

# Formatting (configured in .prettierrc.json)
npm run format
npm run format:check
```

### Deployment
- Railway configuration is in `railway.json`
- Start command: `npm run start`
- Build command: `npm run build`

## Notes

- No OSV scanner was mentioned in requirements - can be added if needed
- The app uses in-memory storage infrastructure but doesn't require it (stateless)
- All design follows the specifications in `design_guidelines.md`
- Frontend uses Shadcn UI components for consistency and polish
