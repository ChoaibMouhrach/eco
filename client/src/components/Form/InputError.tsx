import { FieldError } from "react-hook-form";

export default function InputError({ error }: { error?: FieldError }) {
  return error ? <p className="text-red-700 text-sm">{error.message}</p> : null;
}
