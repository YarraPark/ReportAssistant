# TeachAssist.ai - Current State

## Project Overview
AI-powered educational assistant for generating school reports, learning plans, and lesson plans.
Stack: React + TypeScript frontend, Express backend, OpenRouter API (Claude 3.5 Haiku)

## Key Features

### Three Assistant Types
1. **Report Assistant**: Generates natural paragraph-form report commentary (150-200 words)
2. **Learning Plan Assistant**: Victorian Government template with 8 learning areas
3. **Lesson Plan Assistant**: NSW Department of Education structure with 5 lesson stages

### Core Functionality
- Tab-based navigation with independent state per tab
- Context-specific refinement buttons (different for each assistant type)
- Batched refinement system (select multiple options, refine once)
- Rich text copy with Word formatting (HTML + plain text)
- Sticky copy button (stays visible when scrolling)
- HTML content rendering with proper bold headers and lists
- Tab content persistence using localStorage
- Generation history (last 10 per tab, expandable cards with selectable text)
- Clear button (light grey background, preserves history)

## File Structure

### Frontend
- `client/src/pages/home.tsx` - Main React component (all UI logic)
- `client/src/App.tsx` - Router setup
- `client/public/TeachAssist Logo.svg` - App logo

### Backend
- `server/routes.ts` - API endpoint `/api/generate-report`
- `server/index.ts` - Express server setup
- `config/prompts.ts` - System prompts and model configuration

### Configuration
- `.eslintrc.json` (deprecated) - migrated to `eslint.config.js`
- `.prettierrc.json` - Code formatting rules
- `package.json` - Dependencies and scripts

## Recent Changes (Latest First)

### Rich Text Copy & Word Formatting (Just Completed)
- **Rich HTML Copy**: Content now copies with formatting preserved for Word
  - **Bold headers** paste as actual bold text
  - Bullet lists paste as proper Word bullets (not dashes)
  - Numbered lists paste as proper Word numbering
  - Dual-format clipboard (HTML + plain text fallback)
- **HTML Rendering**: Content displays with rich formatting in app
  - `**text**` renders as bold headers
  - `- ` converts to bullet points
  - `1. ` converts to numbered lists
  - Proper paragraph spacing and structure
- **System Prompts Updated**: Now instruct AI to use `**text**` for bold formatting
- **convertToHTML Function**: Converts markdown-style text to proper HTML for display and copy

### Formality Refinement Buttons (Report Assistant)
- Added "Make More Formal" button for traditional academic language
- Added "Make Less Formal" button for warmer, conversational tone
- Only available for Report Commentary (not Learning/Lesson Plans)
- Now 9 total refinement buttons for Report Assistant

### Output Title Terminology Update
- Changed from "Generated [Type]" to "Polished Draft [Type]"
- Report: "Polished Draft Commentary"
- Learning Plan: "Polished Draft Learning Plan"
- Lesson Plan: "Polished Draft Lesson Plan"
- Emphasizes refined teacher input, not AI-generated from scratch

### Clear Button & History Panel Fix
- **Clear Button**: Added light grey background (`bg-slate-100`) for better visibility
- **History Panel**: Moved outside generatedOutput conditional
  - Now remains visible after clicking Clear
  - History persists independently of current draft
  - Users can access saved generations even after clearing current work

### Copy Button Improvements
- **Sticky Positioning**: Button stays visible when scrolling long content
- **Location**: Inside grey content box (top-right corner)
- **Fixed overflow issue**: Removed `overflow-hidden` from parent Card
- Always visible and accessible while viewing generated content

### History Card Text Selection Fix
- **Separate Click Zones**: Header/toggle vs content areas
- **Clickable Header**: Timestamp and chevron area toggles expand/collapse
- **Selectable Content**: Text in expanded cards can be freely selected and copied
- **Event Handling**: `stopPropagation()` prevents content clicks from collapsing card
- Improved UX with appropriate cursors (pointer vs text)

### Report Prompt Update
- Eliminated ALL structural formatting from report commentary
- Now generates ONLY natural flowing paragraphs
- NO headers, NO bullet points, NO section titles
- 2-3 paragraphs, ~4 sentences each
- Focus on natural teacher voice

### History Improvements
- Redesigned history button to be more prominent
- Full-width bordered button with hover effects
- Multiple cards can be expanded simultaneously
- No nested scrolling - cards expand naturally
- Chevron rotates 90° when expanded

### Content Persistence
- localStorage saves current content per tab
- History saves last 10 generations per tab
- Tab switching preserves state
- Keys: `teachassist_[type]_current` and `teachassist_[type]_history`

### Refinement System
- Context-specific buttons per assistant type
- Report: 9 buttons (positive/negative, formal/informal, specific, strengths, growth, shorten, detail)
  - "Make More Positive" / "Make Less Positive"
  - "Make More Formal" / "Make Less Formal" (NEW)
  - "Make More Specific"
  - "Focus on Strengths" / "Focus on Growth Areas"
  - "Shorten" / "Add More Detail"
- Learning Plan: 6 buttons (detail, concise, activities, resources, specific, practical)
- Lesson Plan: 6 buttons (detail, concise, differentiation, assessment, activities, scaffolding)
- Batched refinements with single "Refine" button
- Toggleable selection (teal background when selected)

## System Prompts

### Report Commentary (config/prompts.ts)
- **Format**: Natural paragraphs ONLY, NO structural elements
- **Length**: 150-200 words
- **Structure**: Academic → Behavior → Recommendations (woven naturally)
- **Tone**: Formal, constructive, growth mindset
- **Refinement**: Selective updates (specific aspect vs general)

### Learning Plan
- Victorian Government template with 8 learning areas
- Structured sections with **bold headers** (using `**text**` format)
- Bullet lists using `- ` converted to HTML for Word compatibility
- Subject names in bold (e.g., **English**, **Mathematics**)

### Lesson Plan
- NSW Department of Education structure
- 5 lesson stages (Review, I do, We do, You do, Closure)
- **Bold headers** for sections (using `**text**` format)
- Numbered lists for stages, bullet lists for details
- Auto-converted to rich HTML for proper Word formatting

## Technical Details

### State Management
- React hooks (useState, useEffect)
- Set-based selection tracking for refinements and expanded history items
- localStorage for persistence
- No external state management library

### API Integration
- Single endpoint: POST `/api/generate-report`
- Accepts: `studentInfo`, `type`, `conversationHistory`
- Returns: `{ report: string }`
- Model: anthropic/claude-3.5-haiku (configurable in config/prompts.ts)

### HTML Conversion & Rich Text Copy
- **convertToHTML Function**: Converts markdown-style text to HTML
  - `**text**` → `<strong>text</strong>` (bold)
  - `- ` → `<ul><li>` (bullet lists)
  - `1. ` → `<ol><li>` (numbered lists)
  - Handles nested lists with proper indentation
  - Wraps paragraphs in `<p>` tags
- **Clipboard API**: Writes both HTML and plain text formats
  - Word/rich text editors use HTML version
  - Plain text editors use fallback version
- **Content Display**: Uses `dangerouslySetInnerHTML` with Tailwind styling
  - Custom classes for `<p>`, `<strong>`, `<ul>`, `<ol>`, `<li>`
  - Proper spacing that translates to Word
  - No markdown symbols visible to users

### Styling
- Tailwind CSS with custom color scheme (teal primary)
- shadcn/ui components
- Responsive design (max-w-3xl containers)
- Gradient header (teal-600 to cyan-600)

## Code Quality
- TypeScript strict mode
- ESLint v9 flat config (eslint.config.js)
- Prettier formatting
- No linting/formatting warnings

## Environment Variables
- `OPENROUTER_API_KEY` - Required for API access
- `PORT` - Server port (default: 5000)

## Scripts
- `npm run dev` - Development server
- `npm run build` - Production build (Vite + esbuild)
- `npm run check` - TypeScript type checking
- `npm start` - Production server

## Known Issues/Notes
- npm audit shows 5 moderate vulnerabilities (dev dependencies: esbuild, vite, drizzle-kit)
- These are development-only and would require breaking changes to fix
- Browserslist data is 13 months old (cosmetic warning)

## TODO List (Completed)
All recent tasks completed:
- ✅ Rich text copy with HTML formatting for Word
- ✅ Formality refinement buttons (Report Assistant)
- ✅ Output title terminology ("Polished Draft" instead of "Generated")
- ✅ History panel independence from Clear button
- ✅ Sticky copy button with proper positioning
- ✅ History card text selection (separate click zones)
- ✅ Clear button styling (light grey background)
- ✅ HTML rendering with bold headers and lists
- ✅ System prompts updated for **text** formatting
- ✅ Context-specific refinement buttons
- ✅ Batched refinement system
- ✅ Content persistence and history
- ✅ History UI redesign (no nested scrolling)
- ✅ Report prompt update (natural paragraphs only)

## Next Possible Enhancements
- Export history as PDF/Word document
- User authentication
- Multiple student profiles
- Template library
- Bulk generation
- Email/share functionality

## Important Patterns

### localStorage Keys
```typescript
teachassist_report_current
teachassist_report_history
teachassist_learningplan_current
teachassist_learningplan_history
teachassist_lessonplan_current
teachassist_lessonplan_history
```

### Frontend System Prompts
System prompts are duplicated in `client/src/pages/home.tsx` for conversation history.
Keep these in sync with `config/prompts.ts` when making changes.

---
Last Updated: 2025-11-04
Session Context: Implemented rich text copy with HTML formatting for Word, added formality buttons, fixed sticky copy button and history card text selection
