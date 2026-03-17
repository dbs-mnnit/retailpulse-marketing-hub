# PoleStar – AI Marketing Automation Frontend

A modern, high-performance web interface for the PoleStar AI Marketing platform. Built with a focus on premium aesthetics, speed, and seamless user experience.

## ✨ Features

- **Beautiful AI Dashboard**: Real-time visualization of campaign analytics.
- **Campaign Builder**: Intuitive flow for creating Email, SMS, and WhatsApp marketing.
- **Audience Management**: Tools for managing customer segments and bulk uploads.
- **Responsive Design**: Fully optimized for desktop and mobile viewports.
- **Dynamic Animations**: Smooth transitions powered by Framer Motion.
- **Glassmorphism UI**: Modern aesthetic using Tailwind CSS and Radix UI.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **Routing**: React Router Dom

## ⚙️ Setup & Installation

### 1. Environment Configuration
Create a `.env` file in the root (refer to `.env.example`):
```env
VITE_API_URL=http://localhost:3000/api/v1
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:8080` (or `http://localhost:5173`).

## 🏗️ Project Structure

```text
src
├── app        # Redux store and global hooks
├── components # Reusable UI components (Shadcn)
├── lib        # Utilities and configurations
├── pages      # Page views (Landing, Auth, Dashboard)
└── services   # API integration layer
```

## 🎨 Design Principles

- **Contrast & Clarity**: High readability with subtle gradients.
- **Interactivity**: Micro-animations on buttons and cards.
- **Theming**: Integrated light/dark mode support.
