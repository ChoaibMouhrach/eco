import Button from "@/components/Button"
import Input from "@/components/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

type Credentials = {
  email: string
}

const schema = z.object({
  email: z.string().email()
})

export default function ForgotPassword() {

  const { register, handleSubmit, formState: { errors } } = useForm<Credentials>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (credentials: Credentials) => {
    console.log(credentials)
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
            Get Your Account Now
          </h2>
          <h3 className="text-sm text-slate-500">
            Fill the form and we will receive an email from us
          </h3>
        </div>

        <Input
          {...register("email")}
          type="email"
          name="email"
          placeholder="Email Address..."
        />
        {errors.email && <p className="text-red-700" >{errors.email.message}</p>}

        <Button>Send</Button>

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
