# Smart Leads Dashboard

## Features
- JWT Authentication
- Role Based Access
- CRUD Operations
- Filtering & Search
- Pagination
- CSV Export
- Debounced Search

## Tech Stack

Frontend:
- React
- TypeScript
- TailwindCSS

Backend:
- Node.js
- Express.js
- MongoDB

## Folder Structure

client/
server/

## Setup Instructions

### Frontend

cd client
npm install
npm run dev

### Backend

cd server
npm install
npm run dev

## Environment Variables

PORT=5000
MONGO_URI=
JWT_SECRET=

## API Endpoints

POST /api/auth/register
POST /api/auth/login

GET /api/leads
POST /api/leads
PUT /api/leads/:id
DELETE /api/leads/:id
