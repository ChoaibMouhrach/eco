import { StateCreator } from "zustand";
import { CartItem } from "@/hooks";

export type CartSlice = {
  cartItems: CartItem[];
  loadCartItems: () => void;
  addCartItem: (item: CartItem) => void;
  removeCartItem: (id: number) => void;
  updateCartItemQuantity: (
    param: {
      id: number;
    } & (
      | {
          quantity: number;
        }
      | {
          direc: boolean;
        }
    )
  ) => void;
};

const cartSlice: StateCreator<CartSlice, [], [], CartSlice> = (set) => ({
  cartItems: [],
  loadCartItems: () => {
    return set(() => {
      const rawCartItems = localStorage.getItem("cartItems");
      const cartItems = (
        rawCartItems ? JSON.parse(rawCartItems) : []
      ) as CartItem[];

      return {
        cartItems,
      };
    });
  },
  addCartItem: (item) => {
    return set((state) => {
      const itemExists = state.cartItems.find(
        (cartItem) => cartItem.product.id === item.product.id
      );

      let { cartItems } = state;

      if (!itemExists) {
        cartItems = [...state.cartItems, item];
      } else {
        cartItems = state.cartItems.map((cartItem) => {
          if (cartItem.product.id) {
            return {
              product: cartItem.product,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return {
        cartItems,
      };
    });
  },
  removeCartItem: (id) => {
    return set((state) => {
      const cartItems = state.cartItems.filter((cartItem) => {
        return cartItem.product.id !== id;
      });

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return {
        cartItems,
      };
    });
  },
  updateCartItemQuantity: (param) => {
    return set((state) => {
      const cartItems: CartItem[] = state.cartItems.map((item) => {
        if (item.product.id === param.id) {
          let { quantity } = item;

          if ("quantity" in param) {
            quantity = param.quantity;
          } else {
            quantity = param.direc ? quantity + 1 : quantity - 1;
          }

          return {
            product: item.product,
            quantity,
          };
        }

        return item;
      });

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return {
        cartItems,
      };
    });
  },
});

export default cartSlice;
