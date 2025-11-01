import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'
import '../Home.css'

function Home() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to Home</h1>
        <p>Hello, {user.firstName || user.username || 'User'}!</p>
      </div>
      <div className="home-content">
        <div className="home-card">
          <h2>Dashboard</h2>
          <p>You have successfully logged in!</p>
          <div className="button-group">
            <button 
              onClick={() => navigate('/profile')}
              className="profile-button"
            >
              Profile
            </button>
            <button 
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

