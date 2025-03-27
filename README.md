# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# AWB-Tracker2 Frontend - React.js Application

This document outlines the frontend components and considerations for the AWB-Tracker2 application, designed to integrate with the existing backend hosted on Render.

## Core Functionality (Backend API Alignment)

* **Simulated OTM Data (MongoDB):**
    * The backend provides API endpoints (`/awbs`) to retrieve and filter AWB data stored in a MongoDB database.
    * Data includes fields such as `Transport Mode`, `Direction`, `ETD Date`, `ETA Date`, `HAWB/HBL`, and `Proof Of Delivery (POD)`.

* **User Authentication and Authorization:**
    * Backend API endpoints (`/auth/sign-up`, `/auth/sign-in`, `/users`) handle user registration, login, and profile management with JWT authentication.
    * Protected routes are implemented to secure sensitive data.

* **Saved AWB Management:**
    * Users can save and manage their assigned AWBs via the backend's `/savedawbs` endpoints.
    * Functionality includes saving new AWBs and updating existing saved AWBs.

* **Automated Email Notifications:**
    * The backend's `/email/saved-awbs` endpoint triggers automated email notifications based on saved AWBs, using Nodemailer and a cron job.

* **Dashboard and Filtering:**
    * The frontend will display a dashboard with a list of AWBs fetched from the backend, including filtering options.
    * Pagination will be implemented to handle large datasets.
    * Detailed AWB information will be displayed.

## Frontend Components

* **Landing Page (`Landing.js`):**
    * Displays an overview of the application and provides login/signup options.

* **Navigation Bar (`NavBar.js`):**
    * Provides navigation to different parts of the application and manages user authentication state.

* **Authentication Components:**
    * `Login.js`: Handles user login.
    * `Signup.js`: Handles user registration.
    * `ProtectedRoute.js`: Wraps routes requiring authentication.

* **Dashboard (`Dashboard.js`):**
    * Displays the list of AWBs with filtering and pagination.

* **AWB Details (`AWBDetails.js` or `AWBCard.js`):**
    * Displays detailed information about a selected AWB.

* **Lane Management (`LaneManagement.js`):**
    * Allows users to save and manage their assigned AWBs.

* **User Profile/Settings (`UserProfile.js` or `UserSettings.js`):**
    * Manages user notification preferences and displays user information.

* **Error Handling/Alerts (`ErrorAlert.js` or `Alert.js`):**
    * Displays error messages and success notifications.

## Frontend Considerations

* **API Service (`apiService.js` or `api.js`):**
    * A dedicated service to handle all API calls to the backend.

* **State Management:**
    * Implementation of Context API or React Hooks for managing application-wide state.

* **UI Library:**
    * Choice between Material-UI or Tailwind CSS for consistent styling.

* **Routing:**
    * `react-router-dom` for managing navigation.

* **Form Handling:**
    * `React Hook Form` for simplifying form management.

* **Authentication Flow:**
    * Proper implementation of login, signup, logout, and token management.

* **Loading States:**
    * Visual indicators during API calls.

* **Form Validation:**
    * Input validation for forms.
