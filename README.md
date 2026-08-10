# UserPulse - User Management Application (React CRUD)

A modern, responsive, and fully functional **User Management Application** built with React, React Router v6, and the JSONPlaceholder REST API. Designed to fulfill all assignment requirements and bonus criteria with high visual polish and smooth user experience.

---

## 🚀 Features & Assignment Checklist

### Core Tasks
- [x] **1. Fetch Users**: Loads list of users from `https://jsonplaceholder.typicode.com/users` and displays basic details (Name, Email, Phone, Company, Website).
- [x] **2. Create User**: Interactive form at `/user/new` to add users. Performs a `POST` request to JSONPlaceholder and optimistically updates local state.
- [x] **3. Update User**: Edit action button on each user leading to pre-filled form at `/user/edit/:id`. Performs a `PUT` request and updates state.
- [x] **4. Delete User**: Delete button with modal confirmation. Performs a `DELETE` request and removes the user from the interface.

### Additional Requirements
- [x] **React Hooks & Functional Components**: Built with `useState`, `useEffect`, `useContext`, `useCallback`, and custom hooks (`useUsers`).
- [x] **React Router v6**: Client-side routing for Home (`/`), Detailed View (`/user/:id`), Create (`/user/new`), Edit (`/user/edit/:id`), and 404 Not Found.
- [x] **Responsive & Styled UI**: Built using Vanilla CSS with CSS custom variables, smooth transitions, flexbox & CSS grid, glassmorphism, and dark/light theme support.
- [x] **Error Handling**: Comprehensive error banners and toast notifications when API calls fail or succeed.
- [x] **Clean Comments**: Source code contains helpful JSDoc and line comments for easy reading.
- [x] **Intuitive UX**: Includes search bar, sorting dropdown (by Name, Company, ID), and Grid/Table view toggling.

### Bonus Features
- [x] **Skeleton Screens & Loading States**: Shimmer skeleton cards and tables rendered while API calls are in progress.
- [x] **User Authored Posts**: Fetches and displays blog articles authored by the user on their detailed profile page.

---

## 🛠️ Getting Started

### 1. Navigate to project folder
```bash
cd user-management-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open your browser at `http://localhost:3000` to interact with the application.

---

## 📁 Project Structure

```
user-management-app/
├── index.html                  # HTML entry point with Google Fonts
├── package.json                # Project dependencies and scripts
├── vite.config.js              # Vite server configuration
├── src/
│   ├── main.jsx                # React DOM root render
│   ├── App.jsx                 # Router routes and main layout
│   ├── index.css               # Global design tokens, themes & styles
│   ├── services/
│   │   └── api.js              # JSONPlaceholder API fetch service
│   ├── context/
│   │   └── UserContext.jsx     # Global user state, CRUD handlers, toasts & theme
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── Footer.jsx          # Footer section
│   │   ├── UserCard.jsx        # Grid card layout for user items
│   │   ├── UserTable.jsx       # Responsive table view layout
│   │   ├── SkeletonCard.jsx    # Skeleton loader for cards
│   │   ├── SkeletonTable.jsx   # Skeleton loader for table rows
│   │   ├── Toast.jsx           # Alert popups for success/error
│   │   ├── ConfirmModal.jsx    # Confirmation prompt for deletion
│   │   └── Icons.jsx           # SVG icon components
│   └── pages/
│       ├── Home.jsx            # Main dashboard with search, sort & view toggle
│       ├── UserDetail.jsx      # Comprehensive profile view & user posts
│       ├── UserFormPage.jsx    # Create & Edit form with validation
│       └── NotFound.jsx        # 404 page
```

## 🚀 Live Demo

[View Live Project](https://user-management-system-inky-two.vercel.app/)
