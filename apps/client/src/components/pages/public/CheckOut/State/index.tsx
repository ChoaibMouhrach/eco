import { Error } from "./error";
import { Success } from "./success";

interface CheckOutStatePageProps {
  success: boolean;
}

export default function CheckOutStatePage({ success }: CheckOutStatePageProps) {
  return success ? <Success /> : <Error />;
}
