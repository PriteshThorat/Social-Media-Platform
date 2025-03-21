import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import { Login, Profile, SignUp, Home } from './pages/index';
import App from './App.jsx'
import store from './store/store';
import { AuthLayout, AddProfileImg } from './components/index';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>} />
      <Route path='login' element={<Login/>} />
      <Route path='adddp' element={<AddProfileImg/>} />
      <Route path="signup" element={(
        <AuthLayout authentication={false}>
          <SignUp/>
        </AuthLayout>
      )} />
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