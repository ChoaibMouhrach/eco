import { Button, Input } from "ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { SignUpData, SignUpDataError } from "@/index";
import AuthLayout from "../Layouts/AuthLayout";
import useSignUp from "@/hooks/useSignUp";

const schema = z.object({
  firstName: z.string().min(3).max(60),
  lastName: z.string().min(3).max(60),
  email: z.string().email(),
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/),
  address: z.string().min(3).max(255),
});

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const { mutate: signUp, isLoading } = useSignUp();

  const handleSuccess = () => {
    router.push("/");
  };

  const handleError = (data: SignUpDataError) => {
    if (data.response.data.content instanceof Array) {
      const issues = data.response.data.content;
      issues.forEach((issue) => {
        setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: SignUpData) =>
    signUp(data, {
      onSuccess: handleSuccess,
      onError: handleError,
    });

  return (
    <AuthLayout
      onSubmit={handleSubmit(onSubmit)}
      title="Create an account"
      description="Enter your email below to create your account"
    >
      <div className="flex flex-col gap-2">
        <Input
          error={errors.firstName?.message}
          {...register("firstName")}
          placeholder="First Name..."
        />
        <Input
          error={errors.lastName?.message}
          {...register("lastName")}
          placeholder="Last Name..."
        />
        <Input
          error={errors.email?.message}
          {...register("email")}
          placeholder="Email Address..."
        />
        <Input
          error={errors.phone?.message}
          {...register("phone")}
          placeholder="Phone..."
        />
        <Input
          error={errors.address?.message}
          {...register("address")}
          placeholder="Address..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button isLoading={isLoading}>Sign Up</Button>
        <Button href="/sign-in" variant="outlined">
          Sign In
        </Button>
      </div>
    </AuthLayout>
  );
}
