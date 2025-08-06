import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { useEffect, useState } from 'react';
import Layout from './Layout';
import authService from './service/auth';
import { login, logout } from './store/authSlice';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { LoadingSpinner } from './components';

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Starting up...");

  const dispatch = useDispatch();

  const themeMode = useSelector((state) => state.theme.themeMode);

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    (async() => {
      try {
        setLoadingText("Refreshing authentication...");
        await authService.refreshAccessToken()

        setLoadingText("Getting user data...");
        const userData = await authService.getCurrentUser()

        if(userData) {
          setLoadingText("Setting up your profile...");
          dispatch(login({ userData }));
        } else {
          setLoadingText("Finishing setup...");
          dispatch(logout());
        }
      } catch (error) {
        setLoadingText("Something went wrong, please wait...");
        console.log(error)
      } finally {
        setLoadingText("Almost ready...");
        setTimeout(() => {
          setLoading(false);
        }, 500); 
      }
    })()
  }, []);

  return !loading ? (
    <>
      <Layout/>
      <Analytics />
      <SpeedInsights />
    </>
  ) : (
    <LoadingSpinner 
      fullScreen={true} 
      text={loadingText}
      size="large" 
    />
  );
};

export default App;