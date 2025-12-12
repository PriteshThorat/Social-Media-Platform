# 🐦 Social Media Platform

A modern, full-featured social media platform built with React, Redux, and Vite. This Twitter-inspired application provides a seamless user experience with real-time updates, rich text editing, and responsive design.

## ✨ Features

### 🔐 Authentication & User Management

- **User Registration** with email verification via OTP
- **Secure Login** with JWT-based authentication
- **Password Recovery** with forgot password functionality
- **Session Management** with automatic token refresh
- **Protected Routes** for authenticated users only

### 📝 Content Management

- **Create Posts** with rich text editor (TinyMCE)
- **Image Upload** with compression for optimized performance
- **Edit & Delete** your own posts
- **Real-time Updates** for content changes

### 💬 Social Interactions

- **Like & Dislike** posts with instant feedback
- **User Profiles** with customizable avatars
- **Follow System** to connect with other users
- **View User Timelines** and activity

### 🎨 User Experience

- **Dark/Light Theme** toggle with persistent preference
- **Responsive Design** for mobile, tablet, and desktop
- **Loading Skeletons** for smooth content loading
- **Toast Notifications** for user feedback
- **Floating Action Button** for quick post creation

### ⚡ Performance

- **Code Splitting** with lazy loading
- **Image Optimization** using browser-image-compression
- **Redux Persist** for offline-first experience
- **Vercel Analytics** integration
- **Speed Insights** monitoring

## 🛠️ Tech Stack

### Frontend Framework

- **React 18.3.1** - Modern React with hooks
- **Vite 6.2.0** - Lightning-fast build tool
- **React Router DOM 7.3.0** - Client-side routing

### State Management

- **Redux Toolkit 2.6.1** - Efficient state management
- **React Redux 9.2.0** - React bindings for Redux
- **Redux Persist 6.0.0** - Persist and rehydrate state

### UI & Styling

- **Tailwind CSS 4.0.14** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Icons** - Additional icon sets
- **React Loading Skeleton** - Skeleton screens

### Form Handling

- **React Hook Form 7.54.2** - Performant form validation

### Rich Text Editing

- **TinyMCE React 6.0.0** - WYSIWYG editor integration

### Utilities

- **browser-image-compression** - Client-side image optimization
- **html-react-parser** - Safe HTML parsing
- **usehooks-ts** - Useful React hooks collection

### Development Tools

- **ESLint 9.21.0** - Code linting
- **Prettier 3.7.4** - Code formatting
- **Vite Plugin Sitemap** - SEO optimization

## Project Structure

```
Social-Media-Platform/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, and other assets
│   ├── components/        # Reusable React components
│   │   ├── AddProfileImg.jsx
│   │   ├── AuthLayout.jsx
│   │   ├── Button.jsx
│   │   ├── Header.jsx
│   │   ├── LikeBtn.jsx
│   │   ├── Post.jsx
│   │   ├── Profile.jsx
│   │   ├── TextEditor.jsx
│   │   ├── ThemeBtn.jsx
│   │   └── ...
│   ├── conf/              # Configuration files
│   ├── hooks/             # Custom React hooks
│   │   └── useTimeAgo.js
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── Profile.jsx
│   │   ├── VerifyOTP.jsx
│   │   └── ForgotPassword.jsx
│   ├── service/           # API service layer
│   │   ├── auth.js        # Authentication services
│   │   └── config.js      # API configuration
│   ├── Skeletons/         # Loading skeleton components
│   ├── store/             # Redux store configuration
│   │   ├── authSlice.js
│   │   ├── themeSlice.js
│   │   ├── uiSlice.js
│   │   └── store.js
│   ├── App.jsx            # Root component
│   ├── Layout.jsx         # Layout wrapper
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .eslintrc.config.js    # ESLint configuration
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel deployment config
└── package.json           # Dependencies and scripts
```

## 🔑 Key Features Explanation

### Authentication Flow

1. User registers with email, username, fullname, and password
2. OTP is sent to email for verification
3. Upon verification, user can log in
4. JWT tokens are stored securely with HTTP-only cookies
5. Automatic token refresh maintains session

### Post Creation

1. Click floating action button or compose area
2. Write content using rich text editor
3. Optionally attach images (automatically compressed)
4. Post is uploaded to backend with image optimization
5. Real-time update in feed

### Theme System

- Persistent theme preference using Redux Persist
- Automatic class toggling on HTML element
- Smooth transitions between light and dark modes

### State Management Architecture

- **authSlice**: User authentication state, profile data, and tweets
- **themeSlice**: Theme mode (light/dark) preferences
- **uiSlice**: UI-related state like scroll positions
- Redux Persist ensures state survives page refreshes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Pritesh Thorat**

- GitHub: [@PriteshThorat](https://github.com/PriteshThorat)

---

<div align="center">
  <p>Made with ❤️ by Pritesh Thorat</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
