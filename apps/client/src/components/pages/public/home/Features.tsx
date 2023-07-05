import { FiTruck } from "react-icons/fi";
import {
  MdOutlineAttachMoney,
  MdOutlineDiscount,
  MdOutlineSupportAgent,
} from "react-icons/md";

const data = [
  {
    name: "Free Delivery",
    description: "Free delivery on orders over £300",
    icon: <FiTruck />,
  },
  {
    name: "Online Support",
    description: "We are here to help. Contact us now",
    icon: <MdOutlineSupportAgent />,
  },
  {
    name: "Money Return",
    description: "30 days money back guarantee",
    icon: <MdOutlineAttachMoney />,
  },
  {
    name: "Member Discount",
    description: "5% discount for members",
    icon: <MdOutlineDiscount />,
  },
];

export function Features() {
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
