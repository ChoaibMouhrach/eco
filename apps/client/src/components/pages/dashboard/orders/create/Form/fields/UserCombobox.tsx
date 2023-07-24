import { UseFormReturn } from "react-hook-form";
import { useCallback } from "react";
import { ComboxUi } from "@/components/ui/ComboxUi";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IPaginate } from "@/interfaces/Common";
import { IUser } from "@/interfaces/User";
import { IOrderCreate } from "../interfaces";
import debounce from "@/lib/debounce";

interface UserComboBoxProps {
  form: UseFormReturn<IOrderCreate>;
  users: IPaginate<IUser>;

  setUsersSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function UserComboBox({
  form,
  users,
  setUsersSearch,
}: UserComboBoxProps) {
  const handleAddUser = (value: string) => {
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
