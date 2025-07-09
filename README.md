# 🐦 Social Media Platform (Twitter Clone)

A modern, full-featured social media platform built with React, Redux, and a custom backend API. This Twitter-like application allows users to share thoughts, interact with posts, and connect with others through a clean and intuitive interface.

## 🌟 Features

### 👤 User Authentication & Management

- **Secure Sign Up/Login**: User registration and authentication system
- **Session Management**: Persistent login sessions with automatic token refresh
- **Profile Pictures**: Upload and manage custom profile images
- **Protected Routes**: Route-level authentication guards

### 📝 Post & Content Management

- **Rich Text Editor**: Create posts with formatting using TinyMCE
- **Image Uploads**: Share photos with your posts
- **Real-time Feed**: Dynamic timeline showing latest posts
- **Post Interactions**: Like/unlike posts with real-time updates

### 🎨 User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between light and dark themes
- **Profile Pages**: Dedicated user profile pages with post history
- **Intuitive Navigation**: Smooth routing and navigation experience
- **Skeleton Loading**: Smooth loading states with skeleton screens for better UX

### 🔒 Security Features

- **Route Protection**: Authentication-based access control
- **Input Validation**: Form validation and sanitization
- **Secure File Uploads**: Safe image upload and storage

### ⚡ Performance Features

- **Skeleton Loading**: Implemented skeleton screens for posts, profiles, and feeds
- **Optimized Rendering**: Efficient component rendering with React best practices
- **Loading States**: Smooth transitions and loading indicators

## 🛠️ Technologies Used

### Frontend

| Category             | Technology                 |
| -------------------- | -------------------------- |
| **Frontend**         | React 18, JSX, Hooks       |
| **State Management** | Redux Toolkit, React-Redux |
| **Routing**          | React Router DOM v7        |
| **Styling**          | Tailwind CSS v4, CSS3      |
| **Text Editor**      | TinyMCE React              |
| **Form Handling**    | React Hook Form            |
| **Icons**            | React Icons                |
| **Loading States**   | React Loading Skeleton     |
| **Build Tool**       | Vite                       |
| **Deployment**       | Vercel                     |

### Backend (Private Repository)

| Category           | Technology             |
| ------------------ | ---------------------- |
| **Runtime**        | Node.js                |
| **Framework**      | Express.js v5          |
| **Database**       | MongoDB (Mongoose ODM) |
| **Authentication** | JWT, bcrypt            |
| **File Upload**    | Multer, Cloudinary     |
| **Email Service**  | Nodemailer             |
| **Security**       | CORS, Cookie Parser    |
| **Environment**    | dotenv                 |
| **Utilities**      | UUID                   |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthLayout.jsx  # Route protection wrapper
│   ├── Header.jsx      # Navigation header
│   ├── Post.jsx        # Individual post component
│   ├── TextEditor.jsx  # Rich text editor
│   └── ...
├── pages/              # Main page components
│   ├── Home.jsx        # Main feed page
│   ├── Login.jsx       # Login page
│   ├── Profile.jsx     # User profile page
│   └── SignUp.jsx      # Registration page
├── Skeletons/          # Skeleton loading components
│   ├── HomeSkeleton.jsx # Home page skeleton
│   ├── PostSkeleton.jsx # Post skeleton
│   └── ProfileSkeleton.jsx # Profile skeleton
├── store/              # Redux store configuration
│   ├── authSlice.js    # Authentication state
│   ├── themeSlice.js   # Theme state
│   └── store.js        # Store configuration
├── service/            # API service configuration
│   ├── auth.js         # Authentication service
│   └── api.js          # API service methods
├── hooks/              # Custom React hooks
└── conf/               # Configuration files
```

## 📱 Demo

🚀 **Live Demo**: [https://social-media-platform-seven-orpin.vercel.app/](https://social-media-platform-seven-orpin.vercel.app/)

---

⭐ If you found this project helpful, please give it a star!