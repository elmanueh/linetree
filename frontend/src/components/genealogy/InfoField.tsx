interface InfoFieldProps {
  label: string
  value: string | null | undefined
}

export function InfoField({ label, value }: InfoFieldProps) {
  if (!value) return null
  return (
    <div className="pb-1.5 pl-1">
      <p className="font-medium text-gray-600 text-sm">{label}</p>
      <p className="mt-0.5 text-gray-800 text-sm">{value}</p>
    </div>
  )
}
