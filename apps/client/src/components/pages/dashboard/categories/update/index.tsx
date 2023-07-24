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
import {
  ICategory,
  ICategoryUpdate,
  ICategoryUpdateError,
} from "@/interfaces/Category";
import { useUpdateCategory } from "@/hooks";
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
import LoadingButton from "@/components/ui/LoadingButton";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1).max(255),
});

interface UpdateCategoryPageProps {
  category: ICategory;
}

export default function DashboardUpdateCategoryPage({
  category,
}: UpdateCategoryPageProps) {
  const [alrtOpen, setAlrtOpen] = useState<boolean>(false);
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
        onSettled: () => {
          setAlrtOpen(false);
        },
      }
    );

  useEffect(() => {
    setAlrtOpen(false);
  }, [form.formState.errors]);

  return (
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

        <Button
          className="w-fit"
          type="button"
          onClick={() => setAlrtOpen(true)}
        >
          Update Category
        </Button>

        <AlertDialog open={alrtOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently update this
                category.
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
