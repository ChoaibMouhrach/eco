import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Form, FormBody, FormFooter, FormHead, Input } from "ui";
import { z } from "zod";
import { CreateUnitData, CreateUnitError, User } from "@/index";
import useStoreUnit from "@/hooks/useStoreUnit";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";

interface CreateUnitPageProps {
  user: User;
}

const schema = z.object({
  name: z.string().min(1).max(60),
});

export default function CreateUnitPage({ user }: CreateUnitPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<CreateUnitData>({
    resolver: zodResolver(schema),
  });

  const { mutate: createUnit, isLoading } = useStoreUnit();

  const handleSuccess = () => {
    reset();
  };

  const handleError = (error: CreateUnitError) => {
    if (error.response.data.content instanceof Array) {
      const issues = error.response.data.content;
      issues.forEach((issue) => {
        setError(issue.path[0], {
          type: "manual",
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: CreateUnitData) =>
    createUnit(data, { onError: handleError, onSuccess: handleSuccess });

  return (
    <DashboardLayout user={user}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHead
          title="Create Tag"
          description="You can create your tag just from here"
        />
        <FormBody>
          <Input
            {...register("name")}
            error={errors.name?.message}
            placeholder="Name..."
          />
        </FormBody>
        <FormFooter>
          <Button isLoading={isLoading}>Create Unit</Button>
        </FormFooter>
      </Form>
    </DashboardLayout>
  );
}
