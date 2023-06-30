import { GetServerSideProps } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { withGuest } from "@/middlewares";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/layouts";
import { SignInData, SignInError } from "@/interfaces/User";
import { useSignIn } from "@/hooks";

const schema = z.object({
  email: z.string().email(),
});

export default function SignIn() {
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
        <Button isLoading={isLoading}>Sign In</Button>
        <Button asChild variant="outline">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withGuest();
