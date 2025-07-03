import { RegisterUser } from '@/configs/api.types'
import { NAV_ROUTES } from '@/configs/constants'
import { AuthContext } from '@/context/AuthContext'
import { AuthService } from '@/services/auth.service'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

export function useAuth() {
  const { user, setUser, loading, setLoading } = useContext(AuthContext)
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const user = await AuthService.login(email, password)
      setUser(user)
      navigate(NAV_ROUTES.HOME)
      toast.success('Usuario autenticado correctamente')
    } catch (error) {
      const err = error as Error
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await AuthService.logout()
      setUser(undefined)
      navigate(NAV_ROUTES.OVERVIEW)
      toast.success('Sesión cerrada correctamente')
    } catch (error) {
      const err = error as Error
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterUser) => {
    setLoading(true)
    try {
      const user = await AuthService.register(userData)
      setUser(user)
      navigate(NAV_ROUTES.HOME)
      toast.success('Usuario registrado correctamente')
    } catch (error) {
      const err = error as Error
      toast.error(err.message)
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
