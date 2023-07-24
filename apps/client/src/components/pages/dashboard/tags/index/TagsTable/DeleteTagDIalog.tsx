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
import { useDeleteTag } from "@/hooks";
import { ITag } from "@/interfaces/Tag";

interface DeleteTagDialogProps {
  tag: ITag;
  setTag: React.Dispatch<React.SetStateAction<ITag | null>>;
  refetch: () => any;
}

export function DeleteTagDialog({
  tag,
  refetch,
  setTag,
}: DeleteTagDialogProps) {
  const { mutate: deleteTag, isLoading } = useDeleteTag();

  const handleDeleteTag = () => {
    deleteTag(tag.id, {
      onSuccess: () => {
        refetch();
      },
      onSettled: () => {
        setTag(null);
      },
    });
  };

  return (
    <AlertDialog open={Boolean(tag)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this tag.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setTag(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild onClick={handleDeleteTag}>
            {isLoading ? (
              <LoadingButton>Wait while we delete this tag</LoadingButton>
            ) : (
              <Button>Delete this tag</Button>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
