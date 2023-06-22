import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Form, FormBody, FormFooter, FormHead, Input } from "ui";
import { z } from "zod";
import { Unit, UpdateUnitData, UpdateUnitError, User } from "@/index";
import useUpdateUnit from "@/hooks/useUpdateUnit";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";

interface EditUserPageProps {
  user: User;
  unit: Unit;
}

export default function EditUserPage({ user, unit }: EditUserPageProps) {
  const schema = z.object({
    name: z
      .string()
      .min(1)
      .max(60)
      .refine((name) => name !== unit.name, {
        message: "Change the unit first",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UpdateUnitData>({
    resolver: zodResolver(schema),
  });

  const { mutate: updateUnit, isLoading } = useUpdateUnit();

  const handleError = (error: UpdateUnitError) => {
    if (error.response.data.content instanceof Array) {
      const issues = error.response.data.content;
      issues.forEach((issue) => {
        setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = async (data: UpdateUnitData) =>
    updateUnit({ id: unit.id, data }, { onError: handleError });

  return (
    <DashboardLayout user={user}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHead
          title="Update Unit"
          description="You can update your unit just from here"
        />
        <FormBody>
          <Input
            error={errors.name?.message}
            defaultValue={unit.name}
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
