import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "@/components/ui/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStoreUser } from "@/hooks";
import { IUserCreate, IUserCreateError } from "@/interfaces/User";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLES } from "@/constants";

const schema = z.object({
  firstName: z.string().min(3).max(60),
  lastName: z.string().min(3).max(60),
  email: z.string().email(),
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/),
  address: z.string().min(3).max(255),
  roleId: z.enum(["1", "2", "3"]).transform((v) => Number(v)),
});

export default function DashboardCreateUserPage() {
  const form = useForm<IUserCreate>({
    resolver: zodResolver(schema),
  });

  const { mutate: createUser, isLoading } = useStoreUser();

  const handleError = (err: IUserCreateError) => {
    if (err.response.data.content instanceof Array) {
      const issues = err.response.data.content;
      issues.forEach((issue) => {
        form.setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: IUserCreate) =>
    createUser(data, {
      onError: handleError,
    });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
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
              <FormDescription>The first name of the user</FormDescription>
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
              <FormDescription>The last name of the user</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="example@example.com" />
              </FormControl>
              <FormDescription>The email address of the user.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="+000000000000" />
              </FormControl>
              <FormDescription>The phone number of the user</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="123 Main Street" />
              </FormControl>
              <FormDescription>The address of the user</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={String(ROLES.MEMBER)}>Member</SelectItem>
                  <SelectItem value={String(ROLES.ADMIN)}>Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose user role.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {isLoading ? (
            <LoadingButton>Create User</LoadingButton>
          ) : (
            <Button>Create User</Button>
          )}
        </div>
      </form>
    </Form>
  );
}
