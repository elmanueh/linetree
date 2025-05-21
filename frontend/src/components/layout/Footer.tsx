export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Sobre la aplicación
            </h3>
            <p className="text-justify">
              Esta aplicación ha sido desarrollada como parte del{' '}
              <strong>Trabajo de Fin de Grado</strong> en Ingeniería Informática
              por <strong>Manuel Bernabé Rodríguez</strong> en la{' '}
              <span className="italic">Universidad de Murcia</span> (2025).
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Agradecimientos
            </h3>
            <p className="text-justify">
              Agradezco a mis tutores, familiares y compañeros por el apoyo y
              confianza durante el desarrollo de este proyecto. Este trabajo
              refleja el esfuerzo de varios meses de investigación y desarrollo.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Enlaces</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://github.com/elmanueh/tfg-arboles-genealogicos"
                  className="hover:text-blue-600 transition flex"
                  target="_blank"
                >
                  <img
                    src="./github.svg"
                    alt="GitHub"
                    className="w-5 h-5 inline-block mr-2"
                  />
                  <span>Github</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/manuel-bernabe-rodriguez/"
                  className="hover:text-blue-600 transition flex"
                  target="_blank"
                >
                  <img
                    src="./linkedin.svg"
                    alt="LinkedIn"
                    className="w-5 h-5 inline-block mr-1"
                  />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:bernabe2003@gmail.com"
                  className="hover:text-blue-600 transition flex"
                  target="_blank"
                >
                  <img
                    src="./email.svg"
                    alt="Email"
                    className="w-5 h-5 inline-block mr-1"
                  />
                  <span>Contacto</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Manuel Bernabé Rodríguez. Proyecto
            con fines académicos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
