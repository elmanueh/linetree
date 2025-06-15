import { RegisterUser } from '@/configs/api.types'
import { AuthContext } from '@/context/AuthContext'
import { AuthService } from '@/services/auth.service'
import { useContext } from 'react'

export function useAuth() {
  const { user, setUser, loading, setLoading } = useContext(AuthContext)

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const user = await AuthService.login(email, password)
      setUser(user)
    } catch (error) {
      console.error('Login failed:', error)
      throw new Error('Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await AuthService.logout()
      setUser(undefined)
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterUser) => {
    try {
      setLoading(true)
      const user = await AuthService.register(userData)
      setUser(user)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    login,
    logout,
    register
  }
}
