import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DashboardLayout } from "@/components/layouts";
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
import { useStoreCategory } from "@/hooks";
import { ICategoryStore, ICategoryStoreError } from "@/interfaces/Category";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";

interface CreateProps {
  user: IUser;
}

const schema = z.object({
  name: z.string().min(1).max(255),
});

export default function Create({ user }: CreateProps) {
  const form = useForm<ICategoryStore>({
    resolver: zodResolver(schema),
  });

  const { mutate: storeCategory, isLoading } = useStoreCategory();

  const handleSuccess = () => form.reset();

  const handleError = (error: ICategoryStoreError) => {
    if (error.response.data.content instanceof Array) {
      const issues = error.response.data.content;
      issues.forEach((issue) => {
        form.setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: ICategoryStore) =>
    storeCategory(data, {
      onSuccess: handleSuccess,
      onError: handleError,
    });

  return (
    <DashboardLayout
      user={user}
      title="Create Category"
      description="You can create new categories from here."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Keyboard" />
                </FormControl>
                <FormDescription>
                  Create new category by providing it&apos;s name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {isLoading ? (
              <LoadingButton>Create Category</LoadingButton>
            ) : (
              <Button>Create Category</Button>
            )}
          </div>
        </form>
      </Form>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth();
