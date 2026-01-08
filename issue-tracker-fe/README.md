# Issue Tracker Frontend

A modern, full-featured issue tracking application built with React, TypeScript, and Redux. This frontend application provides a comprehensive interface for managing issues with authentication, real-time updates, and advanced filtering capabilities.

## 🚀 Features

- **User Authentication**: Secure login and signup with JWT-based authentication
- **Issue Management**: Create, read, update, and delete issues with ease
- **Status Tracking**: Track issues through multiple states (Open, In Progress, Resolved, Closed)
- **Priority Levels**: Assign and filter by priority (Low, Medium, High, Critical)
- **Advanced Search & Filtering**: Search issues by title, filter by status and priority
- **Issue Details**: View comprehensive details for each issue
- **Dashboard Analytics**: Real-time counts of issues by status
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Protected Routes**: Secure access to authenticated pages

## 🛠️ Tech Stack

- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Redux Toolkit** - State management with modern Redux patterns
- **React Router v7** - Client-side routing with nested routes
- **Hero UI** - Beautiful, accessible component library
- **Tailwind CSS v4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Framer Motion** - Smooth animations and transitions

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Backend API running (see backend repository)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dinelkathilina/issue-tracker-fe
   cd issue-tracker-fe/issue-tracker-fe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=https://innovative-nadiya-creative-designer-e806d045.koyeb.app 
   ```

   Or for local development:

   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── common/      # Shared components (NavBar, ProtectedRoute, etc.)
│   └── ...
├── pages/           # Page components
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── Dashboard.tsx
│   └── IssueDetailPage.tsx
├── store/           # Redux store configuration
│   ├── slices/      # Redux slices (auth, issues)
│   └── store.ts
├── services/        # API service layer
│   ├── api.ts       # Axios instance and interceptors
│   └── ...
├── types/           # TypeScript type definitions
├── layouts/         # Layout components
├── hooks/           # Custom React hooks
└── App.tsx          # Root component with routing
```

## 🔐 Authentication

The application uses JWT-based authentication:

1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Authenticate with email and password
3. **Token Storage**: JWT tokens are stored in localStorage
4. **Auto-Refresh**: Tokens are automatically included in API requests
5. **Protected Routes**: Unauthorized users are redirected to login

## 📱 Usage

### Creating an Issue

1. Navigate to the Dashboard
2. Click "Create Issue" button
3. Fill in title, description, priority, and status
4. Submit to create the issue

### Managing Issues

- **View Details**: Click on any issue card to see full details
- **Edit Issue**: Click the edit icon on an issue card
- **Update Status**: Change status directly from the issue card
- **Delete Issue**: Remove issues you've created
- **Search**: Use the search bar to find issues by title
- **Filter**: Filter issues by status and priority

### Dashboard

- View issue counts by status (Open, In Progress, Resolved, Closed)
- See all your issues in a responsive grid layout
- Quick access to issue management features

## 🌐 API Integration

The frontend communicates with the backend API at the URL specified in `VITE_API_BASE_URL`. Key endpoints:

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/issues` - Fetch all issues (with filters)
- `POST /api/issues` - Create new issue
- `GET /api/issues/:id` - Get issue details
- `PUT /api/issues/:id` - Update issue
- `DELETE /api/issues/:id` - Delete issue
- `GET /api/issues/counts` - Get issue counts by status

## 🎨 Theming

The application supports light and dark modes:

- Toggle theme using the switch in the navigation bar
- Theme preference is persisted across sessions
- Smooth transitions between themes


### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.


