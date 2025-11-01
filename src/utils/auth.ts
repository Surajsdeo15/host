/**
 * Shared authentication utilities
 * These functions can be used by both host and remote applications
 */

export const logout = () => {
  // Clear all authentication data
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  
  // Check if we're in the host app (has React Router) or remote app
  const isHostApp = window.location.pathname.includes('/login') || 
                   window.location.pathname.includes('/home') ||
                   window.location.pathname.includes('/profile')
  
  // Dispatch a logout event that both apps can listen to
  const logoutEvent = new CustomEvent('userLogout')
  window.dispatchEvent(logoutEvent)
  
  // Redirect to login page
  // For host app, the navigation will be handled by React Router
  // For remote app, we'll use window.location
  if (isHostApp) {
    // This will be handled by React Router in the host app
    window.location.href = '/login'
  } else {
    // For remote standalone mode
    window.location.href = '/login'
  }
}

