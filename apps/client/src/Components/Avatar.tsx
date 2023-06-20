import {
  Button,
  DropDown,
  DropDownItem,
  DropDownItemsWrapper,
  DropDownTrigger,
} from "ui";
import { useRouter } from "next/router";
import { User } from "..";
import useSignOut from "@/hooks/useSignOut";

interface AvatarProps {
  user: User;
}

export default function Avatar({ user }: AvatarProps) {
  const { mutate: signOut, isLoading } = useSignOut();
  const router = useRouter();

  const handleSuccess = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = () => {
    signOut(undefined, {
      onSuccess: handleSuccess,
    });
  };

  return (
    <DropDown>
      <DropDownTrigger>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs bg-gray-100">
          {user.firstName[0] + user.lastName[0]}
        </div>
      </DropDownTrigger>
      <DropDownItemsWrapper>
        <DropDownItem>
          <Button
            href="/dashboard"
            variant="text"
            className="!justify-start w-full"
          >
            Dashboard
          </Button>
        </DropDownItem>
        <DropDownItem>
          <Button variant="text" className="!justify-start w-full">
            Profile
          </Button>
        </DropDownItem>
        <DropDownItem>
          <Button
            onClick={handleSubmit}
            variant="text"
            className="!justify-start w-full"
            isLoading={isLoading}
          >
            Sign Out
          </Button>
        </DropDownItem>
      </DropDownItemsWrapper>
    </DropDown>
  );
}
