import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Combox, { ComboxItem } from "@/components/ui/Combox";
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
import { useGetCategories, useGetUnits, useUpdateProduct } from "@/hooks";
import { ICategory } from "@/interfaces/Category";
import {
  IProduct,
  IProductUpdate,
  IProductUpdateError,
} from "@/interfaces/Product";
import { IUnit } from "@/interfaces/Unit";
import debounce from "@/lib/debounce";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/ui/LoadingButton";

interface UpdateProps {
  product: IProduct;
  units: IUnit[];
  categories: ICategory[];
}

const schema = z.object({
  name: z.string().min(3).max(255).optional(),
  description: z.string().min(200).max(2000).optional(),
  price: z
    .string()
    .regex(/^\d+$/gi)
    .pipe(z.string().transform((v) => Number(v)))
    .optional(),
  quantity: z
    .string()
    .regex(/^\d+$/gi)
    .pipe(z.string().transform((v) => Number(v)))
    .optional(),
  unitId: z.number().int().positive().optional(),
  categoryId: z.number().int().positive().optional(),
  tags: z.string().min(1).optional(),
  images: z
    .array(z.any())
    .optional()
    .refine((v) => (v ? v.length > 0 : true)),
});

export default function DashboardUpdateProduct({
  product,
  units: defaultUnits,
  categories: defaultCategories,
}: UpdateProps) {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [units, setUnits] = useState<IUnit[]>(defaultUnits);
  const [categories, setCategories] = useState<ICategory[]>(defaultCategories);

  const [unitsSearch, setUnitsSearch] = useState({
    value: product.unit.name,
    changed: false,
  });

  const [categoriesSearch, setCategoriesSearch] = useState({
    value: product.category.name,
    changed: false,
  });

  const { data: newUnits, refetch: refetchUnits } = useGetUnits(
    {
      search: unitsSearch.value,
    },
    { enabled: false }
  );

  const { data: newCategories, refetch: refetchCategories } = useGetCategories(
    {
      search: categoriesSearch.value,
    },
    { enabled: false }
  );

  const form = useForm<IProductUpdate>({
    resolver: zodResolver(schema),
  });

  const { mutate: updateProduct, isLoading } = useUpdateProduct();

  const handleError = (error: IProductUpdateError) => {
    if (error.response.data.content instanceof Array) {
      const issues = error.response.data.content;
      issues.forEach((issue) => {
        form.setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  // handlers
  const onSubmit = (data: IProductUpdate) => {
    updateProduct(
      {
        id: product.id,
        data,
      },
      {
        onError: handleError,
        onSettled: () => {
          setAlertOpen(false);
        },
      }
    );
  };

  const updateUnit = debounce(() => refetchUnits());
  const updateCategories = debounce(() => refetchCategories());

  // useEffect
  useEffect(() => {
    if (unitsSearch.changed) {
      updateUnit();
    }
  }, [unitsSearch]);

  useEffect(() => {
    if (categoriesSearch.changed) {
      updateCategories();
    }
  }, [categoriesSearch]);

  useEffect(() => {
    if (newUnits) setUnits(newUnits.data.data ?? []);
  }, [newUnits]);

  useEffect(() => {
    if (newCategories) setCategories(newCategories.data.data ?? []);
  }, [newCategories]);

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
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  defaultValue={product.name}
                  {...field}
                  placeholder="TV"
                />
              </FormControl>
              <FormDescription>Insert Your new product name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Price</FormLabel>
              <FormControl>
                <Input
                  defaultValue={product.price}
                  {...field}
                  placeholder="200"
                  type="number"
                  min="1"
                />
              </FormControl>
              <FormDescription>Insert Your new product price.</FormDescription>
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
                  defaultValue={product.quantity}
                  {...field}
                  placeholder="5"
                  type="number"
                  min="1"
                />
              </FormControl>
              <FormDescription>
                Insert Your new product quantity.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unitId"
          render={() => (
            <FormItem>
              <FormLabel>Product Unit</FormLabel>
              <FormControl>
                <Combox
                  onValueChange={(value: string) =>
                    setUnitsSearch({ value, changed: true })
                  }
                  value={unitsSearch.value}
                  itemCount={units.length}
                >
                  {units.map((unit) => (
                    <ComboxItem
                      onClick={() => {
                        form.setValue("unitId", unit.id);
                        setUnitsSearch({ value: unit.name, changed: true });
                      }}
                      key={unit.id}
                    >
                      {unit.name}
                    </ComboxItem>
                  ))}
                </Combox>
              </FormControl>
              <FormDescription>Insert Your new product unit.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={() => (
            <FormItem>
              <FormLabel>Product Category</FormLabel>
              <FormControl>
                <Combox
                  onValueChange={(value: string) =>
                    setCategoriesSearch({ value, changed: true })
                  }
                  value={categoriesSearch.value}
                  itemCount={categories.length}
                >
                  {categories.map((category) => (
                    <ComboxItem
                      onClick={() => {
                        form.setValue("categoryId", category.id);
                        setUnitsSearch({ value: category.name, changed: true });
                      }}
                      key={category.id}
                    >
                      {category.name}
                    </ComboxItem>
                  ))}
                </Combox>
              </FormControl>
              <FormDescription>
                Insert Your new product category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Textarea
                  defaultValue={product.description}
                  {...field}
                  placeholder="Description"
                />
              </FormControl>
              <FormDescription>
                Insert Your new product description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product tags</FormLabel>
              <FormControl>
                <Input
                  defaultValue={product.tags.map((tag) => tag.name).join(",")}
                  {...field}
                  placeholder="tags"
                />
              </FormControl>
              <FormDescription>Insert Your new product tags.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <Input
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const eImages = Object.values(e.target.files!);
                    form.setValue("images", eImages);
                    setImages(eImages);
                  }}
                  type="file"
                  multiple
                />
              </FormControl>
              <FormDescription>Insert Your new product images.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 flex flex-wrap">
          {images.length
            ? images.map((image) => (
                <Image
                  src={URL.createObjectURL(image)}
                  alt=""
                  width="1920"
                  height="1080"
                  className="h-32 w-32 object-cover"
                />
              ))
            : product.images.map((image) => (
                <Image
                  src={`${process.env.API_STORAGE_URL}/${image.path}`}
                  alt=""
                  width="1920"
                  height="1080"
                  className="h-32 w-32 object-cover"
                />
              ))}
        </div>

        <Button
          className="w-fit"
          type="button"
          onClick={() => setAlertOpen(true)}
        >
          Update
        </Button>

        <AlertDialog open={alertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently update this
                product.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAlertOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                {isLoading ? (
                  <LoadingButton>Updating</LoadingButton>
                ) : (
                  <Button onClick={form.handleSubmit(onSubmit)}>Update</Button>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
}
