import {
  DropDown,
  DropDownItem,
  DropDownItemsWrapper,
  DropDownSeparator,
  DropDownTrigger,
} from "ui";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  MdOutlineDashboard,
  MdOutlineExitToApp,
  MdOutlinePersonOutline,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useSignOut from "@/hooks/useSignOut";
import { User } from "..";

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
        <div className="p-3 pb-0 flex flex-col justify-start">
          <span className="font-bold tracking-wide">
            {user.firstName.toUpperCase()}
          </span>
          <span className="text-neutral-500">{user.email}</span>
        </div>
        <DropDownSeparator />
        <DropDownItem>
          <Link href="/dashboard" className="p-1 px-2 flex items-center gap-2">
            <MdOutlineDashboard />
            Dashboard
          </Link>
        </DropDownItem>
        <DropDownItem>
          <Link
            href="/dashboard/profile"
            className="p-1 px-2 flex items-center gap-2"
          >
            <MdOutlinePersonOutline />
            Profile
          </Link>
        </DropDownItem>
        <DropDownItem>
          <button
            type="button"
            className="p-1 w-full px-2 flex items-center gap-2"
            onClick={handleSubmit}
          >
            <MdOutlineExitToApp />
            Sign Out
            {isLoading && (
              <AiOutlineLoading3Quarters className="animate-spin" />
            )}
          </button>
        </DropDownItem>
      </DropDownItemsWrapper>
    </DropDown>
  );
}
