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
import { useDeleteUnit } from "@/hooks";
import { IUnit } from "@/interfaces/Unit";

interface DeleteUnitDialogProps {
  unit: IUnit;
  setUnit: React.Dispatch<React.SetStateAction<IUnit | null>>;
  refetch: () => any;
}

export function DeleteUnitDialog({
  unit,
  setUnit,
  refetch,
}: DeleteUnitDialogProps) {
  const { mutate: deleteUnit, isLoading } = useDeleteUnit();

  const handleDeletingUnit = () => {
    deleteUnit(unit.id, {
      onSuccess: () => {
        refetch();
      },
      onSettled: () => {
        setUnit(null);
      },
    });
  };

  return (
    <AlertDialog open={Boolean(unit)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            unit.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setUnit(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild onClick={handleDeletingUnit}>
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
