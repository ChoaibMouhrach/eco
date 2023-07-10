import Link from "next/link";
import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/interfaces/User";
import { avatarNavigation } from "@/constants";
import { useSignOut } from "@/hooks";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/LoadingButton";

interface NavigationAvatarProps {
  user: IUser;
}

export default function NavigationAvatar({ user }: NavigationAvatarProps) {
  const [alrtOpen, setAlrtOpen] = useState<boolean>(false);
  const { mutateAsync: signOut, isLoading } = useSignOut();

  const handleSignOut = () => {
    try {
      return signOut();
    } catch (err) {
      return null;
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage />
            <AvatarFallback className="bg-gray-50 text-sm p-2 rounded-full ">
              {user.firstName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {avatarNavigation.map((navigation) => (
            <DropdownMenuItem key={navigation.name} asChild>
              <Link href={navigation.href}>{navigation.name}</Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={() => setAlrtOpen(true)}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={alrtOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlrtOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              {isLoading ? (
                <LoadingButton>Signing you out</LoadingButton>
              ) : (
                <Button onClick={handleSignOut}>Sign Out</Button>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
