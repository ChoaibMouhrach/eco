import Button from "@/components/Button";
import Input from "@/components/Form/Input";
import InputError from "@/components/Form/InputError";
import RootSuccess from "@/components/RootSuccess";
import AuthLayout from "@/components/layouts/AuthLayout";
import { useForgotPasswordMutation } from "@/features/apis/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Credentials = {
  email: string;
};

const schema = z.object({
  email: z.string().email(),
});

export default function ForgotPassword() {
  const [forgotPassword, { isLoading, data }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (credentials: Credentials) =>
    await forgotPassword(credentials);

  return (
    <AuthLayout onSubmit={handleSubmit(onSubmit)} title="Forgot Your Password?" description="Please fill out the form below and you will receive an email from us." >

      <RootSuccess message={data ? data.message : ""} />

      <Input
        {...register("email")}
        type="email"
        name="email"
        placeholder="Email Address..."
      />
      <InputError error={errors.email} />

      <Button state={isLoading ? "loading" : undefined}>Send</Button>

      <div className="py-4 relative flex flex-col items-center justify-center">
        <div className="h-[1px] bg-slate-400 rounded-md w-full"></div>
        <p className="absolute p-2 bg-white text-slate-500 text-sm">OR</p>
      </div>

      <Button href="/sign-in" variation="outlined">
        Sign in
      </Button>
    </AuthLayout>
  );
}
