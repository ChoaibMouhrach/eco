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
import { useStoreTag } from "@/hooks";
import { ITagCreate, ITagCreateError } from "@/interfaces/Tag";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";

interface TagsProps {
  user: IUser;
}

const schema = z.object({
  name: z.string().min(1).max(255),
});

export default function Tags({ user }: TagsProps) {
  const form = useForm<ITagCreate>({
    resolver: zodResolver(schema),
  });

  const { mutate: createTag, isLoading } = useStoreTag();

  const handleSuccess = () => {
    form.reset();
  };

  const handleError = (err: ITagCreateError) => {
    if (err.response.data.content instanceof Array) {
      const issues = err.response.data.content;
      issues.forEach((issue) => {
        form.setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: ITagCreate) =>
    createTag(data, {
      onSuccess: handleSuccess,
      onError: handleError,
    });

  return (
    <DashboardLayout
      user={user}
      title="Create Tag"
      description="You can create new tags from here."
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
                <FormLabel>Tag Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Tech" />
                </FormControl>
                <FormDescription>Insert tag name to create it.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {isLoading ? (
              <LoadingButton>Create Tag</LoadingButton>
            ) : (
              <Button>Create Tag</Button>
            )}
          </div>
        </form>
      </Form>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth();
