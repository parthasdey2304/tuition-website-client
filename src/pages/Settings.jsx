import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import toast from 'react-hot-toast'

function Settings() {
  const { user, logout } = useAuth()
  const { darkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    smsNotifications: true,
    whatsappNotifications: false,
    accountPrivacy: 'private',
    language: 'english'
  })
  
  // Fetch user data
  useEffect(() => {
    // Simulating API call to fetch user settings
    setTimeout(() => {
      setFormData({
        ...formData,
        name: 'Ravi Kumar',
        email: user?.email || 'ravi.kumar@example.com',
        phone: '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=150',
      })
      setLoading(false)
    }, 800)
  }, [user])
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }
  
  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    // Simulate API call to update profile
    setTimeout(() => {
      toast.success('Profile updated successfully')
      setSaving(false)
    }, 1000)
  }
  
  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    
    // Validate password
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords don't match")
      return
    }
    
    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }
    
    setSaving(true)
    
    // Simulate API call to update password
    setTimeout(() => {
      toast.success('Password updated successfully')
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setSaving(false)
    }, 1000)
  }
  
  const handleNotificationUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    // Simulate API call to update notifications
    setTimeout(() => {
      toast.success('Notification preferences updated')
      setSaving(false)
    }, 1000)
  }
  
  const handlePrivacyUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    // Simulate API call to update privacy settings
    setTimeout(() => {
      toast.success('Privacy settings updated')
      setSaving(false)
    }, 1000)
  }
  
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Simulate API call to delete account
      setTimeout(() => {
        toast.success('Account deleted successfully')
        logout()
        navigate('/')
      }, 1000)
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Account Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your account preferences and personal information
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`p-3 rounded-md text-left ${
                  activeTab === 'profile' 
                    ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`p-3 rounded-md text-left ${
                  activeTab === 'password' 
                    ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Password & Security
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`p-3 rounded-md text-left ${
                  activeTab === 'notifications' 
                    ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`p-3 rounded-md text-left ${
                  activeTab === 'privacy' 
                    ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Privacy & Data
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`p-3 rounded-md text-left ${
                  activeTab === 'appearance' 
                    ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Appearance
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleDeleteAccount}
                className="w-full p-3 text-left text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-md"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Profile Information</h2>
              
              <form onSubmit={handleProfileUpdate}>
                <div className="flex flex-col md:flex-row gap-8 mb-6">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <div className="relative mb-4">
                      <img 
                        src={formData.avatar} 
                        alt={formData.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
                      />
                      <button 
                        type="button"
                        className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Profile photo helps teachers and students recognize you
                    </p>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Preferred Language
                        </label>
                        <select 
                          id="language"
                          name="language"
                          value={formData.language}
                          onChange={handleInputChange}
                          className="input"
                        >
                          <option value="english">English</option>
                          <option value="hindi">Hindi</option>
                          <option value="tamil">Tamil</option>
                          <option value="telugu">Telugu</option>
                          <option value="bengali">Bengali</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Password & Security</h2>
              
              <form onSubmit={handlePasswordUpdate}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Password
                    </label>
                    <input 
                      type="password" 
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <input 
                      type="password" 
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Password must be at least 8 characters long
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <input 
                      type="password" 
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
              
              <hr className="my-8 border-gray-200 dark:border-gray-700" />
              
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Connected Accounts</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                      </g>
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Google</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Connected</p>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm font-medium">
                    Disconnect
                  </button>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="#0077E7" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"/>
                      <path fill="#0077E7" d="M16.5,12A4.5,4.5,0,0,1,12,16.5h0A4.5,4.5,0,0,1,7.5,12h0A4.5,4.5,0,0,1,12,7.5h0A4.5,4.5,0,0,1,16.5,12Z"/>
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Truecaller</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Not connected</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm font-medium">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Notification Preferences</h2>
              
              <form onSubmit={handleNotificationUpdate}>
                <div className="space-y-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="emailNotifications"
                          name="emailNotifications"
                          checked={formData.emailNotifications}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="emailNotifications" className="ml-2 block text-gray-700 dark:text-gray-300">
                          Receive email notifications
                        </label>
                      </div>
                      
                      <div className="ml-6 text-sm text-gray-500 dark:text-gray-400">
                        You'll get emails about course updates, announcements, and upcoming classes.
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">SMS Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="smsNotifications"
                          name="smsNotifications"
                          checked={formData.smsNotifications}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="smsNotifications" className="ml-2 block text-gray-700 dark:text-gray-300">
                          Receive SMS notifications
                        </label>
                      </div>
                      
                      <div className="ml-6 text-sm text-gray-500 dark:text-gray-400">
                        You'll get text messages for class reminders and important updates.
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">WhatsApp Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="whatsappNotifications"
                          name="whatsappNotifications"
                          checked={formData.whatsappNotifications}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="whatsappNotifications" className="ml-2 block text-gray-700 dark:text-gray-300">
                          Receive WhatsApp notifications
                        </label>
                      </div>
                      
                      <div className="ml-6 text-sm text-gray-500 dark:text-gray-400">
                        You'll get WhatsApp messages for assignment feedback, doubts clarification, and important updates.
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Privacy & Data</h2>
              
              <form onSubmit={handlePrivacyUpdate}>
                <div className="space-y-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Account Privacy</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          Who can see your profile?
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="private"
                              name="accountPrivacy"
                              value="private"
                              checked={formData.accountPrivacy === 'private'}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="private" className="ml-2 block text-gray-700 dark:text-gray-300">
                              Private - Only you and your teachers
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="limited"
                              name="accountPrivacy"
                              value="limited"
                              checked={formData.accountPrivacy === 'limited'}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="limited" className="ml-2 block text-gray-700 dark:text-gray-300">
                              Limited - Students in your courses
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="public"
                              name="accountPrivacy"
                              value="public"
                              checked={formData.accountPrivacy === 'public'}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="public" className="ml-2 block text-gray-700 dark:text-gray-300">
                              Public - All TuitionHub users
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Data & Cookies</h3>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        We use cookies and similar technologies to provide, protect, and improve our services.
                      </p>
                      <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                        Learn more about our Cookie Policy
                      </a>
                    </div>
                    
                    <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mb-4">
                      Download a copy of your data
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Appearance</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Theme</h3>
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {darkMode ? 'Dark Mode' : 'Light Mode'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {darkMode 
                          ? 'Dark mode reduces eye strain in low-light environments' 
                          : 'Light mode provides better readability in well-lit environments'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="ml-4 relative inline-flex items-center h-6 rounded-full w-11 transition-colors ease-in-out duration-200 focus:outline-none"
                      style={{ backgroundColor: darkMode ? '#3B82F6' : '#E5E7EB' }}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform transition ease-in-out duration-200 rounded-full bg-white ${
                          darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Font Size</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-3 border rounded-md text-center hover:border-blue-500 focus:outline-none">
                      <span className="text-sm">Small</span>
                    </button>
                    <button className="p-3 border border-blue-500 rounded-md text-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 focus:outline-none">
                      <span className="text-base">Medium</span>
                    </button>
                    <button className="p-3 border rounded-md text-center hover:border-blue-500 focus:outline-none">
                      <span className="text-lg">Large</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
