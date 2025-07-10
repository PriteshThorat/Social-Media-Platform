import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { useEffect, useState } from 'react';
import Layout from './Layout';
import authService from './service/auth';
import { login, logout } from './store/authSlice';

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const themeMode = useSelector((state) => state.theme.themeMode);

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    authService.getCurrentUser()
    .then(userData => {
      if(userData){
        dispatch(login({userData}));
      }else{
        dispatch(logout());
      }
    }) 
    .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <Layout/>
    </>
  ) : null;
};

export default App;