import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { useEffect, useState } from 'react';
import Layout from './Layout';
import authService from './service/auth';
import { login, logout } from './store/authSlice';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const themeMode = useSelector((state) => state.theme.themeMode);

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    (async() => {
      try {
        await authService.refreshAccessToken()

        const userData = await authService.getCurrentUser()

        if(userData)
          dispatch(login({ userData }));
        else
          dispatch(logout());
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    })()
  }, []);

  return !loading ? (
    <>
      <Layout/>
      <Analytics />
      <SpeedInsights />
    </>
  ) : null;
};

export default App;