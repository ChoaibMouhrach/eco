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
import { IOrderCreate } from "../interfaces";
import { IPaginate } from "@/interfaces/Common";
import { IProduct } from "@/interfaces/Product";
import debounce from "@/lib/debounce";

interface ProductComboboxProps {
  form: UseFormReturn<IOrderCreate>;
  products: IPaginate<IProduct>;

  setProductsSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function ProductCombobox({
  form,
  products,
  setProductsSearch,
}: ProductComboboxProps) {
  const handleAddItem = (id: string) => {
    const item = (form.getValues("items") ?? []).find(
      ({ product }) => product.id === Number(id)
    );

    if (item) {
      form.setValue(
        "items",
        (form.getValues("items") ?? []).map((formItem) => {
          if (formItem.product.id === Number(id)) {
            return {
              ...formItem,
              quantity: formItem.quantity + 1,
            };
          }

          return formItem;
        })
      );

      return;
    }

    form.setValue("items", [
      ...(form.getValues("items") ?? []),
      {
        product: products.data.find((product) => product.id === Number(id))!,
        quantity: 1,
      },
    ]);
  };

  const handleProductSearch = useCallback(
    debounce((value: string) => {
      setProductsSearch(value);
    }),
    []
  );

  return (
    <FormField
      name="items"
      control={form.control}
      render={() => (
        <FormItem className="flex flex-col">
          <FormLabel>Products</FormLabel>
          <FormControl>
            <ComboxUi
              items={
                products.data.map((product) => ({
                  label: product.name.slice(0, 15),
                  value: product.id.toString(),
                })) ?? []
              }
              placeholder="Select a product"
              onSearchChange={handleProductSearch}
              onValueChange={handleAddItem}
            />
          </FormControl>
          <FormDescription>
            Select the products that will be added to this order.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
