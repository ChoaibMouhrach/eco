import HelpIcon from "@/components/icons/Help";
import MoneyReturnIcon from "@/components/icons/Money";
import TagIcon from "@/components/icons/Tag";
import TruckIcon from "@/components/icons/Truck";

const data = [
  {
    name: "Free Delivery",
    description: "Free delivery on orders over £300",
    icon: <TruckIcon />,
  },
  {
    name: "Online Support",
    description: "We are here to help. Contact us now",
    icon: <HelpIcon />,
  },
  {
    name: "Money Return",
    description: "30 days money back guarantee",
    icon: <MoneyReturnIcon />,
  },
  {
    name: "Member Discount",
    description: "5% discount for members",
    icon: <TagIcon />,
  },
];

export default function Features() {
  return (
    <div className="container mx-auto grid lg:grid-cols-4 gap-4">
      {data.map(({ icon, name, description }) => (
        <div className="grid grid-cols-3">
          <div className="flex items-center justify-center">
            <div className="bg-gray-50 p-4 rounded-full">{icon}</div>
          </div>
          <div className="col-start-2 col-end-4">
            <span className="font-semibold tracking-wide">{name}</span>
            <div className="text-neutral-500 text-sm">{description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
