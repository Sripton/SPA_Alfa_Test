import { SET_PRODUCTS } from "../types/productTypes";
import type { ProductsState } from "../types/productTypes";
import type { AnyAction } from "@reduxjs/toolkit";
const initialState: ProductsState = {
  items: [],
  total: 0,
  likedIds: [],
  removedIds: [],
  created: [],
  filter: "all",
};
export default function productsReducer(
  state = initialState,
  action: AnyAction
): ProductsState {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
      };
    default:
      return state;
  }
}
