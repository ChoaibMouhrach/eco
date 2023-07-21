import { useToast } from "@/components/ui/use-toast";
import { IProduct } from "@/interfaces/Product";
import { handleSuccess } from "@/lib/httpMutationHelper";
import useStore from "@/store/store";

export interface CartItem {
  quantity: number;
  product: IProduct;
}

export const useCart = () => {
  const { toast } = useToast();
  const {
    loadCartItems,
    addCartItem,
    cartItems,
    removeCartItem,
    updateCartItemQuantity,
  } = useStore((state) => state);

  const add = (item: CartItem) => {
    addCartItem(item);
    toast(
      handleSuccess("The product has been successfully added to your cart.")
    );
  };

  const remove = (id: number) => {
    removeCartItem(id);
    toast(
      handleSuccess("The product has been successfully removed from your cart.")
    );
  };

  const total = (): number => {
    const prices = cartItems.map((item) => item.quantity * item.product.price);
    return prices.length ? prices.reduce((pv, cv) => pv + cv) : 0;
  };

  return {
    add,
    remove,
    total,
    update: updateCartItemQuantity,
    data: cartItems,
    load: loadCartItems,
  };
};
