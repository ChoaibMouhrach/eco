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
import { useDeleteOrder } from "@/hooks";
import { IOrder } from "@/interfaces/Order";

interface DeleteOrderDialogProps {
  order: IOrder;
  setOrder: React.Dispatch<React.SetStateAction<IOrder | null>>;

  refetch: () => any;
}

export function DeleteOrderDialog({
  order,
  setOrder,

  refetch,
}: DeleteOrderDialogProps) {
  const { mutate: deleteOrder, isLoading } = useDeleteOrder();

  const handleDeletingOrder = () => {
    deleteOrder(order.id, {
      onSuccess: () => refetch(),
      onSettled: () => {
        setOrder(null);
      },
    });
  };

  return (
    <AlertDialog open={Boolean(order)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            order.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOrder(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild onClick={handleDeletingOrder}>
            {isLoading ? (
              <LoadingButton>Wait while we delete this order</LoadingButton>
            ) : (
              <Button>Delete this order</Button>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
