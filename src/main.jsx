import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import { Login, Profile, SignUp, Home, VerifyOTP, ForgotPassword } from './pages/index';
import App from './App.jsx'
import store from './store/store';
import { AuthLayout, AddProfileImg } from './components/index';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      {/* Unprotected Routes */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="verify-email" element={<VerifyOTP />} />
      <Route index element={<Home />} />
      <Route path="profile/:username" element={<Profile />} />

      {/* Protected Routes */}
      <Route element={<AuthLayout authentication={true} />}>
        <Route path="change-avatar" element={<AddProfileImg />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
);