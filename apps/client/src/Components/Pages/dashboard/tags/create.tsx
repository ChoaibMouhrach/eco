import { Button, Form, FormBody, FormFooter, FormHead, Input } from "ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { StoreTagData, StoreTagError, User } from "@/index";
import useStoreTag from "@/hooks/useStoreTag";

interface CreateTagPageProps {
  user: User;
}

const schema = z.object({
  name: z.string().min(1).max(60),
});

export default function CreateTagPage({ user }: CreateTagPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<StoreTagData>({
    resolver: zodResolver(schema),
  });

  const { mutate: storeTag, isLoading } = useStoreTag();

  const handleError = (error: StoreTagError) => {
    if (error.response.data.content instanceof Array) {
      error.response.data.content.forEach((issue) => {
        setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const handleSuccess = () => {
    reset();
  };

  const onSubmit = (data: StoreTagData) =>
    storeTag(data, {
      onSuccess: handleSuccess,
      onError: handleError,
    });

  return (
    <DashboardLayout user={user}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHead
          title="Create Tag"
          description="You can create a new tag from here"
        />
        <FormBody>
          <Input
            error={errors.name?.message}
            {...register("name")}
            placeholder="Name..."
          />
        </FormBody>
        <FormFooter>
          <Button isLoading={isLoading}>Create Tag</Button>
        </FormFooter>
      </Form>
    </DashboardLayout>
  );
}
