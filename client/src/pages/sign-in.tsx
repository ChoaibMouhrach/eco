import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/Input";
import Button from "@/components/Button";

type Credentials = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  const onSubmit = (data: Credentials) => {
    console.log(data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm flex flex-col gap-2 "
      >
        <div className="flex flex-col space-y-4 text-center py-4 ">
          <h1 className="font-bold text-4xl">QM</h1>
          <h2 className="text-2xl tracking-light font-semibold">
            Welcome Back
          </h2>
          <h3 className="text-sm text-slate-500">
            Enter your email and password to sign in to your account
          </h3>
        </div>

        <Input
          {...register("email")}
          type="email"
          name="email"
          placeholder="Email Address..."
        />
        {errors.email && <p className="text-red-700 text-sm" >{errors.email.message}</p>}

        <Input
          {...register("password")}
          type="password"
          name="password"
          placeholder="Password..."
        />
        {errors.password && <p className="text-red-700 text-sm" >{errors.password.message}</p>}

        <Button>Sign in</Button>

        <div className="py-4 relative flex flex-col items-center justify-center">
          <div className="h-[1px] bg-slate-400 rounded-md w-full"></div>
          <p className="absolute p-2 bg-white text-slate-500 text-sm">OR</p>
        </div>

        <Button href="/sign-up" variation="outlined">
          Sign up
        </Button>
      </form>
    </main>
  );
}
