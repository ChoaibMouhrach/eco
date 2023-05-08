export default function RootError({
  error,
}: {
  error?: Record<string, Partial<{ type: string | number; message: string }>> &
    Partial<{ type: string | number; message: string }>
}) {
  return error ? (
    <p className="p-4 bg-red-500 text-white rounded-md flex items-center justify-center py-2">
      {error.message}
    </p>
  ) : null
}
