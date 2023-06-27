import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Form, FormBody, FormFooter, FormHead, Input } from "ui";
import { z } from "zod";
import {
  Category,
  UpdateCategoryData,
  UpdateCategoryError,
  User,
} from "@/index";
import useUpdateCategory from "@/hooks/useUpdateCategory";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";

interface EditCategoryPageProps {
  user: User;
  category: Category;
}

const schema = z.object({
  name: z.string().min(1).max(60),
});

export default function EditCategoryPage({
  user,
  category,
}: EditCategoryPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UpdateCategoryData>({
    resolver: zodResolver(schema),
  });

  const { mutate: updateCategory, isLoading } = useUpdateCategory();

  const handleError = (error: UpdateCategoryError) => {
    if (error.response?.data.content instanceof Array) {
      const issues = error.response?.data.content;
      issues.forEach((issue) => {
        setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: UpdateCategoryData) =>
    updateCategory(
      { id: category.id, data },
      {
        onError: handleError,
      }
    );

  return (
    <DashboardLayout user={user}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHead
          title="Update Category"
          description="You can update your category from here"
        />
        <FormBody>
          <Input
            defaultValue={category.name}
            error={errors.name?.message}
            {...register("name")}
            placeholder="Name"
          />
        </FormBody>
        <FormFooter>
          <Button isLoading={isLoading}>Update Category</Button>
        </FormFooter>
      </Form>
    </DashboardLayout>
  );
}
