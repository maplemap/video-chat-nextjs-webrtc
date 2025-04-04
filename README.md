# Video Chat with Next.js, Typescript, SocketIO, WebRTC

[Live Demo](https://videochat.maplemap.space/)

## Technologies:
- Next.js
- Typescript
- Socket IO
- WebRTC(peerjs)
- Express.js
- Tailwind CSS
- Shadcn UI
- Zustand
- Prisma
- MongoDB
- Google and GitHub auth
- Authentication

## How to run the project
1. Clone the repository
2. Rename the `.env.example` file to `.env` and fill in the required environment variables
3. Run `make run` in the root directory

## Project Overview
This is a monorepo structured project powered by Docker, featuring a Next.js frontend, a Node.js event server, and MongoDB with Nginx as a reverse proxy.
Each service is containerized with separate Dockerfiles, making it easy to run and scale independently in local or cloud environments.

### app/
This is the frontend built with Next.js:
•	src/ – Source code for the app, including components and pages.
•	prisma/ – Prisma schema and client setup for database access.
•	Dockerfile.dev, Dockerfile.prod – Docker configuration for development and production.
•	package.json, tsconfig.json, vitest.config.mts, etc. – Configuration files for the frontend stack.

###  event-server/
A backend Node.js service (likely with WebSockets):
•	types/ – Shared or custom TypeScript types.
•	Dockerfile.dev, Dockerfile.prod – Docker configs.
•	package.json, tsconfig.json – Project configs.

### db/
Likely contains MongoDB-related assets:
•	keyfile/ – Used for MongoDB replication or security (e.g., in a replica set).

### nginx/
Contains Nginx reverse proxy setup:
•	nginx.conf – Configuration for routing requests to appropriate containers.
