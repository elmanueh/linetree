import { User } from '@/configs/api.types'
import { createContext } from 'react'

interface AuthContextType {
  user: User | undefined
  setUser: (user: User | undefined) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const AuthContext = createContext<AuthContextType>(undefined!)
