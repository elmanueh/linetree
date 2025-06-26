import { RegisterUser } from '@/configs/api.types'
import { NAV_ROUTES, NodeGenderType } from '@/configs/constants'
import { useAuth } from '@/hooks/useAuth'
import { Link, useNavigate } from 'react-router'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const birthDateStr = formData.get('birthDate') as string

    const userData: RegisterUser = {
      birthDate: new Date(birthDateStr),
      email: formData.get('email') as string,
      firstName: formData.get('firstName') as string,
      gender: formData.get('gender') as NodeGenderType,
      lastName: formData.get('lastName') as string,
      password: formData.get('password') as string
    }

    try {
      await register(userData)
      navigate(NAV_ROUTES.HOME)
    } catch {
      alert('Error al registrarse. Inténtalo de nuevo.')
    }
    form.reset()
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="shadow-xl rounded-xl px-12 py-10 w-full max-w-3xl border border-white/20 bg-gray-50">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-8">
          Genealogy App
        </h1>

        <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
          Regístrate para comenzar
        </h2>

        <form onSubmit={handleRegister} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              name="firstName"
              type="text"
              required
              placeholder="Nombre"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellidos
            </label>
            <input
              name="lastName"
              type="text"
              required
              placeholder="Apellidos"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Género
            </label>
            <select
              name="gender"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none"
            >
              <option value="">Selecciona una opción</option>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de nacimiento
            </label>
            <input
              name="birthDate"
              type="date"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
            >
              Registrarse
            </button>
          </div>
        </form>

        <p className="mt-6 text-sm text-center text-gray-700">
          ¿Ya tienes una cuenta?{' '}
          <Link
            to={NAV_ROUTES.LOGIN}
            className="text-green-700 font-medium hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
