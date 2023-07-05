import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IUser, IUserUpdate, IUserUpdateError } from "@/interfaces/User";
import { useUpdateUser } from "@/hooks";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLES } from "@/constants";
import LoadingButton from "@/components/ui/LoadingButton";
import { Button } from "@/components/ui/button";

const schema = z.object({
  firstName: z.string().min(3).max(60).optional(),
  lastName: z.string().min(3).max(60).optional(),
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\+[1-9]\d{1,14}$/)
    .optional(),
  address: z.string().min(3).max(255).optional(),
  roleId: z
    .enum(["1", "2", "3"])
    .transform((v) => Number(v))
    .optional(),
});

interface UpdateUserPageProps {
  slug: IUser;
}

export default function DashboardUpdateUserPage({ slug }: UpdateUserPageProps) {
  const form = useForm<IUserUpdate>({
    resolver: zodResolver(schema),
  });

  const { mutate: updateUser, isLoading } = useUpdateUser();

  const handleError = (err: IUserUpdateError) => {
    if (err.response.data.content instanceof Array) {
      const issues = err.response.data.content;
      issues.forEach((issue) => {
        form.setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: IUserUpdate) =>
    updateUser(
      { id: slug.id, data },
      {
        onError: handleError,
      }
    );

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
                <Input
                  defaultValue={slug.firstName}
                  {...field}
                  placeholder="John"
                />
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
                <Input
                  defaultValue={slug.lastName}
                  {...field}
                  placeholder="Doe"
                />
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
                <Input
                  defaultValue={slug.email}
                  {...field}
                  placeholder="example@example.com"
                />
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
                <Input
                  defaultValue={slug.phone}
                  {...field}
                  placeholder="+000000000000"
                />
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
                <Input
                  defaultValue={slug.address}
                  {...field}
                  placeholder="123 Main Street"
                />
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
              <Select
                onValueChange={field.onChange}
                defaultValue={String(slug.roleId)}
              >
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
            <LoadingButton>Update User</LoadingButton>
          ) : (
            <Button>Update User</Button>
          )}
        </div>
      </form>
    </Form>
  );
}
