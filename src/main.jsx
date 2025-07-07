import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import { Login, Profile, SignUp, Home, VerifyOTP } from './pages/index';
import App from './App.jsx'
import store from './store/store';
import { AuthLayout, AddProfileImg } from './components/index';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      {/*<Route path='' element={<Home/>} />
      <Route path='login' element={<Login/>} />
      <Route path='adddp' element={<AddProfileImg/>} />
      <Route path="signup" element={(
        <AuthLayout authentication={false}>
          <SignUp/>
        </AuthLayout>
      )} />
      <Route path="verify-email" element={(
        <AuthLayout authentication={true}>
          <VerifyOTP/>
        </AuthLayout>
      )} />*/}
      {/* Unprotected Routes */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="verify-email" element={<VerifyOTP />} />

      {/* Protected Routes */}
      <Route path="profile/:userId" element={<Profile/>} />
      <Route element={<AuthLayout authentication={true} />}>
        <Route index element={<Home />} />
        <Route path="adddp" element={<AddProfileImg />} />
        <Route path="profile/:userId" element={<Profile />} />
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