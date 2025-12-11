import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { useEffect, useState } from 'react'
import Layout from './Layout'
import authService from './service/auth'
import { login } from './store/authSlice'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { LoadingSpinner } from './components'

function App() {
  const [loading, setLoading] = useState(true)
  const [loadingText, setLoadingText] = useState("Starting up...")

  const dispatch = useDispatch()

  const themeMode = useSelector((state) => state.theme.themeMode)
  const authStatus = useSelector(state => state?.auth?.status)

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark")
    document.querySelector("html").classList.add(themeMode)
  }, [themeMode])

  useEffect(() => {
    (async () => {
      try {
        if(!authStatus){
          setLoadingText("Getting user data...")
          let user = await authService.getCurrentUser()

          if(!user || !user.data){
            setLoadingText("Refreshing authentication...")
            await authService.refreshAccessToken()

            setLoadingText("Getting user data...")
            user = await authService.getCurrentUser()

            if(user?.data){
              setLoadingText("Setting up your profile...")
              dispatch(login(user.data))
            }
          }
        }
      } catch (error) {
        setLoadingText("Something went wrong, please wait...")
        console.log(error)
      } finally {
        setLoading(false)
        setLoadingText("Almost ready...")
      }
    })()
  }, [])

  return !loading ? (
    <>
      <Layout />
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