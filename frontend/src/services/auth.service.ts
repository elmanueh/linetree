import { RegisterUser, User } from '@/configs/api.types'
import { API_URLS } from '@/configs/constants'
import { HttpService } from '@/services/http.service'

const register = async (userData: RegisterUser) => {
  const response = await fetch(API_URLS.AUTH_REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
    credentials: 'include'
  })

  if (!response.ok) {
    const errorMessage =
      response.status === 400
        ? 'Datos de registro inválidos.'
        : 'Error en el servidor.'
    throw new Error(errorMessage)
  }

  return getUser()
}

const login = async (email: string, password: string) => {
  const response = await fetch(API_URLS.AUTH_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  })

  if (!response.ok) {
    const errorMessage =
      response.status === 401
        ? 'Credenciales incorrectas.'
        : 'Error en el servidor.'
    throw new Error(errorMessage)
  }

  return getUser()
}

const logout = async () => {
  const response = await fetch(API_URLS.AUTH_LOGOUT, {
    method: 'POST',
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Error al cerrar sesión')
  }
}

const getUser = async () => {
  const user = await HttpService.get<User>(API_URLS.AUTH_GET_USER)

  if (!user) {
    throw new Error('Error al obtener el usuario')
  }

  return user
}

export const AuthService = {
  register,
  login,
  logout,
  getUser
}
