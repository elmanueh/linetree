import { useState } from 'react'

export default function Register() {
  const [avatarPreview, setAvatarPreview] = useState(null)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200 font-sans p-4">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg w-full relative overflow-hidden">
        <h2 className="text-3xl font-semibold text-green-700 mb-8 text-center">
          Registro
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Nombre"
                className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Apellidos
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Apellidos"
                className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Usuario"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
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
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex-1">
              <label
                htmlFor="birthDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de nacimiento
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avatar
              </label>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="avatar"
                  className="cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 transition"
                >
                  Subir imagen
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                {avatarPreview && (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-12 h-12 rounded-full border-2 border-green-500"
                  />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  )
}
