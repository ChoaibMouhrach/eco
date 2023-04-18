import Button from "@/components/Button";
import Input from "@/components/Form/Input";
import RootError from "@/components/RootError";
import RootSuccess from "@/components/RootSuccess";
import AuthLayout from "@/components/layouts/AuthLayout";
import { useResetPasswordMutation } from "@/features/apis/authApi";
import { handleResponseErrors } from "@/lib/responseHandlers";
import { ResponseError } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Credentials = {
  password: string;
  password_confirmation: string;
};

const schema = z
  .object({
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password and Password confirmation does not match",
    path: ["password_confirmation"],
  });

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query as { token: string };

  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: Credentials) => {
    const response = await resetPassword({
      token,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });

    if ("error" in response)
      handleResponseErrors<keyof Credentials>(
        response.error as ResponseError<keyof Credentials>,
        setError
      );

    if ("data" in response) router.push("/sign-in");
  };

  return (
    <AuthLayout
      onSubmit={handleSubmit(onSubmit)}
      title="Reset Your Password"
      description="Please fill out the fields below so that we can reset your password."
    >
      <RootError error={errors.root} />
      <RootSuccess message={isSuccess ? "Password Changed successfully" : ""} />

      <Input
        {...register("password")}
        type="password"
        placeholder="Password..."
        error={errors.password}
      />

      <Input
        {...register("password_confirmation")}
        type="password"
        placeholder="Password Confirmation..."
        error={errors.password_confirmation}
      />

      <Button state={isLoading ? "loading" : undefined}>Reset Password</Button>

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
