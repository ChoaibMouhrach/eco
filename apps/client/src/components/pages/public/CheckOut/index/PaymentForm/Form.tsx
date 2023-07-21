import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import isCreditCard from "validator/lib/isCreditCard";
import { z } from "zod";
import LoadingButton from "@/components/ui/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form as FormComponent,
  FormItem,
  FormDescription,
  FormMessage,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCart, useCheckOut } from "@/hooks";
import { CardData, CheckOutError, CheckOutResponse } from "@/interfaces/Order";

const schema = z.object({
  holder: z.string().regex(/^\w+\s\w+$/gi),
  number: z.string().refine(isCreditCard, { message: "Invalid card" }),
  expiration: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/gi),
  ccv: z.string().regex(/^[0-9]{3,4}$/gi),
});

export function Form() {
  const { load } = useCart();
  const form = useForm<CardData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      holder: "",
      number: "",
      expiration: "",
      ccv: "",
    },
  });

  const {
    mutate: checkOut,
    isSuccess,
    isError,
    isLoading,
    data,
  } = useCheckOut();

  const onError = (error: CheckOutError) => {
    if (error.response.data.content instanceof Array) {
      const issues = error.response.data.content;
      issues.forEach((issue) => {
        form.setError(issue.path[1] ?? issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSuccess = (response: CheckOutResponse) => {
    if (response.data.url) {
      window.location.href = response.data.url;
      return;
    }

    localStorage.removeItem("cartItems");
    load();
    form.reset();
  };

  const onSubmit = (card: CardData) =>
    checkOut(card, {
      onSuccess,
      onError,
    });

  return (
    <FormComponent {...form}>
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {((isSuccess && data.status === 201) || isError) && (
          <div
            className={`${
              isSuccess ? "bg-green-700" : "bg-red-700"
            } text-white p-4 text-sm rounded-md col-start-1 col-end-3`}
          >
            Payment {isSuccess ? "succeded" : "failed"}
          </div>
        )}

        <FormField
          control={form.control}
          name="holder"
          render={({ field }) => (
            <FormItem className="col-start-1 col-end-3">
              <FormLabel>Card Holder</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" />
              </FormControl>
              <FormDescription>
                The card holder name as it appears on the card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem className="col-start-1 col-end-3">
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="XXXX-XXXX-XXXX-XXXX" />
              </FormControl>
              <FormDescription>
                The large number on the credit cart.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Expiration</FormLabel>
              <FormControl>
                <Input {...field} placeholder="MM/YY" />
              </FormControl>
              <FormDescription>
                The expiration date on the credit cart.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ccv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card CCV</FormLabel>
              <FormControl>
                <Input {...field} placeholder="CCV" />
              </FormControl>
              <FormDescription>
                The 3 or 4 digit code on the back of the card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-start-1 col-end-3 flex flex-col">
          {isLoading ? (
            <LoadingButton>Paying...</LoadingButton>
          ) : (
            <Button>Pay</Button>
          )}
        </div>
      </form>
    </FormComponent>
  );
}
