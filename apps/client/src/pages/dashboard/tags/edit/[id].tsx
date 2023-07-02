import { zodResolver } from "@hookform/resolvers/zod";
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
import { useUpdateTag } from "@/hooks";
import { ITag, ITagUpdate, ITagUpdateError } from "@/interfaces/Tag";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";

interface EditProps {
  user: IUser;
  tag: ITag;
}

const schema = z.object({
  name: z.string().min(1).max(255),
});

export default function Edit({ user, tag }: EditProps) {
  const form = useForm<ITagUpdate>({
    resolver: zodResolver(schema),
  });

  const { mutate: updateTag, isLoading } = useUpdateTag();

  const handleError = (err: ITagUpdateError) => {
    if (err.response.data.content instanceof Array) {
      const issues = err.response.data.content;
      issues.forEach((issue) => {
        form.setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const handleSuccess = () => {
    form.reset();
  };

  const onSubmit = (data: ITagUpdate) =>
    updateTag(
      {
        id: tag.id,
        data,
      },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      }
    );

  return (
    <DashboardLayout
      user={user}
      title="Update Tag"
      description="You can update certain tags just from here."
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
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={tag.name}
                    {...field}
                    placeholder="Tech"
                  />
                </FormControl>
                <FormDescription>Update your tag from here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {isLoading ? (
              <LoadingButton>Update Tag</LoadingButton>
            ) : (
              <Button>Update Tag</Button>
            )}
          </div>
        </form>
      </Form>
    </DashboardLayout>
  );
}

export const getServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    try {
      const response = await api({
        url: `/tags/${ctx.params?.id}`,
      });

      return {
        props: {
          tag: response.data,
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
