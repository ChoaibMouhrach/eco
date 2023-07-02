import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "@/api";
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
import { useUpdateCategory } from "@/hooks";
import {
  ICategory,
  ICategoryUpdate,
  ICategoryUpdateError,
} from "@/interfaces/Category";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";

interface EditProps {
  user: IUser;
  category: ICategory;
}

const schema = z.object({
  name: z.string().min(1).max(255),
});

export default function Edit({ user, category }: EditProps) {
  const form = useForm<ICategoryUpdate>({
    resolver: zodResolver(schema),
  });

  const { mutate: updateCategory, isLoading } = useUpdateCategory();

  const handleSuccess = () => {
    form.reset();
  };

  const handleError = (err: ICategoryUpdateError) => {
    if (err.response.data.content instanceof Array) {
      const issues = err.response.data.content;
      issues.forEach((issue) => {
        form.setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: ICategoryUpdate) =>
    updateCategory(
      { id: category.id, data },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      }
    );

  return (
    <DashboardLayout user={user} title="" description="">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="TV"
                    defaultValue={category.name}
                  />
                </FormControl>
                <FormDescription>
                  Change the name of the category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {isLoading ? (
              <LoadingButton>Update Category</LoadingButton>
            ) : (
              <Button>Update Category</Button>
            )}
          </div>
        </form>
      </Form>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    const id = ctx.params?.id;

    try {
      const response = await api({
        url: `/categories/${id}`,
      });

      return {
        props: {
          category: response.data,
          user: ctx.auth,
        },
      };
    } catch (err) {
      return {
        redirect: {
          destination: "/404",
          permanent: true,
        },
      };
    }
  }
);
