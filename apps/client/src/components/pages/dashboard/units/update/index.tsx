import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useUpdateUnit } from "@/hooks";
import { IUnit, IUnitUpdate, IUnitUpdateError } from "@/interfaces/Unit";

interface UpdateUnitPageProps {
  unit: IUnit;
}

export default function DashboardUpdateUnitPage({ unit }: UpdateUnitPageProps) {
  const schema = z.object({
    name: z.string().min(1).max(255),
  });

  const { id } = useRouter().query;

  const form = useForm<IUnitUpdate>({
    resolver: zodResolver(schema),
  });

  const { mutate: updateUnit, isLoading } = useUpdateUnit();

  const handleError = (error: IUnitUpdateError) => {
    if (error.response.data.content instanceof Array) {
      const issues = error.response.data.content;
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

  const onSubmit = (data: IUnitUpdate) =>
    updateUnit(
      { id: Number(id), data },
      {
        onError: handleError,
        onSuccess: handleSuccess,
      }
    );

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
              <FormLabel>Unit Name</FormLabel>
              <FormControl>
                <Input
                  defaultValue={unit.name}
                  {...field}
                  placeholder="Meter"
                />
              </FormControl>
              <FormDescription>Update your unit name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {isLoading ? (
            <LoadingButton>Update Unit</LoadingButton>
          ) : (
            <Button>Update Unit</Button>
          )}
        </div>
      </form>
    </Form>
  );
}
