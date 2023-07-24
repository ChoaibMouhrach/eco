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
import { useDeleteProduct } from "@/hooks";
import { IProduct } from "@/interfaces/Product";

interface DeleteProductDialogProps {
  product: IProduct;
  setProduct: React.Dispatch<React.SetStateAction<IProduct | null>>;
  refetch: () => any;
}

export function DeleteProductDialog({
  product,
  setProduct,
  refetch,
}: DeleteProductDialogProps) {
  const { mutate: deleteProduct, isLoading } = useDeleteProduct();

  const handleDelete = () => {
    deleteProduct(product.id, {
      onSuccess: () => {
        refetch();
      },
      onSettled: () => {
        setProduct(null);
      },
    });
  };

  return (
    <AlertDialog open={Boolean(product)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setProduct(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            {isLoading ? (
              <LoadingButton>Deleting product</LoadingButton>
            ) : (
              <Button onClick={handleDelete}>Delete Product</Button>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
