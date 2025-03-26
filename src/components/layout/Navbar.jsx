import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { darkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo - Left side */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Vastavik Tuitions
            </Link>
          </div>
          
          {/* Navigation Links - Middle */}
          <div className="hidden sm:flex sm:items-center justify-center flex-1">
            <div className="flex space-x-8">
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium">Home</Link>
              <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium">Courses</Link>
              <Link to="/teachers" className="hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium">Teachers</Link>
              <Link to="/centers" className="hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium">Centers</Link>
              <Link to="/payment" className="hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium">Fees Payment</Link>
            </div>
          </div>
          
          {/* Auth & Theme - Right side */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? 
                <SunIcon className="h-5 w-5 text-yellow-400" /> : 
                <MoonIcon className="h-5 w-5 text-gray-600" />
              }
            </button>
            
            {user ? (
              <>
                <Link to="/profile" className="hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium">Profile</Link>
                <Link to="/settings" className="hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium">Settings</Link>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium">Login</Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">Sign up</Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleTheme}
              className="mr-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? 
                <SunIcon className="h-5 w-5 text-yellow-400" /> : 
                <MoonIcon className="h-5 w-5 text-gray-600" />
              }
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? 
                <XMarkIcon className="block h-6 w-6" /> : 
                <Bars3Icon className="block h-6 w-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/courses" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Courses</Link>
            <Link to="/teachers" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Teachers</Link>
            <Link to="/centers" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Centers</Link>
            
            {user ? (
              <>
                <Link to="/profile" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Profile</Link>
                <Link to="/settings" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Settings</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/register" className="block px-3 py-2 text-base font-medium text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
