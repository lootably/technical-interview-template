# next-express-template

This is a [Next.js](https://nextjs.org/) project template with an Express backend. It's designed to be used as a starting point for your Next.js and Express projects.

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/next-express-template.git
   cd next-express-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

   This will start both the Next.js frontend and Express backend concurrently.
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend.
   The backend API will be available at [http://localhost:3001](http://localhost:3001).

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs both frontend and backend in development mode.
- `npm run build-frontend`: Builds the Next.js frontend for production.
- `npm run build-backend`: Compiles the TypeScript backend for production.

## Project Structure

- `src/`: Contains the Next.js frontend code
- `app.ts`: Entry point for the Express backend
- `tsconfig.json`: TypeScript configuration for the project

## Libraries Used

- Next.js
- React
- Express
- TypeScript
- SASS
- Concurrently (for running multiple scripts)

## Want to contribute?

This template is set up with a specific structure, but contributions are welcome! Feel free to open a pull request if you have suggestions for improvements.