import { Form } from "./Form";

export function PaymentForm() {
  return (
    <div className="bg-gray-50 p-4 rounded-md flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xl">Card Details</h2>
        <p className="text-neutral-500 text-sm">
          Provide your card detailes to confirm your order.
        </p>
      </div>
      <Form />
    </div>
  );
}
