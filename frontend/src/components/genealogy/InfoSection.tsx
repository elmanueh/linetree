interface InfoSectionProps {
  title: string
  children: React.ReactNode
}

export function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <section className="mb-5">
      <h2 className="font-semibold text-gray-700 border-b border-gray-400 pb-1 mb-2">
        {title}
      </h2>
      <div className="space-y-1.5">{children}</div>
    </section>
  )
}
