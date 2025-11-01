import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'
import '../Profile.css'

function Profile() {
  const navigate = useNavigate()
  const [RemoteApp, setRemoteApp] = useState<React.ComponentType | null>(null)
  const [RemoteProfile, setRemoteProfile] = useState<React.ComponentType | null>(null)
  const [currentView, setCurrentView] = useState<'app' | 'profile'>('app')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadRemote() {
      try {
        // Load remoteEntry.js if not already loaded
        if (!(window as any).remote) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script')
            script.src = import.meta.env.VITE_REMOTE_ENTRY_URL || 'http://localhost:3001/remoteEntry.js'
            script.onload = () => resolve()
            script.onerror = () => reject(new Error('Failed to load remoteEntry.js'))
            document.head.appendChild(script)
          })
        }

        // Wait a bit for the script to initialize
        await new Promise(resolve => setTimeout(resolve, 100))

        // Get the remote container
        const container = (window as any).remote
        if (!container || typeof container.get !== 'function') {
          throw new Error('Remote container not available or invalid')
        }

        // Initialize sharing scope (webpack's Module Federation API)
        if ((window as any).__webpack_init_sharing__) {
          await (window as any).__webpack_init_sharing__('default')
          if (container.init) {
            await container.init((window as any).__webpack_share_scopes__?.default || {})
          }
        }

        // Get both App and Profile components from remote
        const appFactory = await container.get('./App')
        const AppModule = appFactory()
        const AppComponent = AppModule.default || AppModule

        const profileFactory = await container.get('./Profile')
        const ProfileModule = profileFactory()
        const ProfileComponent = ProfileModule.default || ProfileModule
        
        setRemoteApp(() => AppComponent)
        setRemoteProfile(() => ProfileComponent)
        setLoading(false)
      } catch (err: any) {
        console.error('Failed to load remote app:', err)
        setError(err.message || 'Failed to load remote app')
        setLoading(false)
      }
    }

    loadRemote()
  }, [])

  // Listen for navigation events from remote app
  useEffect(() => {
    const handleRemoteNavigate = (event: CustomEvent) => {
      if (event.detail?.route === '/profile') {
        setCurrentView('profile')
      }
    }
    
    // Listen for logout events from remote app
    const handleUserLogout = () => {
      navigate('/login')
    }
    
    window.addEventListener('remoteNavigate' as any, handleRemoteNavigate as EventListener)
    window.addEventListener('userLogout', handleUserLogout)
    
    return () => {
      window.removeEventListener('remoteNavigate' as any, handleRemoteNavigate as EventListener)
      window.removeEventListener('userLogout', handleUserLogout)
    }
  }, [navigate])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Wrap App component to intercept button clicks
  const WrappedApp = RemoteApp ? () => {
    const Component = RemoteApp
    return (
      <div onClick={(e) => {
        const target = e.target as HTMLElement
        if (target.closest('.profile-button')) {
          e.preventDefault()
          e.stopPropagation()
          setCurrentView('profile')
        }
      }}>
        <Component />
      </div>
    )
  } : null

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile Page</h1>
        <p>This page shows the complete remote application</p>
        <button onClick={handleLogout} className="logout-button" style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
      <div className="profile-content">
        {loading && <div className="loading">Loading Remote App...</div>}
        {error && <div className="error">Error: {error}</div>}
        {currentView === 'app' && WrappedApp && <WrappedApp />}
        {currentView === 'profile' && RemoteProfile && <RemoteProfile />}
      </div>
    </div>
  )
}

export default Profile
