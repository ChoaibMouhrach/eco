import Link from "next/link";
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

interface NavigationAvatarProps {
  user: IUser;
}

export default function NavigationAvatar({ user }: NavigationAvatarProps) {
  const { mutate: signOut } = useSignOut();

  const handleSignOut = () => signOut();

  return (
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
          <DropdownMenuItem asChild>
            <Link href={navigation.href}>{navigation.name}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
