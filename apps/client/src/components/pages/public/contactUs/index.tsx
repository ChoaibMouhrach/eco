import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { SiMinutemailer } from "react-icons/si";
import { Breadcrumbs } from "@/components/custom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ContactUsImage from "../../../../../public/ContactUs.jpg";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export default function ContactUsPage() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {};

  return (
    <div className="container mt-8 flex flex-col gap-8">
      <Breadcrumbs
        items={[
          {
            name: "Contact Us",
            href: "/contact-us",
          },
        ]}
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="hidden lg:block">
          <Image
            src={ContactUsImage}
            alt="Contact Us"
            className="h-[800px] object-cover rounded-md"
            width="0"
            height="0"
          />
        </div>
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-semibold tracking-wide">Contact us</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid lg:grid-cols-2 gap-4"
            >
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John" />
                    </FormControl>
                    <FormDescription>Insert your first name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Doe" />
                    </FormControl>
                    <FormDescription>Insert your last name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="lg:col-start-1 lg:col-end-3">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="example@example.com" />
                    </FormControl>
                    <FormDescription>
                      Insert your email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="subject"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="lg:col-start-1 lg:col-end-3">
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Subject" />
                    </FormControl>
                    <FormDescription>Insert your subject.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="subject"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="lg:col-start-1 lg:col-end-3">
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea rows={10} {...field} placeholder="Message" />
                    </FormControl>
                    <FormDescription>Insert your message.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-fit">
                <div className="flex items-center gap-2">
                  <SiMinutemailer />
                  Send Mail
                </div>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
