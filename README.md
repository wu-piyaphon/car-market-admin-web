# Car Marketplace - Admin Web

[![My Skills](https://skillicons.dev/icons?i=ts,html,css,react,tailwind,vite)](https://skillicons.dev)

A modern, feature-rich admin dashboard for managing car marketplace operations. Built with React Router v7, TypeScript, TailwindCSS, and a comprehensive set of modern web technologies.

## Overview

Car Market Admin Web is a comprehensive admin panel designed for managing a car marketplace platform. The system supports two main types of car sales:
- **Owner Cars** - Cars sold directly to marketplace owner
- **Consignment Cars** - Cars sold on consignment

The platform provides complete CRUD operations for car management, request handling, and user authentication.

## 🌟 Features

### Authentication
- Secure login system with JWT token management
- Automatic token refresh
- Protected routes and role-based access

### Car Management
- **Add/Edit Cars**: Complete car information form with image upload
- **Car Listings**: Paginated car lists with search and filtering
- **Car Details**: Comprehensive car detail view with image carousel
- **Status Management**: Activate/deactivate cars

### Request Management
- **Selling Requests**: Handle car selling requests from customers
- **Estimate Requests**: Manage car valuation requests
- **Status Tracking**: Track and update request statuses

### Modern UI/UX
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Dark/Light Theme**: Theme switching capability
- **Component Library**: Built with Radix UI components
- **Drag & Drop**: File upload with drag-and-drop support
- **Loading States**: Comprehensive loading and skeleton screens

## ⚙️ Tech Stack

### Frontend Framework
- **React Router v7** - Latest routing solution
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### Styling & UI
- **TailwindCSS v4** - Utility-first CSS framework
- **Shadcn/Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Embla Carousel** - Touch-friendly carousel component

### State Management & Data Fetching
- **TanStack Query (React Query)** - Powerful data synchronization
- **Axios** - HTTP client with interceptors
- **React Hook Form** - Performant forms with easy validation

### Form Validation
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation integration

### Development Tools
- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Lefthook** - Git hooks management
- **Docker** - Containerization support

## 📂 Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── ui/              # Basic UI components (Shadcn/UI)
│   ├── form/            # React Hook Form components
│   ├── layout/          # Layout components (sidebar, topbar)
│   └── custom/          # Custom business components
├── features/            # Feature-based modules
│   ├── module/         # Feature module
│   │   ├── api/        # API calls & React Query hooks
│   │   ├── components/ # Feature-specific components
│   │   ├── hooks/      # Custom hooks for specific feature
│   │   ├── schemas/    # Form validation schemas
│   │   ├── constants/  # Feature-specific constants
│   │   ├── types/      # TypeScript definitions
│   │   └── views/      # Page-level components
├── hooks/               # Custom React hooks
├── lib/                 # Shared utilities and configurations
│   ├── api/             # Axios setup & API layer
│   ├── schemas/         # Shared validation schemas
├── routes/             # Page components (React Router)
│   ├── car/            # Car-related routes
│   └── request/        # Request-related routes
├── types/              # Global TypeScript definitions
└── utils/              # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/wu-piyaphon/car-market-admin-web.git
cd car-market-admin-web
```

2. **Install dependencies**
```bash
yarn install
```

3. **Environment setup**
```bash
   cp .env.example .env.local
   # Configure your environment variables
```

4. **Start the development server**
```bash
yarn dev
```

5. **Open your browser and navigate to `http://localhost:5173`**

### Available Scripts

```bash
# Development
yarn dev          # Start development server

# Building
yarn build        # Build for production
yarn start        # Start production server

# Code Quality
yarn typecheck    # Run TypeScript type checking
```

## 🛠️ Architecture

### Feature-Based Structure
The project follows a feature-based architecture where each feature (`auth`, `car`, `request`) contains:
- **API layer**: API calls, React Query hooks, and mutations
- **Components**: Feature-specific UI components
- **Constants**: Feature-specific Constants
- **Hooks**: Feature-specific Custom hooks
- **Schemas**: Zod validation schemas
- **Types**: TypeScript type definitions
- **Views**: Page-level components

### API Integration
- Centralized API configuration with Axios
- Automatic request/response interceptors
- Token management with refresh logic
- Type-safe API endpoints

### State Management
- TanStack Query for data-fetching and state management
- React Hook Form for form state
- Local component state with React hooks