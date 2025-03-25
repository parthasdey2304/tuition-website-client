import { createContext, useState, useEffect, useContext } from 'react'
import { supabase } from '../services/supabase'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and set the user
    const session = supabase.auth.getSession()
    setUser(session?.user ?? null)
    setLoading(false)

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      toast.success('Logged in successfully!')
      return { success: true }
    } catch (error) {
      toast.error(error.message || 'Error logging in')
      return { success: false, error }
    }
  }

  const signup = async (email, password) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      toast.success('Signup successful! Please check your email for verification.')
      return { success: true }
    } catch (error) {
      toast.error(error.message || 'Error signing up')
      return { success: false, error }
    }
  }

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      })
      if (error) throw error
      return { success: true }
    } catch (error) {
      toast.error(error.message || 'Error logging in with Google')
      return { success: false, error }
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Logged out successfully!')
    } catch (error) {
      toast.error(error.message || 'Error logging out')
    }
  }

  const value = {
    user,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
