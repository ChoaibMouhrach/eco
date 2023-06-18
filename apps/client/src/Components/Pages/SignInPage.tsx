import { Input, Button } from "ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import AuthLayout from "../Layouts/AuthLayout";
import { SignInData, SignInDataError } from "@/index";
import useSignIn from "@/hooks/useSignIn";

const schema = z.object({
  email: z.string().email(),
});

export default function SignInpage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const { mutate: signIn, isLoading } = useSignIn();

  const handleSuccess = () => {
    router.push("/");
  };

  const handleError = (error: SignInDataError) => {
    if (error.response.data.content instanceof Array) {
      const issues = error.response.data.content;
      issues.forEach((issue) => {
        setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: SignInData) => {
    return signIn(data, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return (
    <AuthLayout
      onSubmit={handleSubmit(onSubmit)}
      title="Welcome back"
      description="Enter your email to sign in to your account"
    >
      <Input
        error={errors.email?.message}
        {...register("email")}
        placeholder="Email Address..."
      />
      <div className="flex flex-col gap-2">
        <Button isLoading={isLoading}>Sign In</Button>
        <Button href="/sign-up" variant="outlined">
          Sign Up
        </Button>
      </div>
    </AuthLayout>
  );
}
