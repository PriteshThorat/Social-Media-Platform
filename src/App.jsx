import { useDispatch } from 'react-redux';
import './App.css'
import { useEffect, useState } from 'react';
import Layout from './Layout';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

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