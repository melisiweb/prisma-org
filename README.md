# Prisma Org Application

A Next.js application demonstrating server-side rendering principles and database management using Prisma and TypedSQL.

## Tech Stack

- **Framework**: Next.js
- **Database ORM**: Prisma with TypedSQL
- **Data Fetching**:
  - Server-side rendering (SSR)
  - TanStack Query for client-side operations
  - Next.js API routes

## Key Features

- Server-side rendering implementation
- Database operations using both Prisma and TypedSQL
- Client-side state management with TanStack Query
- API routes for necessary client-side operations

## Getting Started

### Prerequisites

- Node.js
- pnpm
- PostgreSQL (or your preferred database)

### Installation

pnpm install

#### Create environment file

Create a .env file in the root directory and add your database URL:

DATABASE_URL="your-database-url"

### Set up the database

#### Push the database schema

pnpm prisma db push

#### Generate Prisma client with SQL types

pnpm prisma generate --sql

#### Seed the database with demo data

pnpm prisma db seed

### Start the development server

pnpm dev

The application will be available at http://localhost:3000

## Development Notes

- The application prioritizes server-side rendering where possible
- TypedSQL was used as an experimental feature alongside Prisma
- Note: Some challenges were encountered with nested query type generation
- Testing was deprioritized to focus on core SSR principles and database query implementations

## Future Improvements

- Add comprehensive test coverage
- Resolve TypedSQL nested query type generation issues
- Create a component design system for reusable components
