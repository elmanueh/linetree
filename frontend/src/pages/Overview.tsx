import FunctionalityCard from '@/components/FuncionalityCard'
import ComingSoonIcon from '@/components/icons/CommingSoonIcon'
import GedcomIcon from '@/components/icons/GedcomIcon'
import NodeIcon from '@/components/icons/NodeIcon'
import SecurityIcon from '@/components/icons/SecurityIcon'
import TreeIcon from '@/components/icons/TreeIcon'
import VisualizationIcon from '@/components/icons/VisualizationIcon'

export default function Overview() {
  return (
    <main className="px-8 py-16 pb-0 text-gray-800">
      <section className="text-center mb-20">
        <h1 className="text-5xl font-extrabold text-green-700 mb-6">
          Bienvenido a GenealogyApp
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-600">
          GenealogyApp es una aplicación web para crear, visualizar y compartir
          árboles genealógicos de forma sencilla y colaborativa.
        </p>
        <p className="mt-4 text-sm text-gray-500 italic">
          Esta aplicación forma parte del Trabajo de Fin de Grado (TFG) en
          Ingeniería Informática de la Universidad de Murcia.
        </p>

        <img
          src="https://treemily.com/wp-content/uploads/2021/08/What-is-Genealogy.png"
          alt="Árbol genealógico ilustración"
          className="mx-auto mt-8 rounded-lg max-h-64 object-cover"
        />
      </section>

      <section className="max-w-6xl mx-auto mb-20 px-4">
        <h2 className="text-3xl font-semibold text-green-700 mb-10 border-l-4 border-green-600 pl-4">
          Funcionalidades de la aplicación
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <FunctionalityCard
            title="Gestión de árboles genealógicos"
            description="Crea y edita árboles genealógicos personalizados con una interfaz intuitiva."
            icon={<TreeIcon />}
          />
          <FunctionalityCard
            title="Visualización interactiva"
            description="Explora los árboles con un diseño jerárquico claro y adaptativo."
            icon={<VisualizationIcon />}
          />
          <FunctionalityCard
            title="Gestión de personas"
            description="Añade, edita o elimina miembros del árbol fácilmente."
            icon={<NodeIcon />}
          />
          <FunctionalityCard
            title="Importación y exportación"
            description="Importa archivos GEDCOM o exporta tus árboles para conservarlos."
            icon={<GedcomIcon />}
          />
          <FunctionalityCard
            title="Acceso seguro"
            description="Protege tus árboles con autenticación y gestión de permisos."
            icon={<SecurityIcon />}
          />
          <FunctionalityCard
            title="Próximamente"
            description="Estamos trabajando en nuevas funcionalidades para mejorar tu experiencia."
            icon={<ComingSoonIcon />}
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-green-700 mb-6">
          ¿Quieres contribuir?
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          Si encuentras errores, tienes ideas de mejora o quieres aportar
          código, ¡tu ayuda es bienvenida! Puedes colaborar en el proyecto a
          través de nuestro repositorio público en GitHub.
        </p>
        <a
          href="https://github.com/elmanueh/tfg-arboles-genealogicos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
        >
          Ver en GitHub
        </a>
      </section>
    </main>
  )
}
