import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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

const schema = z.object({
  name: z.string().min(1).max(255),
});

interface UpdateTagPageProps {
  tag: ITag;
}

export default function DashboardUpdateTagPage({ tag }: UpdateTagPageProps) {
  const [alrtOpen, setAlrtOpen] = useState<boolean>(false);
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

  const onSubmit = (data: ITagUpdate) => {
    updateTag(
      {
        id: tag.id,
        data,
      },
      {
        onSuccess: handleSuccess,
        onError: handleError,
        onSettled: () => {
          setAlrtOpen(false);
        },
      }
    );
  };

  useEffect(() => {
    setAlrtOpen(false);
  }, [form.formState.errors]);

  return (
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
                <Input defaultValue={tag.name} {...field} placeholder="Tech" />
              </FormControl>
              <FormDescription>Update your tag from here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-fit"
          type="button"
          onClick={() => setAlrtOpen(true)}
        >
          Update Tag
        </Button>

        <AlertDialog open={alrtOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently update this
                tag.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAlrtOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                {isLoading ? (
                  <LoadingButton>Updating</LoadingButton>
                ) : (
                  <Button onClick={form.handleSubmit(onSubmit)}>Update</Button>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
}
