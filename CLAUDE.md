# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lost Pet is a web application for tracking and reuniting lost pets with their owners. Built using RedwoodSDK for Cloudflare Workers, it leverages server-side rendering, React Server Components, and Better Auth for secure authentication.

## Development Commands

```bash
# Start development server
pnpm dev

# Build and type checking
pnpm build
pnpm check           # Type checking and generation
pnpm types           # TypeScript compilation only

# Database operations
pnpm migrate:dev     # Apply migrations locally
pnpm migrate:prd     # Apply migrations to production  
pnpm migrate:new     # Create new migration
pnpm seed           # Seed database with test data

# Code quality (via mise)
mise run fmt         # Format code with Biome
mise run check       # Run all checks (types + format)
mise run check:types # Type checking only

# Asset management
mise run upload-assets   # Upload to Cloudflare R2
mise run download-assets # Download from R2

# Deployment
pnpm release        # Full production deployment
```

## Architecture Overview

### Tech Stack
- **Framework**: RedwoodSDK (rwsdk) on Cloudflare Workers
- **Frontend**: React with SSR/RSC, Tailwind CSS
- **Database**: Prisma + SQLite (Cloudflare D1)
- **Authentication**: Better Auth with email/password
- **Storage**: Cloudflare R2 for assets
- **Build**: Vite, TypeScript strict mode

### Key Directories
- `src/worker.tsx` - Main entry point and routing
- `src/app/pages/` - Page components (Home, Listings, etc.)
- `src/app/components/` - Reusable UI components
- `src/app/rpc/` - Server-side RPC functions
- `src/lib/auth.ts` - Authentication configuration
- `prisma/schema.prisma` - Database schema

### Routing & Data Flow
- File-based routing via rwsdk/router
- Server Components handle data fetching
- RPC pattern for server-side operations
- Authentication interceptors protect routes
- Route definitions in `src/worker.tsx`

### Database Schema
Core models: User, Pet (with location/images), Account, Session. Pets include location data, multiple images, and comprehensive metadata for lost/found tracking.

## Development Patterns

### Authentication
Uses Better Auth with email/password authentication. Client-side auth utilities in `src/lib/authClient.ts`, server config in `src/lib/auth.ts`. Protected routes use authentication interceptors. Sign-up is disabled (admin-only user creation).

### Component Structure
Pages should be Server Components when possible for data fetching. Client Components only when interactivity is needed. Use shared utilities from `src/app/shared/`.

### Database Operations
Always use Prisma client from `src/db.ts`. Run migrations before schema changes. Use `pnpm seed` for test data.

### Asset Handling
Static assets go in `public/`. Cloud assets (uploaded files) use R2 via `cloud-assets/` directory and upload/download scripts.

## Testing & Quality

- Type checking: `pnpm check` or `mise run check:types`
- Code formatting: `mise run fmt` (uses Biome)
- Always run type checking before commits
- Database changes require migrations via `pnpm migrate:new`

## Cloudflare Environment

This app is built specifically for Cloudflare Workers:
- Uses D1 SQLite database (not traditional PostgreSQL)
- R2 for file storage
- Wrangler for deployment (`wrangler.jsonc` config)
- Environment bindings defined in wrangler config

## Code Guidelines

### Documentation and Implementation Alignment
- If you notice a different between the documentation and an implementation, update the documentation to reflect the reality of the implementation.