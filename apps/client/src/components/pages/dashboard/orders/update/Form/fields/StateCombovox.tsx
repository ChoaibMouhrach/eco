import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IOrder, IOrderState } from "@/interfaces/Order";
import { IOrderUpdate } from "../interface";
import { ComboxUi } from "@/components/ui/ComboxUi";

interface StateComboboxProps {
  form: UseFormReturn<IOrderUpdate>;
  order: IOrder;
  states: IOrderState[];
  setStateChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

export function StateCombobox({
  order,
  states,
  form,
  setStateChanged,
}: StateComboboxProps) {
  return (
    <FormField
      name="stateId"
      control={form.control}
      render={() => (
        <FormItem className="flex flex-col">
          <FormLabel>Choose order state</FormLabel>
          <FormControl>
            <ComboxUi
              items={states.map((state) => ({
                value: String(state.id),
                label: state.name,
              }))}
              defaultValue={order.orderState.name}
              placeholder="Choose state for your order"
              onValueChange={(id: string) => {
                setStateChanged(true);
                form.setValue("stateId", Number(id));
              }}
            />
          </FormControl>
          <FormDescription>The state the order should be in.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
