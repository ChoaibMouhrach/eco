import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Logo } from "@/components/custom";
import { SignUpData, SignUpError } from "@/interfaces/User";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/LoadingButton";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@/hooks";

const schema = z.object({
  firstName: z.string().min(3).max(60),
  lastName: z.string().min(3).max(60),
  email: z.string().email(),
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/gi),
  address: z.string().min(3).max(255),
});

export default function SignUpPage() {
  const form = useForm<SignUpData>({
    resolver: zodResolver(schema),
  });

  const { mutate: signUp, isLoading } = useSignUp();

  const handleSignUpError = (error: SignUpError) => {
    if (error.response.data.content instanceof Array) {
      const issues = error.response.data.content;
      issues.forEach((issue) => {
        form.setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: SignUpData) =>
    signUp(data, {
      onError: handleSignUpError,
    });

  return (
    <main className="h-screen grid lg:grid-cols-2 p-8 gap-8">
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
      <section className="flex flex-col items-center justify-center relative">
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
                <p className="text-neutral-500">
                  Create an account and join us.
                </p>
              </div>

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormDescription>Enter your first name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormDescription>Enter your last name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormDescription>Enter your email address.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="+212000000000" {...field} />
                    </FormControl>
                    <FormDescription>Enter your phone number.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="21 jump street" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your current address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isLoading ? (
                <LoadingButton>Signing you up</LoadingButton>
              ) : (
                <Button>Sign Up</Button>
              )}
            </form>

            <Button asChild variant="outline">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </Form>
      </section>
    </main>
  );
}
