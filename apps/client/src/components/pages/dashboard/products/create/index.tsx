import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
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
import { Textarea } from "@/components/ui/textarea";
import { ICategory } from "@/interfaces/Category";
import LoadingButton from "@/components/ui/LoadingButton";
import { Button } from "@/components/ui/button";
import { IProductCreate, IProductCreateError } from "@/interfaces/Product";
import Combox, { ComboxItem } from "@/components/ui/Combox";
import { useGetCategories, useGetUnits, useStoreProduct } from "@/hooks";
import debounce from "@/lib/debounce";
import { CreateProductProps, schema } from "./logic";

export default function DashboardCreateProduct({
  units: defaultUnits,
  categories: defaultCategories,
}: CreateProductProps) {
  // hooks
  const [images, setImages] = useState<File[]>([]);
  const [categorySearch, setCategorySearch] = useState<{
    value: string;
    changed: boolean;
  }>({
    value: "",
    changed: false,
  });

  const [categories, setCategories] = useState<ICategory[]>(defaultCategories);

  const [unitSearch, setUnitSearch] = useState<{
    value: string;
    changed: boolean;
  }>({
    value: "",
    changed: false,
  });

  const [units, setUnits] = useState<ICategory[]>(defaultUnits);

  const { data: newCategories, refetch: refetchCategories } = useGetCategories(
    {
      search: categorySearch.value,
    },
    {
      enabled: false,
    }
  );

  const { data: newUnits, refetch: refetchUnits } = useGetUnits(
    {
      search: unitSearch.value,
    },
    {
      enabled: false,
    }
  );

  // functions
  const changeCategorySearch = useCallback(
    debounce(() => {
      refetchCategories();
    }),
    []
  );

  const changeUnitSearch = useCallback(
    debounce(() => {
      refetchUnits();
    }),
    []
  );

  // useEffects
  useEffect(() => {
    if (unitSearch.changed) {
      changeUnitSearch();
    }
  }, [unitSearch]);

  useEffect(() => {
    if (categorySearch.changed) {
      changeCategorySearch();
    }
  }, [categorySearch]);

  useEffect(() => {
    if (newCategories) {
      setCategories(newCategories.data.data);
    }
  }, [newCategories]);

  useEffect(() => {
    if (newUnits) {
      setUnits(newUnits.data.data);
    }
  }, [newUnits]);

  const form = useForm<IProductCreate>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { mutate: storeProduct, isLoading } = useStoreProduct();

  const handleError = (err: IProductCreateError) => {
    if (err.response.data.content instanceof Array) {
      const issues = err.response.data.content;
      issues.forEach((issue) => {
        form.setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: IProductCreate) => {
    storeProduct(data, {
      onError: handleError,
    });
  };

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
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="tv" />
              </FormControl>
              <FormDescription>The name of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product price</FormLabel>
              <FormControl>
                <Input
                  min="1"
                  type="number"
                  {...field}
                  placeholder="Price..."
                />
              </FormControl>
              <FormDescription>The price of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  {...field}
                  placeholder="Quantity..."
                />
              </FormControl>
              <FormDescription>The quantity of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="unitId"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Product Unit</FormLabel>
              <FormControl>
                <Combox
                  itemCount={units.length}
                  value={unitSearch.value}
                  onValueChange={(value: string) =>
                    setUnitSearch({ value, changed: true })
                  }
                >
                  {units.map((unit) => (
                    <ComboxItem
                      key={unit.id}
                      value={String(unit.id)}
                      onClick={() => {
                        form.setValue("unitId", unit.id);
                        setUnitSearch({ value: unit.name, changed: true });
                      }}
                    >
                      {unit.name}
                    </ComboxItem>
                  ))}
                </Combox>
              </FormControl>
              <FormDescription>The unit of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="categoryId"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Product Category</FormLabel>
              <FormControl>
                <Combox
                  itemCount={categories.length}
                  value={categorySearch.value}
                  onValueChange={(value: string) => {
                    setCategorySearch({ value, changed: true });
                  }}
                >
                  {categories.map((category) => (
                    <ComboxItem
                      key={category.id}
                      value={String(category.id)}
                      onClick={() => {
                        form.setValue("categoryId", category.id);
                        setCategorySearch({
                          value: category.name,
                          changed: true,
                        });
                      }}
                    >
                      {category.name}
                    </ComboxItem>
                  ))}
                </Combox>
              </FormControl>
              <FormDescription>The category of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea rows={10} {...field} placeholder="Description..." />
              </FormControl>
              <FormDescription>The description of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Tags</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Tags" />
              </FormControl>
              <FormDescription>Comma seperated</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <Input
                  multiple
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const eImages = Object.values(e.target.files!);
                    form.setValue("images", eImages);
                    setImages(eImages);
                  }}
                  type="file"
                />
              </FormControl>
              <FormDescription>Product Images</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center">
          {images.map((image) => (
            <div className="h-32 w-32 relative">
              <Image
                className="w-full h-full object-cover border rounded-md"
                src={URL.createObjectURL(image)}
                alt=""
                width="100"
                height="100"
              />
            </div>
          ))}
        </div>

        <div>
          {isLoading ? (
            <LoadingButton>Create Product</LoadingButton>
          ) : (
            <Button type="submit">Create Product</Button>
          )}
        </div>
      </form>
    </Form>
  );
}
