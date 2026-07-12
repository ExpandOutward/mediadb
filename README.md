# Media Database

A learning project to build a REST API using json-server, practice with Postman, and eventually add a frontend. Perfect for showcasing API fundamentals and testing skills on LinkedIn.

## Features (Current)
- RESTful API for Movies, Games, and Shows (via json-server)
- Full CRUD operations
- Data persisted in `mediadb.json`

## Quick Start

1. Clone the repo
   ```bash
   git clone https://github.com/ExpandOutward/mediadb.git
   cd mediadb
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the server
   ```bash
   npm start
   ```

Server runs at **http://localhost:3000**

## API Endpoints
Base: `http://localhost:3000/media`

- **Movies**: `/media/movies`
- **Games**: `/media/games`
- **Shows**: `/media/shows`

Full CRUD supported (GET list, GET by id, POST, PUT, PATCH, DELETE).

## Testing with Postman
A Postman collection will be added next.

## Next Steps
- Importable Postman collection with examples
- Responsive web frontend
- More sample data & documentation

Built collaboratively to demonstrate API development, testing, and full project workflow.