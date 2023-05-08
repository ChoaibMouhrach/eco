export default function Card({
  children,
  title,
  description,
}: {
  title?: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="border rounded-md">
      <div className="border-b p-4">
        <h1 className="text-2xl tracking-wide font-bold">{title}</h1>
        <p className="text-neutral-500">{description}</p>
      </div>
      {children}
    </div>
  )
}
