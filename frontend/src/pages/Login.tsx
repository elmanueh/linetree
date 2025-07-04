import { NAV_ROUTES } from '@/configs/constants'
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'react-router'

export default function Login() {
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get('user') as string
    const password = formData.get('password') as string

    await login(email, password)
    form.reset()
  }

  return (
    <section className="min-h-screen w-full px-4 flex items-center justify-center bg-gray-100">
      <div className="shadow-xl rounded-xl px-4 sm:px-10 py-12 max-w-md w-full border border-white/20 bg-gray-50">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-8">
          LineTree
        </h1>

        <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
          Inicia sesión en tu cuenta
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="user"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <input
              type="text"
              id="user"
              name="user"
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/60 focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/60 focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-700">
          ¿Aún no tienes una cuenta?{' '}
          <Link
            to={NAV_ROUTES.REGISTER}
            className="text-green-700 font-medium hover:underline"
          >
            Créatela aquí
          </Link>
        </p>
      </div>
    </section>
  )
}
