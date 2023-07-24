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
import { useDeleteCategory } from "@/hooks";
import { ICategory } from "@/interfaces/Category";

interface DeleteCategoryDialogProps {
  category: ICategory;
  setCategory: React.Dispatch<React.SetStateAction<ICategory | null>>;
  refetch: () => any;
}

export function DeleteCategoryDialog({
  category,
  refetch,
  setCategory,
}: DeleteCategoryDialogProps) {
  const { mutate: deleteCategory, isLoading } = useDeleteCategory();

  const handleDeleteCategory = () => {
    deleteCategory(category.id, {
      onSuccess: () => {
        refetch();
      },
      onSettled: () => {
        setCategory(null);
      },
    });
  };

  return (
    <AlertDialog open={Boolean(category)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setCategory(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild onClick={handleDeleteCategory}>
            {isLoading ? (
              <LoadingButton>Wait while we delete this category</LoadingButton>
            ) : (
              <Button>Delete category</Button>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
