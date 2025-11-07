# TeachAssist.ai - Current State

**Last Updated:** 2025-11-07
**Database:** Neon PostgreSQL (Connected ✅)
**ORM:** Prisma
**Schema Naming:** camelCase
**Status:** Operational - Database tables created, Admin dashboard live

---

## ✅ Recent Milestones

- **Prisma Migration Complete**: Migrated from Drizzle to Prisma ORM
- **Database Setup**: All 6 tables created and operational
- **Admin Dashboard**: Fully functional at `/admin` with 7 API endpoints
- **Report Prompt Updated**: Improved tone guidance to avoid excessive adjectives and focus on observable behaviors

---

## 📊 Database Schema (6 Tables)

### User
- id, email (unique), name, createdAt, updatedAt, lastActiveAt
- currentTier (free/monthly/yearly), monthlyRequestsUsed, monthlyRequestsLimit
- lastResetDate (auto-resets every 30 days), ipAddress, country, referralSource

### Subscription
- id, userId → User, stripeSubscriptionId, stripeCustomerId
- status (active/cancelled/past_due/trialing), tier, priceUsd (13.99 or 129.99)
- currentPeriodStart, currentPeriodEnd, cancelAtPeriodEnd, cancelledAt

### SavedResponse
- id, userId → User, title, type (reportCommentary/learningPlan/lessonPlan)
- inputText, generatedContent, conversationHistory (JSON), isFavorite, wordCount

### UsageLog
- id, userId → User, sessionId, requestType (generate/refine)
- assistantType, tokensInput, tokensOutput, costUsd, responseTimeMs, model
- wasSuccessful, errorMessage

### Session
- id, userId → User (nullable), ipAddress, userAgent, country, city
- referrer, landingPage, isAnonymous, startedAt, lastActivityAt, endedAt, durationSeconds

### Event
- id, sessionId → Session, userId → User (nullable)
- eventType (pageView/buttonClick/signupStarted/etc), eventCategory, eventLabel, eventValue
- metadata (JSON)

---

## 🗂️ Key Files

**Database:**
- `prisma/schema.prisma` - Complete Prisma schema (6 models)
- `server/db.ts` - Prisma Client singleton
- `.env.example` - Environment template

**Utilities:**
- `server/utils/subscription.ts` - Usage limits (getTierLimits, checkUsageLimit, incrementUsage, resetMonthlyUsage)
- `server/utils/tracking.ts` - Session/event tracking (createSession, trackEvent, updateSessionActivity, endSession)
- `server/utils/adminMetrics.ts` - Analytics (MRR, churn, conversion, costs, tokens)
- `server/middleware/tracking.ts` - Auto session tracking middleware (captures IP, UA, referrer)

**Application:**
- `server/index.ts` - Express server with Prisma $connect() test
- `server/routes.ts` - Main API routes (with admin routes registered)
- `server/routes/admin.ts` - Admin API endpoints (7 routes)
- `server/vite.ts` - Vite middleware (fixed to exclude /api routes)
- `client/src/pages/home.tsx` - Main React UI
- `client/src/pages/admin.tsx` - Admin dashboard page
- `client/src/hooks/useAdminData.ts` - Admin data fetching hooks
- `config/prompts.ts` - System prompts & model config

**Documentation:**
- `scripts/COPY-SCHEMA.md` - Deployment guide
- `scripts/setup-database.md` - Database setup instructions
- `current.md` - This file

---

## 🔧 Available Commands

```bash
npm run dev           # Development server
npm run build         # Production build
npm run check         # TypeScript check
npm run db:push       # Push schema (fast, no migrations)
npm run db:studio     # Prisma Studio GUI
npm run db:generate   # Regenerate Prisma Client
npm run db:migrate    # Create & apply migrations
```

---

## 🎯 Usage Limits

| Tier    | Requests/Month | Price    | Auto-Reset |
|---------|----------------|----------|------------|
| Free    | 10             | $0.00    | 30 days    |
| Monthly | 300            | $13.99   | 30 days    |
| Yearly  | 400            | $129.99  | 30 days    |

---

## 🔑 Utility Functions Reference

**Subscription (`server/utils/subscription.ts`):**
```typescript
getTierLimits(tier: string): number  // Returns limit for tier
checkUsageLimit(userId): Promise<{allowed, remaining}>  // Auto-resets after 30 days
incrementUsage(userId): Promise<void>  // +1 to monthlyRequestsUsed
resetMonthlyUsage(userId): Promise<void>  // Resets counter
```

**Tracking (`server/utils/tracking.ts`):**
```typescript
createSession(data: CreateSessionData): Promise<string>  // Returns sessionId
trackEvent(data: TrackEventData): Promise<void>  // Logs actions
updateSessionActivity(sessionId): Promise<void>  // Updates lastActivityAt
endSession(sessionId): Promise<void>  // Closes session, calculates duration
```

**Admin Metrics (`server/utils/adminMetrics.ts`):**
```typescript
getMonthlyRecurringRevenue(): Promise<number>  // MRR calculation
getNewSignupsCount(days): Promise<number>
getActiveUsersCount(days): Promise<number>
getChurnRate(): Promise<number>  // Cancellation %
getConversionRate(): Promise<number>  // Anonymous → Signup %
getAverageRequestsPerUser(): Promise<number>
getPopularAssistantTypes(): Promise<{type, count}[]>
getTotalApiCosts(days): Promise<number>
getTotalTokensUsed(days): Promise<{input, output, total}>
```

---

## 📦 Application Features

### Three Assistant Types
1. **Report Commentary** - Natural paragraph reports (150-200 words)
   - Updated prompt: Avoids excessive adjectives, focuses on observable behaviors
   - Balanced tone: Mentions both strengths and areas for development
2. **Learning Plan** - Victorian Govt template (8 areas)
3. **Lesson Plan** - NSW Dept structure (5 stages)

### UI Features
- Tab-based navigation (independent state)
- Context-specific refinement buttons (9 for Report, 6 for Learning/Lesson)
- Batched refinements (select multiple, refine once)
- Rich text copy (HTML + plain text for Word)
- Sticky copy button
- HTML rendering (**bold**, bullets, numbers)
- Generation history (last 10 per tab)
- localStorage persistence

### Admin Dashboard (`/admin`)
- **Overview Cards**: Total Users, Active Users (30d), MRR, New Signups (7d)
- **Revenue Breakdown**: Distribution by subscription tier
- **Usage Statistics**: Total requests, avg per user, popular assistant types
- **Recent Activity**: Recent signups and usage logs
- **Key Metrics**: Churn rate, conversion rate
- **User Management**: Searchable, paginated user list (20 per page)
- **Auto-refresh**: Updates every 30-60 seconds

### Middleware
- **Tracking middleware** (`server/middleware/tracking.ts`):
  - Auto-captures sessions (IP, UA, referrer, landing page)
  - Creates/updates sessions on each request
  - Stores sessionId in cookie: `ta_session_id` (30 days)
  - Attaches sessionId to req object

---

## 🚀 Next Development Steps

### Priority 1: Database Setup ✅ COMPLETE
- [x] Add DATABASE_URL to Replit Secrets
- [x] Run `npm run db:push`
- [x] Verify connection ("✓ Prisma connected to database successfully")

### Priority 2: Authentication
- [ ] Choose auth strategy (Passport, NextAuth, custom)
- [ ] Implement user registration/login
- [ ] Hash passwords (bcrypt)
- [ ] Create session management
- [ ] Add protected routes

### Priority 3: Stripe Integration
- [ ] Set up Stripe account & keys
- [ ] Create subscription products (Monthly $13.99, Yearly $129.99)
- [ ] Implement Stripe Checkout
- [ ] Handle webhooks (subscription.created, subscription.updated, subscription.deleted)
- [ ] Update user currentTier on successful payment
- [ ] Implement subscription management (upgrade/downgrade/cancel)

### Priority 4: API Endpoints
- [ ] POST /api/auth/register - Create user
- [ ] POST /api/auth/login - Authenticate user
- [ ] POST /api/auth/logout - End session
- [x] POST /api/generate-report - Generate AI content ✅
- [ ] GET /api/saved-responses - List user's saved responses
- [ ] POST /api/saved-responses - Save response
- [ ] DELETE /api/saved-responses/:id - Delete saved response
- [ ] GET /api/usage - Get user's usage stats
- [x] GET /api/admin/overview - Overview metrics ✅
- [x] GET /api/admin/revenue-breakdown - Revenue by tier ✅
- [x] GET /api/admin/usage-stats - Usage statistics ✅
- [x] GET /api/admin/recent-signups - Recent signups ✅
- [x] GET /api/admin/recent-usage - Recent usage ✅
- [x] GET /api/admin/metrics - Churn & conversion ✅
- [x] GET /api/admin/users - Paginated user list ✅

### Priority 5: Frontend Pages
- [ ] Landing page with pricing
- [ ] Signup/Login forms
- [ ] Dashboard (usage stats, saved responses)
- [ ] Pricing page with Stripe checkout
- [ ] Account settings (manage subscription)
- [x] Admin panel at `/admin` ✅

### Priority 6: Usage Enforcement
- [ ] Middleware to check usage limits before generation
- [ ] Increment usage after successful generation
- [ ] Return 429 error when limit reached
- [ ] Display remaining requests in UI
- [ ] Auto-reset job (optional, or check on each request)

---

## 🔍 Environment Variables

**Required:**
- `DATABASE_URL` - Neon PostgreSQL connection (add to Replit Secrets)
- `OPENROUTER_API_KEY` - For Claude API access

**Optional:**
- `SESSION_SECRET` - Express session secret
- `STRIPE_SECRET_KEY` - Stripe API key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing
- `PORT` - Server port (default: 5000)

---

## 📝 Migration & Recent Changes

**Prisma Migration (Completed):**
- ✅ Removed Drizzle ORM (drizzle-orm, drizzle-zod, drizzle-kit)
- ✅ Added Prisma ORM (@prisma/client, prisma)
- ✅ Created prisma/schema.prisma with 6 models
- ✅ Updated all utilities to use Prisma queries
- ✅ Created Prisma Client singleton pattern
- ✅ Enhanced server/db.ts with detailed logging
- ✅ Generated Prisma Client (node_modules/@prisma/client)

**Admin Dashboard (Completed):**
- ✅ Created 7 admin API endpoints at `/api/admin/*`
- ✅ Built comprehensive dashboard UI at `/admin`
- ✅ Implemented React Query hooks for data fetching
- ✅ Fixed Vite catch-all route to exclude `/api` requests
- ✅ Added detailed error logging and diagnostics
- ✅ Auto-refresh functionality (30-60 seconds)

**Report Prompt Updates:**
- ✅ Updated to avoid excessive adjectives ("delightful", "excellent", etc.)
- ✅ Emphasis on observable behaviors over character judgments
- ✅ More direct, action-focused language
- ✅ Improved example style for balanced commentary

**Files Deleted:**
- drizzle.config.ts
- shared/schema.ts
- drizzle/ folder

**Database Status:**
- Schema defined ✅
- Prisma Client generated ✅
- Tables created in Neon ✅
- Connection operational ✅

---

## 📊 Admin Dashboard Endpoints

All endpoints fully functional and returning JSON:

| Endpoint | Method | Description | Status |
|----------|--------|-------------|--------|
| `/api/admin/overview` | GET | Total users, active users, MRR, signups | ✅ |
| `/api/admin/revenue-breakdown` | GET | Revenue distribution by tier | ✅ |
| `/api/admin/usage-stats` | GET | Total requests, avg/user, popular types | ✅ |
| `/api/admin/recent-signups` | GET | Last 10 new users | ✅ |
| `/api/admin/recent-usage` | GET | Last 10 API requests | ✅ |
| `/api/admin/metrics` | GET | Churn & conversion rates | ✅ |
| `/api/admin/users` | GET | Paginated user list with search | ✅ |

---

**Last Updated:** 2025-11-07
**Session Context:** Completed Prisma migration, implemented full admin dashboard with 7 endpoints, updated report prompt for more balanced tone, fixed Vite API routing, database operational
