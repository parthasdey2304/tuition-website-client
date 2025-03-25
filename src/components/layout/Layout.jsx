import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useTheme } from '../../context/ThemeContext'

function Layout({ children }) {
  const { darkMode } = useTheme()
  
  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      <main className="flex-grow px-4 py-6 sm:px-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
