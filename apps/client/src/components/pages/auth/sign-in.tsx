import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/hooks";
import { SignInData, SignInError } from "@/interfaces/User";
import LoadingButton from "@/components/ui/LoadingButton";

const schema = z.object({
  email: z.string().email(),
});

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInData>({
    resolver: zodResolver(schema),
  });

  const { mutate: signIn, isLoading } = useSignIn();

  const handleError = (error: SignInError) => {
    if (error.response.data.content instanceof Array) {
      const issues = error.response.data.content;
      issues.forEach((issue) => {
        setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: SignInData) =>
    signIn(data, {
      onError: handleError,
    });

  return (
    <AuthLayout onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <div>
          <Input
            {...register("email")}
            error={errors.email?.message}
            placeholder="example@example.com"
          />
        </div>
        {isLoading ? (
          <LoadingButton>Sign In</LoadingButton>
        ) : (
          <Button>Sign In</Button>
        )}
        <Button asChild variant="outline">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </AuthLayout>
  );
}
