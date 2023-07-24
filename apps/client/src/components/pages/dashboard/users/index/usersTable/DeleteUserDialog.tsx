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
import { useDeleteUser } from "@/hooks";
import { IUser } from "@/interfaces/User";

interface DeleteUserDialogProps {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;

  refetch: () => any;
}

export function DeleteUserDialog({
  user,
  setUser,
  refetch,
}: DeleteUserDialogProps) {
  const { mutate: deleteUser, isLoading } = useDeleteUser();

  const handleDeleteUser = () => {
    deleteUser(user.id, {
      onSuccess: () => {
        refetch();
      },
      onSettled: () => {
        setUser(null);
      },
    });
  };

  return (
    <AlertDialog open={Boolean(user)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            user.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setUser(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild onClick={handleDeleteUser}>
            {isLoading ? (
              <LoadingButton>Wait while we delete this user</LoadingButton>
            ) : (
              <Button>Delete this user</Button>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
