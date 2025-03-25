import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      const result = await login(email, password)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.error.message || 'Failed to login')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleGoogleLogin = async () => {
    setError(null)
    setLoading(true)
    
    try {
      const result = await loginWithGoogle()
      if (!result.success) {
        setError(result.error.message || 'Failed to login with Google')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleTruecallerLogin = () => {
    setError('Truecaller login functionality is not implemented yet.')
  }
  
  return (
    <div className="max-w-md mx-auto py-20 font-['Poppins'] min-h-[100vh] flex flex-col justify-between px-8">
      <div className="flex-1 pt-16 md:pt-28">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300">Welcome Back</h1>
          <p className="text-blue-600 dark:text-blue-400 mt-2">Sign in to continue your learning journey</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="card mb-6 mt-8">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
              Email Address
            </label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-black dark:text-white bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
              placeholder="you@example.com"
            />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-blue-700 dark:text-blue-300">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-black dark:text-white bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-full mb-4 flex justify-center items-center rounded-lg py-2.5 font-medium transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Sign In
          </button>
        </form>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-blue-300 dark:border-blue-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-blue-500 dark:text-blue-400">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={handleGoogleLogin}
            className="flex items-center justify-center px-4 py-2.5 border border-blue-300 dark:border-blue-700 rounded-lg shadow-sm text-sm font-medium text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-200"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
              </g>
            </svg>
            Google
          </button>
          
          <button 
            onClick={handleTruecallerLogin}
            className="flex items-center justify-center px-4 py-2.5 border border-blue-300 dark:border-blue-700 rounded-lg shadow-sm text-sm font-medium text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-200"
          >
            📞
            Truecaller
          </button>
        </div>
      
      <p className="text-center text-blue-600 dark:text-blue-400 py-4 mt-4">
        Don't have an account? 
        <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
          Sign up
        </Link>
      </p>
      </div>
    </div>
  )
}

export default Login
