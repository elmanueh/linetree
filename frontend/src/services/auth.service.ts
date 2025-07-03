import { RegisterUser, User } from '@/configs/api.types'
import { API_URLS } from '@/configs/constants'
import { HttpService } from '@/services/http.service'
import HttpError from '@/utils/httpError'

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
      response.status === 409
        ? 'El correo electrónico ya está en uso, inténtalo con otro.'
        : 'Error en el servidor'

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
        ? 'Credenciales incorrectas'
        : 'Error en el servidor'

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
  try {
    const user = await HttpService.get<User>(API_URLS.AUTH_GET_USER)
    return user
  } catch (error) {
    const err = error as HttpError
    if (err.status === 401) return undefined
  }
}

export const AuthService = {
  register,
  login,
  logout,
  getUser
}
