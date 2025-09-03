# ProjectPool Frontend

A modern React frontend for the ProjectPool student project management system.

## Features

- **Authentication System**: Login, signup, and logout functionality
- **Project Browsing**: View available projects with detailed descriptions
- **Project Submission**: Submit projects with team member details
- **Submission Management**: Track submission status and history
- **Admin Dashboard**: Manage and approve/reject submissions (admin only)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** - Frontend framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **Vite** - Build tool and development server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 3000

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your API URL:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar
│   ├── ProtectedRoute.jsx  # Route protection
│   └── AdminRoute.jsx  # Admin route protection
├── contexts/           # React contexts
│   ├── AuthContext.jsx # Authentication state
│   └── ProjectContext.jsx # Project management state
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Login page
│   ├── Signup.jsx      # Registration page
│   ├── Projects.jsx    # Projects listing
│   ├── ProjectDetail.jsx # Project details
│   ├── MySubmissions.jsx # User submissions
│   └── AdminDashboard.jsx # Admin panel
├── utils/              # Utility functions
│   └── api.js          # API configuration
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## API Integration

The frontend communicates with the backend through the following endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/submissions/:id` - Submit project
- `GET /api/submissions/my` - Get user submissions
- `GET /api/submissions` - Get all submissions (admin)
- `PUT /api/submissions/:id/status` - Update submission status (admin)

## Authentication

The app uses JWT tokens stored in HTTP-only cookies for authentication. The authentication state is managed through the `AuthContext` and automatically handles:

- Login/logout functionality
- Token validation
- Protected routes
- Admin role checking

## User Roles

- **Student**: Can browse projects, submit projects, and view their submissions
- **Faculty**: Same as student (can be extended for additional features)
- **Admin**: Can view all submissions and approve/reject them

## Styling

The app uses a custom CSS framework with utility classes inspired by Tailwind CSS. All styles are defined in `src/index.css` and include:

- Responsive grid system
- Form components
- Button variants
- Card layouts
- Color schemes
- Loading states

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist` directory

3. Deploy the `dist` directory to your hosting service

4. Make sure to update the `VITE_API_URL` environment variable for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
