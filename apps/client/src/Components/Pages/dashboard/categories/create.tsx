import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Form, FormBody, FormFooter, FormHead, Input } from "ui";
import { z } from "zod";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import useStoreCategory from "@/hooks/useStoreCategory";
import { CreateCategoryData, CreateCategoryError, User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface CreateCategoryPageProps {
  user: User;
}

const schema = z.object({
  name: z.string().min(1).max(60),
});

export default function CreateCategoryPage({ user }: CreateCategoryPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<CreateCategoryData>({
    resolver: zodResolver(schema),
  });

  const { mutate: createCategory, isLoading } = useStoreCategory();

  const handleError = (error: CreateCategoryError) => {
    if (error.response.data.content instanceof Array) {
      const issues = error.response.data.content;
      issues.forEach((issue) => {
        setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const handleSuccess = () => {
    reset();
  };

  const onSubmit = (data: CreateCategoryData) =>
    createCategory(data, { onError: handleError, onSuccess: handleSuccess });

  return (
    <DashboardLayout user={user}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHead
          title="Create Category"
          description="You can create new category just from here"
        />
        <FormBody>
          <Input
            error={errors.name?.message}
            {...register("name")}
            placeholder="Category Name"
          />
        </FormBody>
        <FormFooter>
          <Button isLoading={isLoading}>Create Category</Button>
        </FormFooter>
      </Form>
    </DashboardLayout>
  );
}

export const getServerSideProps = withAuth();
