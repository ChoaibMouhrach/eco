import { UseFormReturn } from "react-hook-form";
import { useCallback } from "react";
import { IOrderUpdate } from "../interface";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ComboxUi } from "@/components/ui/ComboxUi";
import { IPaginate } from "@/interfaces/Common";
import { IUser } from "@/interfaces/User";
import { IOrder } from "@/interfaces/Order";
import debounce from "@/lib/debounce";

interface UsersComboboxProps {
  form: UseFormReturn<IOrderUpdate>;
  users: IPaginate<IUser>;
  order: IOrder;

  setUserChanged: React.Dispatch<React.SetStateAction<boolean>>;
  setUsersSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function UsersCombobox({
  users,
  form,
  order,
  setUserChanged,
  setUsersSearch,
}: UsersComboboxProps) {
  const handleAddUser = (value: string) => {
    setUserChanged(true);
    form.setValue("userId", Number(value));
  };

  const handleUserSearch = useCallback(
    debounce((value: string) => {
      setUsersSearch(value);
    }),
    []
  );

  return (
    <FormField
      name="userId"
      control={form.control}
      render={() => (
        <FormItem className="flex flex-col">
          <FormLabel>Order owner</FormLabel>
          <FormControl>
            <ComboxUi
              items={
                users?.data.map((user) => ({
                  label: `${user.firstName} ${user.lastName}`,
                  value: user.id.toString(),
                })) ?? []
              }
              defaultValue={`${order.user.firstName} ${order.user.lastName}`}
              placeholder="Select a user"
              onSearchChange={handleUserSearch}
              onValueChange={handleAddUser}
            />
          </FormControl>
          <FormDescription>
            Select the user that will own this order.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
