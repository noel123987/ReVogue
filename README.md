
# ReVogue - Sustainable Fashion Platform

ReVogue is a modern e-commerce platform focused on sustainable and circular fashion. The platform promotes three key pillars of sustainable fashion: Thrift, Rent, and Upcycle.

## Project Overview

ReVogue aims to revolutionize fashion consumption by creating a circular fashion ecosystem that extends the lifecycle of clothing and reduces textile waste.

## Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** primitives for accessible components
- **React Query** for data fetching and caching
- **Wouter** for routing
- **Vite** for development and building

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** via Neon Database
- **Drizzle ORM** for database operations
- **Express Session** for authentication
- **Passport.js** for user authentication

### Development Tools
- **ESBuild** for TypeScript/JavaScript bundling
- **Drizzle Kit** for database migrations
- **TSX** for TypeScript execution

## Key Features

- User authentication and authorization
- Product listing and management
- Sustainable fashion tracking
- Educational resources
- Community engagement
- Carbon footprint tracking
- AI-powered recommendations

## Project Structure

```
├── client/              # Frontend application
│   ├── src/            # Source files
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── lib/        # Utilities and constants
│   │   └── assets/     # Static assets
│   └── index.html      # Entry HTML file
│
├── server/             # Backend application
│   ├── routes.ts       # API routes
│   ├── db.ts          # Database configuration
│   ├── storage.ts     # Storage utilities
│   └── index.ts       # Server entry point
│
├── shared/            # Shared code between frontend and backend
│   └── schema.ts     # Database schema definitions
│
└── config files      # Various configuration files
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    └── drizzle.config.ts
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run check` - Type check TypeScript
- `npm run db:push` - Push database schema changes

## Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL database connection URL
- `SESSION_SECRET` - Secret for session management
- `NODE_ENV` - Environment mode (development/production)

## Contributing

We welcome contributions to ReVogue! Please make sure to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with a clear description

## License

MIT
