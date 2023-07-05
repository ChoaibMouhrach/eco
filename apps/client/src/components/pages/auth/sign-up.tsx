import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts";
import LoadingButton from "@/components/ui/LoadingButton";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks";
import { SignUpData, SignUpError } from "@/interfaces/User";
import { Button } from "@/components/ui/button";

const schema = z.object({
  firstName: z.string().min(3).max(60),
  lastName: z.string().min(3).max(60),
  email: z.string().email(),
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/gi),
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

  const { mutate: signUp, isLoading } = useSignUp();

  const handleError = (data: SignUpError) => {
    if (data.response.data.content instanceof Array) {
      data.response.data.content.forEach((issue) => {
        setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: SignUpData) =>
    signUp(data, {
      onError: handleError,
    });

  return (
    <AuthLayout onSubmit={handleSubmit(onSubmit)}>
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
        {isLoading ? (
          <LoadingButton>Sign Up</LoadingButton>
        ) : (
          <Button>Sign Up</Button>
        )}
        <Button asChild variant="outline">
          <Link href="/sign-up">Sign In</Link>
        </Button>
      </div>
    </AuthLayout>
  );
}
