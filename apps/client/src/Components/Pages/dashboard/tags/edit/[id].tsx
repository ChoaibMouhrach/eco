import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormBody, FormFooter, FormHead, Input } from "ui";
import { z } from "zod";
import { Tag, UpdateTagData, UpdateTagError, User } from "@/index";
import useUpdateTag from "@/hooks/useUpdateTag";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";

interface EditTagPageProps {
  user: User;
  tag: Tag;
}

export default function EditTagPage({ user, tag }: EditTagPageProps) {
  const schema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(1)
          .max(60)
          .refine((name) => name !== tag.name, {
            message: "Change the name first",
          }),
      }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UpdateTagData>({
    resolver: zodResolver(schema),
  });

  const { mutate: updateTag, isLoading } = useUpdateTag();

  const handleError = (error: UpdateTagError) => {
    if (error.response.data.content instanceof Array) {
      error.response.data.content.forEach((err) => {
        setError(err.path[0], {
          message: err.message,
        });
      });
    }
  };

  const onSubmit = (data: UpdateTagData) =>
    updateTag({ id: tag.id, data }, { onError: handleError });

  return (
    <DashboardLayout user={user}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHead
          title="Update Tag"
          description="You can update your tag just from here"
        />
        <FormBody>
          <Input
            error={errors.name?.message}
            {...register("name")}
            defaultValue={tag.name}
            placeholder="Name"
          />
        </FormBody>
        <FormFooter>
          <Button isLoading={isLoading}>Update Tag</Button>
        </FormFooter>
      </Form>
    </DashboardLayout>
  );
}
