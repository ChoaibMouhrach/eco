export default function RootSuccess({ message }: { message: string }) {
  return message ? (
    <p className="p-4 bg-green-600 text-white rounded-md flex items-center justify-center py-2">
      {message}
    </p>
  ) : null
}
