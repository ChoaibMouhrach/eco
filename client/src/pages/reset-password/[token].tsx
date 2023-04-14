import Button from "@/components/Button"
import Input from "@/components/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

type Credentials = {
  password: string;
  password_confirmation: string
}

const schema = z.object({
  password: z.string().min(8),
  password_confirmation: z.string().min(8)
}).refine((data) => data.password === data.password_confirmation, { message: "Password and Password confirmation does not match" })

export default function ResetPassword() {

  const { register, handleSubmit, formState: { errors } } = useForm<Credentials>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: Credentials) => {

  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm flex flex-col gap-2 "
      >
        <div className="flex flex-col space-y-4 text-center py-4 ">
          <h1 className="font-bold text-4xl">QM</h1>
          <h2 className="text-2xl tracking-light font-semibold">
            Reset Your Password
          </h2>
          <h3 className="text-sm text-slate-500">
            Fill the fields and We will reset your password
          </h3>
        </div>

        <Input
          {...register("password")}
          type="password"
          name="password"
          placeholder="Password..."
        />
        {errors.password && <p className="text-red-700" >{errors.password.message}</p>}

        <Input
          {...register("password_confirmation")}
          type="password"
          name="password"
          placeholder="Password Confirmation..."
        />
        {errors.password_confirmation && <p className="text-red-700" >{errors.password_confirmation.message}</p>}

        <Button>Reset Password</Button>

        <div className="py-4 relative flex flex-col items-center justify-center">
          <div className="h-[1px] bg-slate-400 rounded-md w-full"></div>
          <p className="absolute p-2 bg-white text-slate-500 text-sm">OR</p>
        </div>

        <Button href="/sign-in" variation="outlined">
          Sign in
        </Button>
      </form>
    </main>
  )
}
