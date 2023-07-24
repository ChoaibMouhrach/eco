import LoadingButton from "@/components/ui/LoadingButton";
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
import { Button } from "@/components/ui/button";
import { useUpdateProduct } from "@/hooks";
import { IProduct } from "@/interfaces/Product";

interface MakeProductExclusiveDialogProps {
  product: IProduct;
  setProduct: React.Dispatch<React.SetStateAction<IProduct | null>>;
  refetch: () => any;
}

export function MakeProductExclusiveDialog({
  product,
  setProduct,
  refetch,
}: MakeProductExclusiveDialogProps) {
  const { mutate: makeProductExclusive, isLoading } = useUpdateProduct();

  const handleExclusiveProduct = () => {
    makeProductExclusive(
      {
        id: product.id,
        data: {
          isExclusive: !product.isExclusive,
        },
      },
      {
        onSuccess: () => {
          refetch();
        },
        onSettled: () => {
          setProduct(null);
        },
      }
    );
  };

  return (
    <AlertDialog open={Boolean(product)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently make this
            product {product.isExclusive ? "non exclusive" : "exclusive"}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setProduct(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            {isLoading ? (
              <LoadingButton>Making the product exclusive</LoadingButton>
            ) : (
              <Button onClick={handleExclusiveProduct}>
                Make product{" "}
                {product.isExclusive ? "non exclusive" : "exclusive"}
              </Button>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
