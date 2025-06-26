interface FunctionalityCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export default function FunctionalityCard({
  title,
  description,
  icon
}: FunctionalityCardProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-start gap-4">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
