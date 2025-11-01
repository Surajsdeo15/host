# Host Application - Microfrontend Architecture

This is the **Host Application** built with **Vite + React** that consumes remote components via Module Federation.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```
Runs on http://localhost:3000

### Production Build
```bash
npm run build
npm run serve
```

## 📦 Features

- Vite + React + TypeScript
- Module Federation integration
- React Router for routing
- Authentication (Login/Home/Profile pages)
- Consumes remote app components

## 🔧 Environment Variables

Create `.env` file (see `.env.example` for reference):

```env
VITE_APP_NAME=Host Application
VITE_APP_PORT=3000
VITE_REMOTE_URL=http://localhost:3001
VITE_REMOTE_ENTRY_URL=http://localhost:3001/remoteEntry.js
VITE_API_URL=https://dummyjson.com
VITE_ENV=development
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run serve` - Serve production build

## 🚢 Deployment

### Deploy to Vercel

1. Push this repository to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

**Important**: Remote app must be deployed first!

See [DEPLOYMENT.md](../DEPLOYMENT.md) for detailed instructions.

## 📁 Project Structure

```
host/
├── src/
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Home.tsx
│   │   └── Profile.tsx
│   ├── App.tsx
│   └── main.tsx
├── vite.config.ts
└── package.json
```




