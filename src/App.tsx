import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import './App.css'

function App() {
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem('token')
  )

  const handleLogin = (newToken: string) => {
    setToken(newToken)
  }

  // Listen for logout events from remote app
  React.useEffect(() => {
    const handleLogout = () => {
      setToken(null)
      window.location.href = '/login'
    }
    
    window.addEventListener('userLogout', handleLogout)
    
    return () => {
      window.removeEventListener('userLogout', handleLogout)
    }
  }, [])

  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    return token ? <>{children}</> : <Navigate to="/login" />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/home" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
