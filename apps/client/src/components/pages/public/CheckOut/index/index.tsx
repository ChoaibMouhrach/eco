import { ItemsGrid } from "./ItemsGrid";
import { OrderDetails } from "./OrderDetails";
import { PaymentForm } from "./PaymentForm";

export default function CheckOutPage() {
  return (
    <section className="container grid grid-cols-3 gap-4 py-8">
      <ItemsGrid />
      <div className="flex flex-col gap-4">
        <OrderDetails />
        <PaymentForm />
      </div>
    </section>
  );
}
