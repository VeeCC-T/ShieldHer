/**
 * Main Entry Point
 * ShieldHer React Application
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('shieldher_safety_settings');
if (savedTheme) {
  try {
    const settings = JSON.parse(savedTheme);
    if (settings.theme) {
      document.documentElement.setAttribute('data-theme', settings.theme);
    }
  } catch (err) {
    console.warn('Could not load saved theme:', err);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
