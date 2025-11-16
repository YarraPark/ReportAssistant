# Claude Development Rules & Guidelines

## 🚨 CRITICAL RULES - NEVER VIOLATE

### Database Schema Changes
**ALWAYS CREATE PRISMA MIGRATION FILES FOR ANY SCHEMA CHANGE**

- **NEVER** use `npx prisma db push` alone for schema changes
- **ALWAYS** create a proper migration file in `prisma/migrations/`
- **Development and Production databases must be kept in sync via migration files**

**Correct workflow for schema changes:**
1. Modify `prisma/schema.prisma`
2. Create migration directory: `prisma/migrations/YYYYMMDDHHMMSS_descriptive_name/`
3. Write the SQL migration in `migration.sql`
4. Apply migration: `npx prisma migrate deploy` (production) or `npx prisma migrate dev` (local)
5. Update Prisma Client: `npx prisma generate`

**Why this matters:**
- `db push` only updates the development database
- Production deployments need migration files to apply changes
- Migration files provide a version-controlled history of all schema changes
- Team members need migrations to sync their local databases

**Example Migration File Structure:**
```
prisma/migrations/
└── 20251107080111_make_usage_log_user_id_optional/
    └── migration.sql
```

---

## 📋 Project-Specific Guidelines

### Database (Prisma + PostgreSQL)
- **ORM**: Prisma (not Drizzle)
- **Database**: Neon PostgreSQL
- **Naming Convention**: camelCase for all fields and models
- **Location**: All Prisma files in `prisma/` directory
- **Client Location**: Generated to `node_modules/@prisma/client`

### Schema Change Checklist
- [ ] Update `prisma/schema.prisma`
- [ ] Create migration directory with timestamp
- [ ] Write migration.sql with proper SQL
- [ ] Test migration on development database
- [ ] Update documentation in `current.md`
- [ ] Commit both schema and migration files

### Key Files Reference
- `prisma/schema.prisma` - Database schema definition
- `prisma/migrations/` - All migration files
- `server/db.ts` - Prisma Client singleton
- `current.md` - Project state and documentation

### Environment Variables
- `DATABASE_URL` - Required for all database operations
- Must be in Replit Secrets for production
- Format: `postgresql://user:pass@host/dbname?sslmode=require`

---

## 🔧 Common Commands

### Database Operations
```bash
# WRONG - Don't use for production changes
npx prisma db push

# RIGHT - Create and apply migrations
npx prisma migrate dev --name descriptive_change_name

# Apply migrations in production
npx prisma migrate deploy

# Regenerate Prisma Client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Development
```bash
npm run dev           # Start development server
npm run build         # Production build
npm run check         # TypeScript type check
npm run db:push       # Quick dev sync (use sparingly)
npm run db:studio     # Prisma Studio GUI
npm run db:generate   # Regenerate Prisma Client
npm run db:migrate    # Create & apply migrations
```

---

## 📝 Migration File Template

When creating migrations manually (non-interactive environment):

```sql
-- AlterTable
-- [Description of what this migration does]
ALTER TABLE "TableName" ALTER COLUMN "columnName" [CHANGE];

-- CreateTable (if needed)
CREATE TABLE "TableName" (
    "id" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TableName_pkey" PRIMARY KEY ("id")
);

-- CreateIndex (if needed)
CREATE UNIQUE INDEX "TableName_field_key" ON "TableName"("field");

-- AddForeignKey (if needed)
ALTER TABLE "TableName" ADD CONSTRAINT "TableName_foreignId_fkey"
    FOREIGN KEY ("foreignId") REFERENCES "OtherTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
```

---

## 🐛 Debugging Tips

### Database Connection Issues
1. Check `DATABASE_URL` is set in Replit Secrets
2. Verify connection string format is correct
3. Check Prisma Client is generated: `npx prisma generate`
4. Look for connection logs in `server/db.ts`

### Migration Issues
1. Check migration files exist in `prisma/migrations/`
2. Verify SQL syntax in migration.sql files
3. Check migration history: `npx prisma migrate status`
4. If stuck, may need to reset: `npx prisma migrate reset` (DEV ONLY)

### Schema Sync Issues
1. Compare `prisma/schema.prisma` with actual database schema
2. Run `npx prisma db pull` to see current database state
3. Check for pending migrations: `npx prisma migrate status`
4. Regenerate client: `npx prisma generate`

---

## 📚 Recent Changes & Migration History

### 2025-11-07: Make UsageLog userId Optional
- **Migration**: `20251107080111_make_usage_log_user_id_optional`
- **Reason**: Support anonymous user tracking in usage logs
- **Changes**: Made `userId` field nullable in UsageLog table
- **Impact**: Usage logs now properly record both authenticated and anonymous user activity
- **Files Modified**:
  - `prisma/schema.prisma` (lines 68-69)
  - Created migration file with `ALTER TABLE "UsageLog" ALTER COLUMN "userId" DROP NOT NULL;`

---

## 🎯 Best Practices

1. **Always test migrations on development before production**
2. **Write descriptive migration names** (e.g., `add_user_preferences_table`, not `update_db`)
3. **Document breaking changes** in migration files and current.md
4. **Never edit existing migration files** - create new ones for fixes
5. **Keep schema.prisma and migrations in sync** - they are the source of truth
6. **Commit migrations with their corresponding schema changes** in the same commit
7. **Use nullable fields (`?`) when data might not always be present**
8. **Add database indexes** for frequently queried fields

---

Last Updated: 2025-11-07
