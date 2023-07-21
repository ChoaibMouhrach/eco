import { create } from "zustand";
import cartSlice, { CartSlice } from "./slices/cartSlice";

const useStore = create<CartSlice>()((...a) => ({
  ...cartSlice(...a),
}));

export default useStore;
