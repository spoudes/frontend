# Frontend Template

A modern JavaScript (Typescript) frontend template for rapid web development with React, TS, Vite, TailwindCSS, and a robust tooling setup for linting, testing, API generation, and conventional commits.

## Features

- **React**: Build dynamic UIs with React 19.
- **Vite**: Fast development server and build tool.
- **TailwindCSS**: Utility-first CSS framework for custom designs.
- **React Router**: Declarative routing for single-page apps.
- **React Query**: Async state management for data fetching.
- **Axios**: Promise-based HTTP client for API requests.
- **Jest & React Testing Library**: Unit and integration testing.
- **Orval**: Generate API clients from OpenAPI specs.
- **ESLint & Prettier**: Ensure code quality and consistent formatting.
- **Husky & Commitizen**: Enforce conventional commits with interactive Git hooks.

## Development

### Cases
- **CamelCase**: For components names
- **kebab-case**: For file names

### Git
- **npm run commit**: The right way to do commits

## Getting Started

### Prerequisites

- Node.js 18+ and npm.
- Git for version control.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Husky Git hooks:
   ```bash
   npx husky install
   ```

### Running the Development Server

Start the dev server with hot-reloading:
```bash
npm run dev
```
Access at `http://localhost:5173`.

### Building for Production

Build the optimized production bundle:
```bash
npm run build
```

Output is in the `dist/` directory.

### Previewing the Production Build

Serve the production build locally:
```bash
npm run preview
```

## Available Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint.
- `npm run format`: Format code with Prettier.
- `npm run test`: Run Jest tests.
- `npm run commit`: Run Commitizen for conventional commit prompts.
- `npm run generate-api`: Generate API clients with Orval.

## Key Libraries & Tools

- **Dependencies**: `react`, `react-dom`, `react-router-dom`, `@tanstack/react-query`, `axios`, `tailwindcss`, `react-toastify`.
- **Dev Dependencies**: `vite`, `@vitejs/plugin-react`, `eslint`, `prettier`, `jest`, `@testing-library/react`, `@testing-library/jest-dom`, `orval`, `husky`, `commitizen`, `cz-conventional-changelog`, `@commitlint/cli`, `@commitlint/config-conventional`.

## Commit Convention

Commits follow the [Conventional Commits](https://www.conventional-commits.org) standard. Use `npm run commit` for an interactive Commitizen prompt (e.g., select `feat`, `fix`, scope, and description). The `commit-msg` hook validates the format.

Example:
```bash
git add .
npm run commit
```
This prompts:
```
? Select the type of change: fix
? Scope (e.g., component): app-header
? Short description: resolve header alignment
```

## Testing

Run unit and integration tests:
```bash
npm run test
```

Uses Jest and React Testing Library.

## API Generation

Generate API clients from `openapi.yaml` using Orval:
```bash
npm run generate-api
```

Configure in `orval.config.js`.
