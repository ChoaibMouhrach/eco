import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/Button";
import Input from "@/components/Input";

type Credentials = {
  email: string;
  password: string;
  password_confirmation: string;
  firstName: string;
  lastName: string;
};

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
    firstName: z.string().min(3).max(60),
    lastName: z.string().min(3).max(60),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password and Password confirmation does not match",
  });

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: Credentials) => {
    console.log(data);
  };

  console.log(errors);

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

        <div className="flex gap-2 justify-center w-full">
          <div>
            <Input
              {...register("firstName")}
              type="text"
              name="firstname"
              placeholder="First Name..."
            />
            {errors.firstName && (
              <p className="text-sm text-red-700">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register("lastName")}
              type="text"
              name="lastName"
              placeholder="Last Name..."
            />
            {errors.lastName && (
              <p className="text-sm text-red-700">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <Input
          {...register("email")}
          type="email"
          name="email"
          placeholder="Email Address..."
        />
        {errors.email && (
          <p className="text-sm text-red-700">{errors.email.message}</p>
        )}
        <Input
          {...register("password")}
          type="password"
          name="password"
          placeholder="Password..."
        />
        {errors.password && (
          <p className="text-sm text-red-700">{errors.password.message}</p>
        )}
        <Input
          {...register("password_confirmation")}
          type="password"
          name="password_confirmation"
          placeholder="Password Confirmation..."
        />
        {errors.password_confirmation && (
          <p className="text-sm text-red-700">
            {errors.password_confirmation.message}
          </p>
        )}

        <Button>Sign up</Button>

        <div className="py-4 relative flex flex-col items-center justify-center">
          <div className="h-[1px] bg-slate-400 rounded-md w-full"></div>
          <p className="absolute p-2 bg-white text-slate-500 text-sm">OR</p>
        </div>

        <Button href="/sign-in" variation="outlined">
          Sign in
        </Button>
      </form>
    </main>
  );
}
