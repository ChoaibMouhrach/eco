import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { MdOutlineChevronLeft } from "react-icons/md";
import ContactUsImage from "../../../../public/ContactUs.jpg";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SignInData, SignInError } from "@/interfaces/User";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignIn } from "@/hooks";
import LoadingButton from "@/components/ui/LoadingButton";
import { Logo } from "@/components/custom";

const schema = z.object({
  email: z.string().email(),
});

export default function SignInPage() {
  const form = useForm<SignInData>({
    resolver: zodResolver(schema),
  });

  const { mutate: signIn, isLoading } = useSignIn();

  const handleSignInError = (err: SignInError) => {
    if (err.response.data.content instanceof Array) {
      const issues = err.response.data.content;
      issues.forEach((issue) => {
        form.setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: SignInData) =>
    signIn(data, {
      onError: handleSignInError,
    });

  return (
    <main className="h-screen grid lg:grid-cols-2 p-8 gap-8">
      <section className="flex items-center justify-center relative">
        <Button variant="ghost" className="absolute top-0 left-0" asChild>
          <Link href="/" className="flex items-center gap-1 ">
            <MdOutlineChevronLeft className="text-xl" />
            <span>Home</span>
          </Link>
        </Button>
        <Form {...form}>
          <div className="flex flex-col gap-4  w-full max-w-sm">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col items-center">
                <Logo />
                <p className="text-neutral-500">Welcome back</p>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your email address to sign in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isLoading ? (
                <LoadingButton>Signing you in</LoadingButton>
              ) : (
                <Button>Sign In</Button>
              )}
            </form>

            <Button asChild variant="outline" type="button">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </Form>
      </section>

      <section className="relative hidden lg:block">
        <Image
          className="w-full h-full absolute top-0 left-0 object-cover rounded-md"
          src={ContactUsImage}
          alt="Contact Us"
        />
        <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full rounded-md flex items-end justify-start text-white">
          <div className="p-8 flex flex-col gap-2">
            <h2>
              <Logo />
            </h2>
            <p className="max-w-lg text-lead">
              Welcome to Eco - your ultimate online destination for all your
              building material needs! We pride ourselves on being a
              comprehensive online store that caters to builders, contractors,
              and DIY enthusiasts alike. With a wide range of products, seamless
              navigation, and advanced features, we strive to provide a one-stop
              solution for all your construction requirements.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
