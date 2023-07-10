import { zodResolver } from "@hookform/resolvers/zod";
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
import { useStoreUnit } from "@/hooks";
import { IUnitCreate, IUnitCreateError } from "@/interfaces/Unit";

const schema = z.object({
  name: z.string().min(1).max(255),
});

export default function DashboardCreateUnitPage() {
  const form = useForm<IUnitCreate>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: storeUnit, isLoading } = useStoreUnit();

  const handleError = (err: IUnitCreateError) => {
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

  const onSubmit = (data: IUnitCreate) =>
    storeUnit(data, { onError: handleError, onSuccess: handleSuccess });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="spacee-y-8">
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Meter" />
                </FormControl>
                <FormDescription>This is the unit name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {isLoading ? (
              <LoadingButton>Create Unit</LoadingButton>
            ) : (
              <Button>Create Unit</Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
