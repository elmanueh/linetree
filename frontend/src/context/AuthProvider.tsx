import { User } from '@/configs/api.types'
import { AuthContext } from '@/context/AuthContext'
import { AuthService } from '@/services/auth.service'
import { useEffect, useState } from 'react'

interface GenealogyProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: GenealogyProviderProps) {
  const [user, setUser] = useState<User | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AuthService.getUser()
        setUser(user)
      } catch {
        setUser(undefined)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
