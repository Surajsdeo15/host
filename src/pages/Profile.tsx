import React, { Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'
import ErrorBoundary from '../components/ErrorBoundary'
import '../Profile.css'

// Lazy load remote app using Module Federation
const RemoteApp = React.lazy(() => import('remote/App'))

function Profile() {
  const navigate = useNavigate()

  // Listen for logout events from remote app
  useEffect(() => {
    const handleUserLogout = () => {
      logout()
      navigate('/login')
    }
    
    window.addEventListener('userLogout', handleUserLogout)
    
    return () => {
      window.removeEventListener('userLogout', handleUserLogout)
    }
  }, [navigate])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="profile-container">
      <div className="profile-header" style={{ marginBottom: '20px', padding: '15px', background: '#f7fafc', borderRadius: '8px' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#48bb78' }}>Remote Application</h2>
        <p style={{ margin: '0 0 15px 0', color: '#666' }}>Complete remote app with navbar and all pages</p>
        <button 
          onClick={handleLogout} 
          className="logout-button" 
          style={{ 
            padding: '8px 16px', 
            cursor: 'pointer',
            background: '#e53e3e',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Logout
        </button>
      </div>
      <div className="profile-content" style={{ width: '100%' }}>
        <ErrorBoundary>
          <Suspense fallback={<div className="loading">Loading Remote App...</div>}>
            <RemoteApp />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default Profile
