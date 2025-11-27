# Personal Portfolio Website

A beautiful, iOS-inspired girly themed portfolio website built with React. This frontend application connects to the Portfolio & Blog API for full CRUD functionality.

## Live Demo

- **Frontend URL**: [Your deployed frontend URL]
- **Backend API URL**: [Your deployed API URL]

## Features

- Responsive iOS-inspired girly design
- Component-based React architecture
- React Router for client-side routing
- Protected routes for admin dashboard
- Context API for global state management
- Full authentication flow (register, login, logout)
- Projects gallery with CRUD operations
- Blog with comments functionality
- Contact form
- Admin dashboard for content management

## Pages

### Public Routes
- `/` - Home/About Me page
- `/projects` - Projects gallery
- `/blog` - Blog posts list
- `/blog/:id` - Individual blog post with comments
- `/contact` - Contact form
- `/login` - Login page
- `/register` - Registration page

### Protected Routes
- `/admin` - Admin dashboard (requires authentication)

## Tech Stack

- React 18
- React Router v6
- Axios for API calls
- Context API for state management
- CSS3 with custom iOS-inspired styling
- Vite as build tool

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── ProtectedRoute.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectCard.css
│   │   ├── BlogPostCard.jsx
│   │   └── BlogPostCard.css
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx / Home.css
│   │   ├── Projects.jsx / Projects.css
│   │   ├── Blog.jsx / Blog.css
│   │   ├── BlogDetail.jsx / BlogDetail.css
│   │   ├── Contact.jsx / Contact.css
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Auth.css
│   │   ├── Admin.jsx
│   │   └── Admin.css
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server
```bash
npm run dev
```

The app will be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production files will be in the `dist` folder.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

## Styling

The website uses a custom iOS-inspired girly design with:
- Soft pink, purple, and lavender color palette
- Glass-morphism card effects
- Smooth animations and transitions
- Rounded corners and soft shadows
- Quicksand font family

### Color Variables
```css
--pink-light: #FFE4EC
--pink-main: #FFB6C1
--pink-dark: #FF69B4
--pink-accent: #FF1493
--purple-light: #E8D4F0
--purple-main: #DDA0DD
--lavender: #E6E6FA
```

## API Integration

The app communicates with the backend API for:
- User authentication (register, login)
- Projects CRUD operations
- Blog posts CRUD operations
- Comments creation
- Contact form submission

All protected API calls include JWT token in the Authorization header.

## Deployment

This React app can be deployed on:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Set the environment variable `VITE_API_URL`
4. Deploy!

## Admin Dashboard Features

Once logged in, the admin can:
- Create, edit, and delete projects
- Create, edit, and delete blog posts
- View contact form messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
