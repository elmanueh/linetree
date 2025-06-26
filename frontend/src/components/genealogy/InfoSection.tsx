interface InfoSectionProps {
  title: string
  children: React.ReactNode
}

export function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <section className="mb-5">
      <h2 className="font-semibold text-gray-700 rounded-xl border border-gray-300 bg-gray-100 p-1 pl-4 mb-2 shadow-sm">
        {title}
      </h2>
      <div className="space-y-1.5">{children}</div>
    </section>
  )
}
