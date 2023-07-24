import { UseFormReturn } from "react-hook-form";
import { useCallback } from "react";
import { ComboxUi } from "@/components/ui/ComboxUi";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { IPaginate } from "@/interfaces/Common";
import { IProduct } from "@/interfaces/Product";
import debounce from "@/lib/debounce";
import { IOrderUpdate } from "../interface";

interface ProductsComboboxProps {
  form: UseFormReturn<IOrderUpdate>;
  products: IPaginate<IProduct>;

  setProductsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  setProductsSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function ProductsCombobox({
  form,
  products,
  setProductsChanged,
  setProductsSearch,
}: ProductsComboboxProps) {
  const handleProductSearch = useCallback(
    debounce((value: string) => {
      setProductsSearch(value);
    }),
    []
  );

  const handleAddItem = (id: string) => {
    const item = (form.getValues("items") ?? []).find(
      ({ product }) => product.id === Number(id)
    );

    if (item) {
      setProductsChanged(true);
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

    setProductsChanged(true);
    form.setValue("items", [
      ...(form.getValues("items") ?? []),
      {
        product: products.data.find((product) => product.id === Number(id))!,
        quantity: 1,
      },
    ]);
  };

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
