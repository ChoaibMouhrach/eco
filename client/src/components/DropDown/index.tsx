import * as DropDown from "@radix-ui/react-dropdown-menu"
import LinkItem from "./LinkItem";
import ButtonItem from "./ButtonItem";

const DropDownMenu = () => {
  return (
    <DropDown.Root>
      <DropDown.Trigger asChild >
        <button className="h-8 w-8 text-xs rounded-full bg-gray-200" >
          CM
        </button>
      </DropDown.Trigger>
      <DropDown.Portal  >
        <DropDown.Content align="end" className="py-2 bg-white text-sm drop-shadow-md rounded-md" >
          <DropDown.Label className="px-2">
            <div className="text-gray-500 py-2 px-4 lead tracking-wider" >
              mouhrachc@gmail.com
            </div>
          </DropDown.Label>

          <DropDown.Separator className="h-[1px] bg-gray-200 m-[5px]" />
          <LinkItem href="/dashboard/profile" >
            Dashboard
          </LinkItem>

          <LinkItem href="/dashboard/profile" >
            Profile
          </LinkItem>
          <DropDown.Separator className="h-[1px] bg-gray-200 m-[5px]" />

          <ButtonItem onClick={()=>console.log("Clicked")} >
            camado
          </ButtonItem>

        </DropDown.Content>
      </DropDown.Portal>
    </DropDown.Root>
  );
};

export default DropDownMenu;
