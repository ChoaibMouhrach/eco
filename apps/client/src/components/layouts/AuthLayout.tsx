import { FormEventHandler } from 'react'

export default function AuthLayout({
  children,
  title,
  description,
  onSubmit,
}: {
  children: React.ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
  title: string
  description: string
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm flex flex-col gap-2">
        <div className="flex flex-col space-y-4 text-center py-4 ">
          <h1 className="font-bold text-4xl">QM</h1>
          <h2 className="text-2xl tracking-light font-semibold">{title}</h2>
          <h3 className="text-sm text-slate-500">{description}</h3>
        </div>
        {children}
      </form>
    </main>
  )
}
